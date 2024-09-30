import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Bold,
    Essentials,
    Heading,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    Table,
    Undo,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

import * as filmServices from '~/services/filmServices';
import * as scheduleServices from '~/services/scheduleServices';
import * as countryServices from '~/services/countryServices';
import * as categoryServices from '~/services/categoryServices';
import styles from './FilmAdmin.module.scss';
import { slugHandler } from '~/utils/slugHandler';

const cx = classNames.bind(styles);

function UpdateFilmModal(props) {
    const { show, handleClose, film, handleUpdateFromModal } = props;
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [originName, setOriginName] = useState('');
    const [type, setType] = useState('');
    const [time, setTime] = useState('');
    const [year, setYear] = useState('');
    const [trailer, setTrailer] = useState('');
    const [numberOfEpisodes, setNumberOfEpisodes] = useState('');
    const [scheduleId, setScheduleId] = useState();
    const [countryId, setCountryId] = useState();
    const [schedules, setSchedules] = useState();
    const [countries, setCountries] = useState();
    const [categories, setCategories] = useState();
    const [categoryIds, setCategoryIds] = useState([]);
    const [description, setDescription] = useState('');

    const data = {
        id: film.id,
        name: name,
        slug: slug,
        originName: originName,
        type: type,
        time: time,
        year: year,
        numberOfEpisodes: numberOfEpisodes,
        trailer: trailer,
        categoryIds: categoryIds,
        scheduleId: scheduleId,
        countryId: countryId,
        description: description,
    };
    useEffect(() => {
        if (show) {
            setName(film.name);
            setSlug(film.slug);
            setOriginName(film.originName);
            setType(film.type);
            setTime(film.time);
            setYear(film.year);
            setNumberOfEpisodes(film.numberOfEpisodes);
            setTrailer(film.trailer);
            setCategoryIds(film.categories.map((category) => category.id));
            setScheduleId(film.schedule.id);
            setCountryId(film.country.id);
            setDescription(film.description);
            console.log(film);
        }
    }, [film, show]);
    useEffect(() => {
        const fetchScheduleData = async () => {
            const response = await scheduleServices.getall();
            setSchedules(response);
        };
        const fetchCountryData = async () => {
            const response = await countryServices.getall();
            setCountries(response);
        };
        const fetchCategoryData = async () => {
            const response = await categoryServices.getall();
            setCategories(response);
        };
        fetchScheduleData();
        fetchCountryData();
        fetchCategoryData();
    }, []);
    const handleSaveFilm = async (e) => {
        const fetchApi = async () => {
            try {
                const response = await filmServices.update(data);
                if (response && response.success) {
                    const categoriesupdated = categories.filter((category) => categoryIds.includes(category.id));
                    handleUpdateFromModal({
                        id: film.id,
                        name: name,
                        slug: slug,
                        originName: originName,
                        type: type,
                        time: time,
                        year: year,
                        numberOfEpisodes: numberOfEpisodes,
                        countryId: countryId,
                        scheduleId: scheduleId,
                        categories: categoriesupdated,
                        countryName: countries.find((country) => country.id == countryId)?.name,
                        scheduleName: schedules.find((schedule) => schedule.id == scheduleId)?.name,
                        description: description,
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
    const handleChangeName = (e) => {
        var value = e.target.value;
        setName(value);
        setSlug(slugHandler(value));
    };
    function handleChange(e) {
        const value = Number(e.target.value);
        setCategoryIds((prevIds) => {
            if (e.target.checked) {
                return [...prevIds, value];
            } else {
                return prevIds.filter((item) => item !== value);
            }
        });
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose} style={{}}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật quốc gia</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    <div>
                        <label>Tên phim:</label>
                        <input
                            className={cx('input-add')}
                            placeholder="Nhập tên phim"
                            value={name}
                            required
                            onChange={handleChangeName}
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
                        <label>Tên gốc: </label>
                        <input
                            className={cx('input-add')}
                            placeholder="Nhập tên gốc"
                            value={originName}
                            required
                            onChange={(e) => setOriginName(e.target.value)}
                        ></input>
                    </div>

                    <div>
                        <label>Thời lượng phim: </label>
                        <input
                            className={cx('input-add')}
                            placeholder="Nhập thời lượng phim"
                            value={time}
                            required
                            onChange={(e) => setTime(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Năm phát hành: </label>
                        <input
                            className={cx('input-add')}
                            placeholder="Nhập năm phát hành"
                            value={year}
                            required
                            onChange={(e) => setYear(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Số tập phim: </label>
                        <input
                            className={cx('input-add')}
                            placeholder="Nhập số tập phim"
                            value={numberOfEpisodes}
                            required
                            onChange={(e) => setNumberOfEpisodes(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Trailer: </label>
                        <input
                            className={cx('input-add')}
                            placeholder="Nhập trailer"
                            value={trailer}
                            required
                            onChange={(e) => setTrailer(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Loại phim: </label>
                        <select className={cx('input-add')} onChange={(e) => setType(e.target.value)} value={type}>
                            <option value="0">Phim bộ</option>
                            <option value="1">Phim lẻ</option>
                            <option value="2">Phim hoạt hình</option>
                        </select>
                    </div>
                    <div>
                        <label className={cx('label-checkbox')}>Thể loại: </label>
                        <div className={cx('checkbox-area')}>
                            {categories &&
                                categories.map((item, index) => {
                                    return (
                                        <div className={cx('input-checkbox')} key={item.id}>
                                            <input
                                                className={cx('checkbox')}
                                                value={item.id}
                                                type="checkbox"
                                                onChange={handleChange}
                                                checked={categoryIds.includes(item.id)}
                                            ></input>
                                            <strong>{item.name}</strong>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div>
                        <label>Đất nước: </label>
                        <select
                            className={cx('input-add')}
                            onChange={(e) => setCountryId(e.target.value)}
                            value={countryId}
                        >
                            {countries &&
                                countries.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div>
                        <label>Lịch chiếu phim: </label>
                        <select
                            className={cx('input-add')}
                            onChange={(e) => setScheduleId(e.target.value)}
                            value={scheduleId}
                        >
                            {schedules &&
                                schedules.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div>
                        <label>Mô tả: </label>
                        <CKEditor
                            editor={ClassicEditor}
                            config={{
                                toolbar: [
                                    'undo',
                                    'redo',
                                    '|',
                                    'heading',
                                    '|',
                                    'bold',
                                    'italic',
                                    '|',
                                    'link',
                                    'insertTable',
                                    'mediaEmbed',
                                    '|',
                                    'bulletedList',
                                    'numberedList',
                                    'indent',
                                    'outdent',
                                ],
                                plugins: [
                                    Bold,
                                    Essentials,
                                    Heading,
                                    Indent,
                                    IndentBlock,
                                    Italic,
                                    Link,
                                    List,
                                    MediaEmbed,
                                    Paragraph,
                                    Table,
                                    Undo,
                                ],
                                initialData: '',
                                placeholder: 'Nhập mô tả phim',
                            }}
                            data={description}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setDescription(data);
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" size="lg" onClick={handleSaveFilm}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UpdateFilmModal;
