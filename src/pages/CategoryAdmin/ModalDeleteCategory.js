import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as categoryServices from '~/services/categoryServices';

function ModalDeleteCategory(props) {
    const { show, handleClose, category, handleDeleteFromModal } = props;

    const handleSaveCategory = () => {
        const fetchApi = async () => {
            try {
                const response = await categoryServices.del(category.id);
                if (response && response.success) {
                    handleDeleteFromModal({ id: category.id });
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
                    <Modal.Title>Xóa thể loại</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa {category.name} không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="lg" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" size="lg" onClick={handleSaveCategory}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalDeleteCategory;
