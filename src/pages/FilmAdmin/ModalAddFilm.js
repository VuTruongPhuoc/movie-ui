import React, { useEffect, useState } from 'react';
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

import { slugHandler } from '~/utils/slugHandler';
import styles from './FilmAdmin.module.scss';

const cx = classNames.bind(styles);

function AddFilmModal(props) {
    const { show, handleClose, handleUpdateData } = props;
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [originName, setOriginName] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [scheduleId, setScheduleId] = useState(1);
    const [countryId, setCountryId] = useState(1);
    const [schedules, setSchedules] = useState();
    const [countries, setCountries] = useState();
    const [categories, setCategories] = useState();
    const [categoryIds, setCategoryIds] = useState([]);

    const data = { name, slug, originName, time, type, year, scheduleId, countryId, description, categoryIds };
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
    const handleSaveFilm = (e) => {
        const fetchApi = async () => {
            try {
                const response = await filmServices.add(data);
                handleUpdateData(response.film);
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
    const handleChangeName = (e) => {
        var value = e.target.value;
        setName(value);
        setSlug(slugHandler(value));
    };

    function handleChange(e) {
        if (e.target.checked) {
            setCategoryIds([...categoryIds, e.target.value]);
        } else {
            setCategoryIds(categoryIds.filter((item) => item !== e.target.value));
        }
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm phim</Modal.Title>
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
                            onChange={(e) => setOriginName(e.target.value)}
                        ></input>
                    </div>

                    <div>
                        <label>Thời lượng phim: </label>
                        <input
                            className={cx('input-add')}
                            placeholder="Nhập thời lượng phim"
                            value={time}
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
                        <label>Loại phim: </label>
                        <select className={cx('input-add')} onChange={(e) => setType(e.target.value)}>
                            <option value="0">Phim bộ</option>
                            <option value="1">Phim lẻ</option>
                            <option value="2">Phim hoạt hình</option>
                        </select>
                    </div>
                    <div>
                        <label className={cx('label-checkbox')}>Thể loại: </label>
                        <div className={cx('checkbox-area')}>
                            {categories &&
                                categories.map((item, index) => (
                                    <div className={cx('input-checkbox')} key={item.id}>
                                        <input
                                            className={cx('checkbox')}
                                            value={item.id}
                                            type="checkbox"
                                            onChange={handleChange}
                                        ></input>
                                        <strong>{item.name}</strong>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div>
                        <label>Đất nước: </label>
                        <select className={cx('input-add')} onChange={(e) => setCountryId(e.target.value)}>
                            {countries &&
                                countries.map((item, index) => {
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
                        <select className={cx('input-add')} onChange={(e) => setScheduleId(e.target.value)}>
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

export default AddFilmModal;
