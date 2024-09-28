import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './CategoryAdmin.module.scss';
import * as categoryServices from '~/services/categoryServices';
import { toast } from 'react-toastify';
import { slugHandler } from '~/utils/slugHandler';

const cx = classNames.bind(styles);

function UpdateCategoryModal(props) {
    const { show, handleClose, category, handleUpdateFromModal } = props;
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    useEffect(() => {
        if (show) {
            setName(category.name || '');
            setSlug(category.slug || '');
        }
    }, [category, show]);

    const handleSaveCategory = (e) => {
        const fetchApi = async () => {
            try {
                const response = await categoryServices.update(category.id, name, slug);
                if (response && response.success) {
                    handleUpdateFromModal({
                        name: name,
                        slug: slug,
                        id: category.id,
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
    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        setSlug(slugHandler(value));
    };
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thể loại</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label>Tên phần: </label>
                        <input
                            className={cx('input-add-name')}
                            placeholder="Nhập tên phần"
                            value={name}
                            onChange={handleNameChange}
                        ></input>
                    </div>
                    <div>
                        <label>Slug: </label>
                        <input
                            className={cx('input-add-name')}
                            placeholder="Nhập slug:"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                        ></input>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" size="lg" onClick={handleSaveCategory}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UpdateCategoryModal;
