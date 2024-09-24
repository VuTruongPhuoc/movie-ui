import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as sectionServices from '~/services/sectionServices';

function ModalDeleteSection(props) {
    const { show, handleClose, section, handleDeleteFromModal } = props;

    const handleSaveSection = () => {
        const fetchApi = async () => {
            try {
                const response = await sectionServices.del(section.id);
                if (response && response.success) {
                    handleDeleteFromModal({ id: section.id });
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
                <Modal.Body>Bạn có muốn xóa {section.name} không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="lg" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" size="lg" onClick={handleSaveSection}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalDeleteSection;
