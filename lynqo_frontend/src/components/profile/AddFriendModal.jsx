import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext'; 

export default function AddFriendModal({ show, handleClose, t }) {
    const { authFetch } = useContext(AuthContext);
    const [identifier, setIdentifier] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await authFetch('https://localhost:7118/api/Friends/request-by-identifier', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Identifier: identifier })
            });
            if (res.ok) setMessage({ type: 'success', text: t('profilePage.modal.success') });
            else setMessage({ type: 'danger', text: t('profilePage.modal.not_found') });
        } catch (err) {
            setMessage({ type: 'danger', text: t('profilePage.modal.error') });
        } finally { setLoading(false); }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton><Modal.Title className="fw-bold">{t('profilePage.modal.title')}</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAdd}>
                    <Form.Control 
                        className="friend-input-custom mb-3" 
                        placeholder={t('profilePage.modal.placeholder')} 
                        value={identifier} 
                        onChange={(e) => setIdentifier(e.target.value)} 
                    />
                    <Button className="add-friend-btn w-100 py-3" type="submit" disabled={loading || !identifier}>
                        {loading ? <Spinner size="sm" /> : t('profilePage.modal.btn_search')}
                    </Button>
                </Form>
                {message && <Alert variant={message.type} className="mt-3">{message.text}</Alert>}
            </Modal.Body>
        </Modal>
    );
}