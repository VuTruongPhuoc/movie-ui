import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './SectionAdmin.module.scss';
import * as sectionServices from '~/services/sectionServices';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function AddSectionModal(props) {
    const { show, handleClose, handleUpdateData } = props;
    const [name, setName] = useState('');
    const inputRef = useRef();
    const handleSaveSection = (e) => {
        const fetchApi = async () => {
            try {
                const response = await sectionServices.add(name);
                handleUpdateData(response.section);
                toast.success(response.message);
                setName('');
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
                    <Modal.Title>Thêm phần</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        name="name"
                        className={cx('input-add-name')}
                        placeholder="Nhập tên phần"
                        value={name}
                        required
                        ref={inputRef}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" size="lg" onClick={handleSaveSection}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddSectionModal;
