import classNames from 'classnames/bind';
import Table from 'react-bootstrap/Table';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

import * as filmServices from '~/services/filmServices';
import styles from './EpisodeAdmin.module.scss';
import ModalAddEpisode from './ModalAddEpisode';
import ModalUpdateEpisode from './ModalUpdateEpisode';
import ModalDeleteEpisode from './ModalDeleteEpisode';

const cx = classNames.bind(styles);

function EpisodeAdmin() {
    const [episodes, setEpisodes] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [slugFilm, setSlugFilm] = useState('dao-hai-tac');
    const [films, setFilms] = useState();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEpisode, setSelectedEpisode] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await filmServices.getbyslug(slugFilm);
            setEpisodes(result.episodes);
        };
        fetchData();
    }, [slugFilm]);
    useEffect(() => {
        const fetchFilmsData = async () => {
            const result = await filmServices.getall();
            setFilms(result);
        };
        fetchFilmsData();
    }, []);

    const handleSearchChange = (e) => {
        var searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    const handleUpdateFromModal = (data) => {
        let cloneEpisodes = _.cloneDeep(episodes);
        let index = episodes.findIndex((item) => item.id === data.id);
        cloneEpisodes[index].name = data.name;
        cloneEpisodes[index].slug = data.slug;
        cloneEpisodes[index].link = data.link;
        cloneEpisodes[index].filmName = data.filmName;
        cloneEpisodes[index].sectionName = data.sectionName;
        console.log(cloneEpisodes[index]);
        setEpisodes(cloneEpisodes);
    };
    const handleDeleteFromModal = (data) => {
        let cloneFilms = _.cloneDeep(films);
        cloneFilms = cloneFilms.filter((item) => item.id !== data.id);
        setFilms(cloneFilms);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <div className={cx('title-name')}>Quản lý tập</div>
            </div>
            <div className={cx('header-area')}>
                <div className={cx('search')}>
                    <input placeholder="Tìm kiếm" value={searchValue} onChange={handleSearchChange} />
                    <div className={cx('search-icon')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>
                <div>
                    <select className={cx('input-add')} onChange={(e) => setSlugFilm(e.target.value)}>
                        {films &&
                            films.map((item) => {
                                return (
                                    <option key={item.id} value={item.slug}>
                                        {item.name}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className={cx('action')}>
                    <Button
                        variant="primary"
                        className={cx('action-add')}
                        onClick={() => setShowAddModal(true)}
                        size="lg"
                    >
                        <FontAwesomeIcon icon={faAdd} /> Thêm tập
                    </Button>
                </div>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên tập</th>
                        <th>Tên phim</th>
                        <th>Phần</th>
                        <th>Slug</th>
                        <th>Link</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {episodes ? (
                        episodes.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.filmName}</td>
                                <td>{item.sectionName}</td>
                                <td>{item.slug}</td>
                                <td colSpan={1}>{item.link}</td>
                                <td>
                                    <FontAwesomeIcon
                                        className={cx('update-icon')}
                                        onClick={() => {
                                            setSelectedEpisode(item);
                                            setShowUpdateModal(true);
                                        }}
                                        icon={faPen}
                                    />

                                    <FontAwesomeIcon
                                        className={cx('delete-icon')}
                                        onClick={() => {
                                            setSelectedEpisode(item);
                                            setShowDeleteModal(true);
                                        }}
                                        icon={faTrash}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className={cx('no-records')}>
                                Không có bản ghi
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <ModalAddEpisode
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                // handleUpdateData={handleUpdateData}
            />
            <ModalUpdateEpisode
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                episode={selectedEpisode}
                handleUpdateFromModal={handleUpdateFromModal}
            />
            <ModalDeleteEpisode
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                episode={selectedEpisode}
                handleDeleteFromModal={handleDeleteFromModal}
            />
        </div>
    );
}

export default EpisodeAdmin;
