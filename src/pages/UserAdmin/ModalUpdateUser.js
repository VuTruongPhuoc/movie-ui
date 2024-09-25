import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './UserAdmin.module.scss';
import * as userServices from '~/services/userServices';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function UpdateUserModal(props) {
    const { show, handleClose, user, handleUpdateFromModal } = props;
    const [username, setUserName] = useState('');
    const [displayname, setDisplayName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (show) {
            setUserName(user.userName);
            setDisplayName(user.displayName);
            setEmail(user.email);
        }
    }, [user]);

    const handleSaveUser = (e) => {
        const fetchApi = async () => {
            try {
                const response = await userServices.update(user.id, username, displayname, email);
                if (response && response.success) {
                    handleUpdateFromModal({
                        username: username,
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
                    <input
                        className={cx('input-add-name')}
                        placeholder="Nhập tên tài khoản"
                        value={username}
                        required
                        onChange={(e) => setUserName(e.target.value)}
                    ></input>
                    <input
                        className={cx('input-add-name')}
                        placeholder="Nhập tên người dùng"
                        value={displayname}
                        required
                        onChange={(e) => setDisplayName(e.target.value)}
                    ></input>
                    <input
                        className={cx('input-add-name')}
                        placeholder="Nhập email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
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
