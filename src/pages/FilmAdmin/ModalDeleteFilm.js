import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as filmServices from '~/services/filmServices';

function ModalDeleteFilm(props) {
    const { show, handleClose, film, handleDeleteFromModal } = props;

    const handleSaveFilm = () => {
        const fetchApi = async () => {
            try {
                const response = await filmServices.del(film.id);
                if (response && response.success) {
                    handleDeleteFromModal({ id: film.id });
                }
                toast.success(response.message);
                handleClose();
            } catch (err) {
                if (!err.response) {
                    toast.error('Server không phản hồi');
                } else {
                    toast.error(err.response.data.message);
                }
            }
        };
        fetchApi();
    };
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa quốc gia</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa {film.name} không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="lg" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" size="lg" onClick={handleSaveFilm}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalDeleteFilm;
