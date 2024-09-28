import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as scheduleServices from '~/services/scheduleServices';

function ModalDeleteschedule(props) {
    const { show, handleClose, schedule, handleDeleteFromModal } = props;

    const handleSaveschedule = () => {
        const fetchApi = async () => {
            try {
                const response = await scheduleServices.del(schedule.id);
                if (response && response.success) {
                    handleDeleteFromModal({ id: schedule.id });
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
                    <Modal.Title>Xóa lịch phim</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa {schedule.name} không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="lg" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" size="lg" onClick={handleSaveschedule}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalDeleteschedule;
