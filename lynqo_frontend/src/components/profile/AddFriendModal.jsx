import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext'; 

export default function AddFriendModal({ show, handleClose, t }) {
    const { authFetch } = useContext(AuthContext);
    const [identifier, setIdentifier] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Amikor bezárjuk a modalt, kitöröljük az előző adatokat
    const onHide = () => {
        setIdentifier('');
        setMessage(null);
        handleClose();
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!identifier.trim()) return;
        setLoading(true);
        setMessage(null);

        try {
            const res = await authFetch('https://localhost:7118/api/Friends/request-by-identifier', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Identifier: identifier })
            });
            
            // Ha a backend objektumot küld vissza hiba esetén is
            let data = null;
            try { data = await res.json(); } catch (err) {}

            if (res.ok) {
                setMessage({ type: 'success', text: 'Jelölés sikeresen elküldve!' });
                setIdentifier('');
                // Opcionális: setTimeout(() => onHide(), 2000); // Auto bezárás 2 mp után
            } else {
                setMessage({ type: 'danger', text: data?.message || 'Hiba történt a jelölés során.' });
            }
        } catch (err) {
            setMessage({ type: 'danger', text: 'Hálózati hiba történt.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                {/* Ha van fordításod, használd a t()-t, pl: t('profile.addFriend') */}
                <Modal.Title className="fw-bold">Barát hozzáadásaa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-muted mb-3">
                    Keresd meg az ismerősödet a pontos felhasználóneve vagy email címe alapján!
                </p>
                <Form onSubmit={handleAdd}>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="text" 
                            placeholder="Felhasználónév vagy Email..." 
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            disabled={loading}
                            autoFocus
                        />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" className="w-100" disabled={loading || !identifier.trim()}>
                        {loading ? <Spinner size="sm" animation="border" /> : 'Keresés és Hozzáadás'}
                    </Button>
                </Form>

                {message && (
                    <Alert variant={message.type} className="mt-3 mb-0 text-center">
                        {message.text}
                    </Alert>
                )}
            </Modal.Body>
        </Modal>
    );
}