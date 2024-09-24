import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './SectionAdmin.module.scss';
import * as sectionServices from '~/services/sectionServices';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function UpdateSectionModal(props) {
    const { show, handleClose, section, handleUpdateFromModal } = props;
    const [name, setName] = useState('');

    useEffect(() => {
        if (show) {
            setName(section.name);
        }
    }, [section]);

    const handleSaveSection = (e) => {
        const fetchApi = async () => {
            try {
                const response = await sectionServices.update(section.id, name);
                if (response && response.success) {
                    handleUpdateFromModal({
                        name: name,
                        id: section.id,
                        isActive: section.isActive,
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
                    <Modal.Title>Cập nhật phần</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        name="name"
                        type="text"
                        className={cx('input-add-name')}
                        placeholder="Nhập tên phần"
                        value={name}
                        required
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

export default UpdateSectionModal;
