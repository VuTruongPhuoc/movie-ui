import classNames from 'classnames/bind';
import Table from 'react-bootstrap/Table';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { faAdd, faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as filmServices from '~/services/filmServices';
import styles from './FilmAdmin.module.scss';
import ModalAddFilm from './ModalAddFilm';
import ModalUpdateFilm from './ModalUpdateFilm';
import ModalDeleteFilm from './ModalDeleteFilm';
import ModalChangeFilmImage from '~/components/Modal/ModalChangeFilmImage';
import ModalCustom from '~/components/Modal';
import ModalChangeFilmPoster from '~/components/Modal/ModalChangeFilmPoster';

const cx = classNames.bind(styles);

function FilmAdmin() {
    const [films, setFilms] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState({});
    const [isShowModalChangeImage, setIsShowModalChangeImage] = useState(false);
    const [isShowModalChangePoster, setIsShowModalChangePoster] = useState(false);
    const refreshFilmList = () => {
        const fetchData = async () => {
            try {
                const response = await filmServices.getall();
                setFilms(response);
            } catch (err) {}
        };
        fetchData();
    };
    useEffect(() => {
        refreshFilmList();
    }, []);

    const handleSearchChange = (e) => {
        var searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleUpdateData = (data) => {
        setFilms([data, ...films]);
    };
    const handleUpdateFromModal = (data) => {
        let cloneFilms = _.cloneDeep(films);
        let index = films.findIndex((item) => item.id === data.id);
        cloneFilms[index].name = data.name;
        cloneFilms[index].slug = data.slug;
        cloneFilms[index].originName = data.originName;
        cloneFilms[index].time = data.time;
        cloneFilms[index].type = data.type;
        cloneFilms[index].year = data.year;
        cloneFilms[index].numberOfEpisodes = data.numberOfEpisodes;
        cloneFilms[index].categories = data.categories;
        cloneFilms[index].country.id = data.countryId;
        cloneFilms[index].schedule.id = data.scheduleId;
        cloneFilms[index].country.name = data.countryName;
        cloneFilms[index].schedule.name = data.scheduleName;
        console.log(cloneFilms);
        setFilms(cloneFilms);
    };
    const handleDeleteFromModal = (data) => {
        let cloneFilms = _.cloneDeep(films);
        cloneFilms = cloneFilms.filter((item) => item.id !== data.id);
        setFilms(cloneFilms);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <div className={cx('title-name')}>Quản lý phim</div>
            </div>
            <div className={cx('header-area')}>
                <div className={cx('search')}>
                    <input placeholder="Tìm kiếm" value={searchValue} onChange={handleSearchChange} />
                    <div className={cx('search-icon')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>
                <div className={cx('action')}>
                    <Button
                        variant="primary"
                        className={cx('action-add')}
                        onClick={() => setShowAddModal(true)}
                        size="lg"
                    >
                        <FontAwesomeIcon icon={faAdd} /> Thêm phim
                    </Button>
                </div>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên phim</th>
                        <th>Slug</th>
                        <th>Hình ảnh</th>
                        <th>Poster</th>
                        <th>Tên gốc</th>
                        <th>Thời lượng</th>
                        <th>Số tập</th>
                        <th>Loại phim</th>
                        <th>Thể loại</th>
                        <th>Năm</th>
                        <th>Đất nước</th>
                        <th>Lịch phim</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {films.length > 0 ? (
                        films.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.slug}</td>
                                <td>
                                    <img
                                        className={cx('image')}
                                        src={
                                            item.image
                                                ? item.imageUrl
                                                : 'https://localhost:7039/Content/Images/marinanime20242328012302.png'
                                        }
                                        alt="hihi"
                                        onClick={() => {
                                            setIsShowModalChangeImage(true);
                                            setSelectedFilm(item);
                                        }}
                                    />
                                </td>
                                <td>
                                    <img
                                        className={cx('image')}
                                        src={
                                            item.poster
                                                ? item.posterUrl
                                                : 'https://localhost:7039/Content/Images/marinanime20242328012302.png'
                                        }
                                        alt="hihi"
                                        onClick={() => {
                                            setIsShowModalChangePoster(true);
                                            setSelectedFilm(item);
                                        }}
                                    />
                                </td>
                                <td>{item.originName}</td>
                                <td>{item.time}</td>
                                <td>{item.numberOfEpisodes}</td>

                                <td>
                                    {(() => {
                                        switch (item.type) {
                                            case '0':
                                                return 'Phim bộ';
                                            case '1':
                                                return 'Phim lẻ';
                                            case '2':
                                                return 'Phim hoạt hình';
                                            default:
                                                return 'Không xác định';
                                        }
                                    })()}
                                </td>
                                <td>
                                    <div className={cx('categories-area')}>
                                        {item.categories &&
                                            item.categories.map((item) => (
                                                <span className={cx('category-item')} key={item.id}>
                                                    {item.name}
                                                </span>
                                            ))}
                                    </div>
                                </td>
                                <td>{item.year}</td>
                                <td>{item.country ? item.country.name : 'hihi'}</td>
                                <td>{item.schedule ? item.schedule.name : 'hihi'}</td>
                                <td>
                                    <FontAwesomeIcon
                                        className={cx('update-icon')}
                                        onClick={() => {
                                            setSelectedFilm(item);
                                            setShowUpdateModal(true);
                                        }}
                                        icon={faPen}
                                    />

                                    <FontAwesomeIcon
                                        className={cx('delete-icon')}
                                        onClick={() => {
                                            setSelectedFilm(item);
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

            <ModalAddFilm
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                handleUpdateData={handleUpdateData}
            />
            <ModalUpdateFilm
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                film={selectedFilm}
                handleUpdateFromModal={handleUpdateFromModal}
            />
            <ModalDeleteFilm
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                film={selectedFilm}
                handleDeleteFromModal={handleDeleteFromModal}
            />
            {isShowModalChangeImage && (
                <ModalCustom onClose={() => setIsShowModalChangeImage(false)} title="Tải lên ảnh phim mới">
                    <ModalChangeFilmImage
                        data={selectedFilm}
                        handleClose={() => setIsShowModalChangeImage(false)}
                        handleRefresh={refreshFilmList}
                    />
                </ModalCustom>
            )}
            {isShowModalChangePoster && (
                <ModalCustom onClose={() => setIsShowModalChangePoster(false)} title="Tải lên poster phim mới">
                    <ModalChangeFilmPoster
                        data={selectedFilm}
                        handleClose={() => setIsShowModalChangePoster(false)}
                        handleRefresh={refreshFilmList}
                    />
                </ModalCustom>
            )}
        </div>
    );
}

export default FilmAdmin;
