import classNames from 'classnames/bind';
import Table from 'react-bootstrap/Table';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { faAdd, faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as countryServices from '~/services/countryServices';
import styles from './CountryAdmin.module.scss';
import formatDate from '~/utils/formatDate';
import ModalAddCountry from './ModalAddCountry';
import ModalUpdateCountry from './ModalUpdateCountry';
import ModalDeleteCountry from './ModalDeleteCountry';

const cx = classNames.bind(styles);

function CountryAdmin() {
    const [countries, setCountries] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const result = await countryServices.getall();
            setCountries(result);
        };
        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value.trim());
    };

    const handleUpdateData = (data) => {
        setCountries([data, ...countries]);
    };
    const handleUpdateFromModal = (data) => {
        let cloneCountries = _.cloneDeep(countries);
        let index = countries.findIndex((item) => item.id === data.id);
        cloneCountries[index].name = data.name;
        cloneCountries[index].isActive = data.isActive;

        setCountries(cloneCountries);
    };
    const handleDeleteFromModal = (data) => {
        let cloneCountries = _.cloneDeep(countries);
        cloneCountries = cloneCountries.filter((item) => item.id !== data.id);
        setCountries(cloneCountries);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <div className={cx('title-name')}>Quản lý quốc gia</div>
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
                        <FontAwesomeIcon icon={faAdd} /> Thêm quốc gia
                    </Button>
                </div>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên quốc gia</th>
                        <th>Ngày tạo</th>

                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.length > 0 ? (
                        countries.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{formatDate(new Date(item.createDate))}</td>

                                <td>
                                    <FontAwesomeIcon
                                        className={cx('update-icon')}
                                        onClick={() => {
                                            setSelectedCountry(item);
                                            setShowUpdateModal(true);
                                        }}
                                        icon={faPen}
                                    />

                                    <FontAwesomeIcon
                                        className={cx('delete-icon')}
                                        onClick={() => {
                                            setSelectedCountry(item);
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
            <ModalAddCountry
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                handleUpdateData={handleUpdateData}
            />
            <ModalUpdateCountry
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                country={selectedCountry}
                handleUpdateFromModal={handleUpdateFromModal}
            />
            <ModalDeleteCountry
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                country={selectedCountry}
                handleDeleteFromModal={handleDeleteFromModal}
            />
        </div>
    );
}

export default CountryAdmin;
