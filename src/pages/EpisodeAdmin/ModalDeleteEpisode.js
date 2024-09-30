import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as episodeServices from '~/services/episodeServices';

function ModalDeleteEpisode(props) {
    const { show, handleClose, episode, handleDeleteFromModal } = props;

    const handleSaveEpisode = () => {
        const fetchApi = async () => {
            try {
                const response = await episodeServices.del(episode.id);
                if (response && response.success) {
                    handleDeleteFromModal({ id: episode.id });
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
                    <Modal.Title>Xóa phần</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa {episode.name} không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="lg" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" size="lg" onClick={handleSaveEpisode}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalDeleteEpisode;
