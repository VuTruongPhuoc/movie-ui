import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as userServices from '~/services/userServices';

function ModalDeleteUser(props) {
    const { show, handleClose, user, handleDeleteFromModal } = props;

    const handleSaveUser = () => {
        const fetchApi = async () => {
            try {
                const response = await userServices.del(user.userName);
                if (response && response.success) {
                    handleDeleteFromModal({ id: user.id });
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
                    <Modal.Title>Xóa người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa {user.userName} không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="lg" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" size="lg" onClick={handleSaveUser}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalDeleteUser;
