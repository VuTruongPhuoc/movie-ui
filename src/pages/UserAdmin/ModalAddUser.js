import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './UserAdmin.module.scss';
import * as userServices from '~/services/userServices';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function AddUserModal(props) {
    const { show, handleClose, handleUpdateData } = props;
    const [username, setUserName] = useState('');
    const [displayname, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const inputRef = useRef();
    const handleSaveUser = (e) => {
        const fetchApi = async () => {
            try {
                const response = await userServices.add(username, displayname, email);
                handleUpdateData(response.user);
                toast.success(response.message);
                setDisplayName('');
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
                    <Modal.Title>Thêm người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        className={cx('input-add-name')}
                        placeholder="Nhập tên tài khoản"
                        value={username}
                        required
                        ref={inputRef}
                        onChange={(e) => setUserName(e.target.value)}
                    ></input>
                    <input
                        className={cx('input-add-name')}
                        placeholder="Nhập tên người dùng"
                        value={displayname}
                        required
                        ref={inputRef}
                        onChange={(e) => setDisplayName(e.target.value)}
                    ></input>
                    <input
                        className={cx('input-add-name')}
                        placeholder="Nhập email"
                        value={email}
                        required
                        ref={inputRef}
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

export default AddUserModal;
