import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Spinner, Alert } from 'react-bootstrap';
import './ProfileEditPage.css';

export default function ProfileEditPage() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const API_BASE = 'https://localhost:7118';
  const PROFILE_URL = `${API_BASE}/api/Profile/me`;
  const UPLOAD_URL = `${API_BASE}/api/Profile/me/avatar`;

  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    email: '',
    password: '',
    avatarUrl: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  };

  const resolveAvatarUrl = (url) => {
    if (!url) return '';
    if (
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('blob:') ||
      url.startsWith('data:')
    ) {
      return url;
    }
    return `${API_BASE}${url}`;
  };

  const getAvatarFromResponse = (data) => {
    return (
      data?.profilePicUrl ||
      data?.profilepicurl ||
      data?.avatarUrl ||
      data?.url ||
      ''
    );
  };

  const parseJsonSafe = async (res) => {
    const text = await res.text();
    if (!text) return {};
    try {
      return JSON.parse(text);
    } catch {
      return { message: text };
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(PROFILE_URL, {
          headers: authHeaders
        });

        if (res.status === 401) {
          logout?.();
          navigate('/login');
          return;
        }

        const data = await parseJsonSafe(res);

        if (!res.ok) {
          setMessage({ type: 'danger', text: data.message || 'Nem sikerült betölteni a profilt.' });
          return;
        }

        setFormData({
          displayName: data.displayName || '',
          username: data.username || '',
          email: data.email || '',
          password: '',
          avatarUrl: getAvatarFromResponse(data)
        });
      } catch (err) {
        console.error(err);
        setMessage({ type: 'danger', text: 'Hálózati hiba a profil betöltésekor.' });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate, logout]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMessage({ type: '', text: '' });

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setMessage({ type: 'danger', text: 'Csak JPG, PNG vagy WEBP képet tölthetsz fel.' });
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'danger', text: 'A kép maximum 5 MB lehet.' });
      e.target.value = '';
      return;
    }

    if (previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    const newPreview = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(newPreview);
  };

  const uploadImage = async () => {
    if (!selectedFile) return formData.avatarUrl;

    const uploadData = new FormData();
    uploadData.append('file', selectedFile);

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: uploadData
    });

    if (res.status === 401) {
      logout?.();
      navigate('/login');
      throw new Error('Unauthorized');
    }

    const data = await parseJsonSafe(res);

    if (!res.ok) {
      throw new Error(data.message || 'A profilkép feltöltése nem sikerült.');
    }

    return getAvatarFromResponse(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      let uploadedAvatarUrl = formData.avatarUrl;

      if (selectedFile) {
        uploadedAvatarUrl = await uploadImage();
      }

      const payload = {
        displayName: formData.displayName,
        username: formData.username,
        email: formData.email,
        password: formData.password
      };

      if (!payload.password) {
        delete payload.password;
      }

      const res = await fetch(PROFILE_URL, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.status === 401) {
        logout?.();
        navigate('/login');
        return;
      }

      const data = await parseJsonSafe(res);

      if (!res.ok) {
        throw new Error(data.message || 'Hiba történt a mentéskor.');
      }

      setFormData((prev) => ({
        ...prev,
        displayName: data.displayName || prev.displayName,
        username: data.username || prev.username,
        email: data.email || prev.email,
        password: '',
        avatarUrl: uploadedAvatarUrl || prev.avatarUrl
      }));

      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }

      setPreviewUrl('');
      setSelectedFile(null);
      setMessage({ type: 'success', text: 'Sikeresen mentve!' });

      setTimeout(() => navigate('/profile'), 1000);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'danger', text: err.message || 'Hálózati hiba.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-profile-container justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const currentAvatar =
    previewUrl ||
    resolveAvatarUrl(formData.avatarUrl) ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.username || 'User')}&size=200`;

  return (
    <div className="edit-profile-container">
      <h1 className="edit-title">Profil szerkesztése</h1>
      <p className="text-muted">Szabd testre a fiókodat</p>

      <div className="edit-card">
        {message.text && <Alert variant={message.type}>{message.text}</Alert>}

        <div
          className="avatar-upload-wrapper"
          onClick={() => fileInputRef.current?.click()}
        >
          <img
            src={currentAvatar}
            alt="Avatar"
            className="avatar-preview"
          />
          <div className="camera-icon-badge">📷</div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept="image/png,image/jpeg,image/webp"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="edit-form-group">
            <label>Megjelenített név</label>
            <input
              type="text"
              className="edit-input"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
            />
          </div>

          <div className="edit-form-group">
            <label>Felhasználónév</label>
            <input
              type="text"
              className="edit-input"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="edit-form-group">
            <label>E-mail cím</label>
            <input
              type="email"
              className="edit-input"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="edit-form-group">
            <label>Új jelszó</label>
            <input
              type="password"
              placeholder="Hagyd üresen, ha nem változtatod meg"
              className="edit-input"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn-save" disabled={saving}>
            {saving ? 'Mentés...' : 'Változtatások mentése'}
          </button>

          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate('/profile')}
          >
            Mégse
          </button>
        </form>
      </div>
    </div>
  );
}
