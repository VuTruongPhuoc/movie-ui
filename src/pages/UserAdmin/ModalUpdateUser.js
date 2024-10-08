import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './UserAdmin.module.scss';
import * as userServices from '~/services/userServices';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function UpdateUserModal(props) {
    const { show, handleClose, user, handleUpdateFromModal } = props;
    const [displayname, setDisplayName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (show) {
            setDisplayName(user.displayName);
            setEmail(user.email);
        }
    }, [show, user]);

    const handleSaveUser = (e) => {
        e.preventDefault();
        const fetchApi = async () => {
            try {
                const response = await userServices.update(user.userName, displayname, email);
                if (response && response.success) {
                    handleUpdateFromModal({
                        displayname: displayname,
                        email: email,
                        id: user.id,
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
                    <Modal.Title>Cập nhật người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label>Tên hiển thị:</label>
                        <input
                            className={cx('input-add-name')}
                            placeholder="Nhập tên người dùng"
                            value={displayname}
                            required
                            onChange={(e) => setDisplayName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            className={cx('input-add-name')}
                            placeholder="Nhập email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" size="lg" onClick={handleSaveUser}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UpdateUserModal;
