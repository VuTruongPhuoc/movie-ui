import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import * as episodeServices from '~/services/episodeServices';
import * as filmServices from '~/services/filmServices';
import * as sectionServices from '~/services/sectionServices';
import styles from './EpisodeAdmin.module.scss';

const cx = classNames.bind(styles);

function AddEpisodeModal(props) {
    const { show, handleClose } = props;
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [link, setLink] = useState('');
    const [films, setFilms] = useState();
    const [sections, setSections] = useState();
    const [filmId, setFilmId] = useState(11);
    const [sectionId, setSectionId] = useState(1);
    const data = {
        filmId,
        sectionId,
        name,
        slug,
        link,
    };

    const handleSaveEpisode = (e) => {
        const fetchApi = async () => {
            try {
                const response = await episodeServices.add(data);
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
    useEffect(() => {
        const fetchFilmsData = async () => {
            const result = await filmServices.getall();
            setFilms(result);
        };
        const fetchSectionsData = async () => {
            const result = await sectionServices.getall();
            setSections(result);
        };
        fetchFilmsData();
        fetchSectionsData();
    }, []);
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm tập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label>Chọn phim: </label>
                        <select className={cx('input-add')} onChange={(e) => setFilmId(e.target.value)}>
                            {films &&
                                films.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div>
                        <label>Chọn phần: </label>
                        <select className={cx('input-add')} onChange={(e) => setSectionId(e.target.value)}>
                            {sections &&
                                sections.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div>
                        <label>Tập: </label>
                        <input
                            className={cx('input-add')}
                            placeholder="Nhập tập phim"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Slug: </label>
                        <input
                            className={cx('input-add')}
                            placeholder="Nhập slug"
                            value={slug}
                            required
                            onChange={(e) => setSlug(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Link: </label>
                        <input
                            className={cx('input-add')}
                            placeholder="Nhập link"
                            value={link}
                            required
                            onChange={(e) => setLink(e.target.value)}
                        ></input>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" size="lg" onClick={handleSaveEpisode}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddEpisodeModal;
