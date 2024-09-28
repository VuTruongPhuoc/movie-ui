import classNames from 'classnames/bind';
import Table from 'react-bootstrap/Table';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

import * as scheduleServices from '~/services/scheduleServices';
import styles from './ScheduleAdmin.module.scss';
import formatDate from '~/utils/formatDate';
import useDebounce from '~/hooks/useDebounce';
import Pagination from '~/components/Pagination';
import ModalAddSchedule from './ModalAddSchedule';
import ModalUpdateSchedule from './ModalUpdateSchedule';
import { faAdd, faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalDeleteSchedule from './ModalDeleteSchedule';

const cx = classNames.bind(styles);

function ScheduleAdmin() {
    const [schedules, setSchedules] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 500);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const result = await scheduleServices.getall();
            const filtered = result.filter((item) => item.name.toLowerCase().includes(debouncedValue.toLowerCase()));
            setSchedules(filtered);
        };
        fetchData();
    }, [debouncedValue]);

    const handleSearchChange = (e) => {
        var searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleUpdateData = (data) => {
        setSchedules([data, ...schedules]);
    };
    const handleUpdateFromModal = (data) => {
        let cloneSchedules = _.cloneDeep(schedules);
        let index = schedules.findIndex((item) => item.id === data.id);
        cloneSchedules[index].name = data.name;
        cloneSchedules[index].isActive = data.isActive;

        setSchedules(cloneSchedules);
    };
    const handleDeleteFromModal = (data) => {
        let cloneSchedules = _.cloneDeep(schedules);
        cloneSchedules = cloneSchedules.filter((item) => item.id !== data.id);
        setSchedules(cloneSchedules);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <div className={cx('title-name')}>Quản lý lịch phim</div>
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
                        <FontAwesomeIcon icon={faAdd} /> Thêm lịch phim
                    </Button>
                </div>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên lịch phim</th>
                        <th>Ngày tạo</th>
                        <th>Hoạt động</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.length > 0 ? (
                        schedules.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{formatDate(new Date(item.createDate))}</td>
                                <td>{item.isActive ? 'Hoạt động' : 'Không hoạt động'}</td>
                                <td>
                                    <FontAwesomeIcon
                                        className={cx('update-icon')}
                                        onClick={() => {
                                            setSelectedSchedule(item);
                                            setShowUpdateModal(true);
                                        }}
                                        icon={faPen}
                                    />

                                    <FontAwesomeIcon
                                        className={cx('delete-icon')}
                                        onClick={() => {
                                            setSelectedSchedule(item);
                                            setShowDeleteModal(true);
                                        }}
                                        icon={faTrash}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className={cx('no-records')}>
                                Không có bản ghi
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <ModalAddSchedule
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                handleUpdateData={handleUpdateData}
            />
            <ModalUpdateSchedule
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                schedule={selectedSchedule}
                handleUpdateFromModal={handleUpdateFromModal}
            />
            <ModalDeleteSchedule
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                schedule={selectedSchedule}
                handleDeleteFromModal={handleDeleteFromModal}
            />
        </div>
    );
}

export default ScheduleAdmin;
