import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './CountryAdmin.module.scss';
import * as countryServices from '~/services/countryServices';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function UpdateCountryModal(props) {
    const { show, handleClose, country, handleUpdateFromModal } = props;
    const [name, setName] = useState('');

    useEffect(() => {
        if (show) {
            setName(country.name);
        }
    }, [country]);

    const handleSaveCountry = (e) => {
        const fetchApi = async () => {
            try {
                const response = await countryServices.update(country.id, name);
                if (response && response.success) {
                    handleUpdateFromModal({
                        name: name,
                        id: country.id,
                        isActive: country.isActive,
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
                    <Modal.Title>Cập nhật quốc gia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className={cx('input-add-name')}
                        placeholder="Nhập tên quốc gia"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" size="lg" onClick={handleSaveCountry}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UpdateCountryModal;
