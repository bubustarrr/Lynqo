import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Spinner, Alert } from 'react-bootstrap';
import './ProfileEditPage.css'; // Az új CSS importálása

export default function ProfileEditPage() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        displayName: '', username: '', email: '', password: '', avatarUrl: ''
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('https://localhost:7118/api/Profile/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        displayName: data.displayName || '',
                        username: data.username || '',
                        email: data.email || '',
                        password: '',
                        avatarUrl: data.avatarUrl || ''
                    });
                }
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchProfile();
    }, [token]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setFormData({ ...formData, avatarUrl: reader.result });
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('https://localhost:7118/api/Profile/update', {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setMessage({ type: 'success', text: 'Sikeresen mentve!' });
                setTimeout(() => navigate('/profile'), 1000);
            } else { setMessage({ type: 'danger', text: 'Hiba történt a mentéskor.' }); }
        } catch (err) { setMessage({ type: 'danger', text: 'Hálózati hiba.' }); }
        finally { setSaving(false); }
    };

    if (loading) return (
        <div className="edit-profile-container justify-content-center">
            <Spinner animation="border" variant="primary" />
        </div>
    );

    return (
        <div className="edit-profile-container">
            <h1 className="edit-title">Profil Szerkesztése</h1>
            <p className="text-muted">Szabd testre a fiókodat</p>

            <div className="edit-card">
                {message.text && <Alert variant={message.type}>{message.text}</Alert>}

                <div className="avatar-upload-wrapper" onClick={() => fileInputRef.current.click()}>
                    <img 
                        src={formData.avatarUrl || `https://ui-avatars.com/api/?name=${formData.username}&size=200`} 
                        alt="Avatar" 
                        className="avatar-preview"
                    />
                    <div className="camera-icon-badge">📷</div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="edit-form-group">
                        <label>Megjelenített név</label>
                        <input type="text" className="edit-input" name="displayName" value={formData.displayName} onChange={(e) => setFormData({...formData, displayName: e.target.value})} />
                    </div>

                    <div className="edit-form-group">
                        <label>Felhasználónév</label>
                        <input type="text" className="edit-input" name="username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
                    </div>

                    <div className="edit-form-group">
                        <label>E-mail cím</label>
                        <input type="email" className="edit-input" name="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>

                    <div className="edit-form-group">
                        <label>Új jelszó</label>
                        <input type="password" placeholder="Hagyd üresen, ha nem változtatod meg" className="edit-input" name="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    </div>

                    <button type="submit" className="btn-save" disabled={saving}>
                        {saving ? 'Mentés...' : 'Változtatások Mentése'}
                    </button>
                    
                    <button type="button" className="btn-cancel" onClick={() => navigate('/profile')}>
                        Mégse
                    </button>
                </form>
            </div>
        </div>
    );
}