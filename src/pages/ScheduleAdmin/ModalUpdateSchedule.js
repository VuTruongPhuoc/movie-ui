import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './ScheduleAdmin.module.scss';
import * as scheduleServices from '~/services/scheduleServices';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function UpdatescheduleModal(props) {
    const { show, handleClose, schedule, handleUpdateFromModal } = props;
    const [name, setName] = useState('');

    useEffect(() => {
        if (show) {
            setName(schedule.name);
        }
    }, [schedule]);

    const handleSaveschedule = (e) => {
        const fetchApi = async () => {
            try {
                const response = await scheduleServices.update(schedule.id, name);
                if (response && response.success) {
                    handleUpdateFromModal({
                        name: name,
                        id: schedule.id,
                        isActive: schedule.isActive,
                    });
                }
                toast.success(response.message);
                handleClose();
            } catch (err) {
                console.log(err);
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
                    <Modal.Title>Cập nhật lịch phim</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className={cx('input-add-name')}
                        placeholder="Nhập tên lịch phim"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" size="lg" onClick={handleSaveschedule}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UpdatescheduleModal;
