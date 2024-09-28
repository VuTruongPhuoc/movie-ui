import classNames from 'classnames/bind';
import Table from 'react-bootstrap/Table';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

import * as countryServices from '~/services/countryServices';
import styles from './CountryAdmin.module.scss';
import formatDate from '~/utils/formatDate';
import useDebounce from '~/hooks/useDebounce';
import Pagination from '~/components/Pagination';
import ModalAddCountry from './ModalAddCountry';
import ModalUpdateCountry from './ModalUpdateCountry';
import { faAdd, faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalDeleteCountry from './ModalDeleteCountry';

const cx = classNames.bind(styles);

function CountryAdmin() {
    const [countries, setCountries] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 500);
    const itemsPerPage = 10;

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({});
    useEffect(() => {
        const fetchData = async (page, pageSize) => {
            const result = await countryServices.getall(page, pageSize);
            setCurrentPage(result.pageNumber);
            setPageCount(result.totalPages);

            const filtered = result.items.filter((item) =>
                item.name.toLowerCase().includes(debouncedValue.toLowerCase()),
            );
            setCountries(filtered);
        };
        fetchData(currentPage, itemsPerPage);
    }, [currentPage, debouncedValue]);

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value.trim());
    };

    const handleUpdateData = (data) => {
        setCountries([data, ...countries]);
    };
    const handleUpdateFromModal = (data) => {
        let clonecountries = _.cloneDeep(countries);
        let index = countries.findIndex((item) => item.id === data.id);
        clonecountries[index].name = data.name;
        clonecountries[index].isActive = data.isActive;

        setCountries(clonecountries);
    };
    const handleDeleteFromModal = (data) => {
        let clonecountries = _.cloneDeep(countries);
        clonecountries = clonecountries.filter((item) => item.id !== data.id);
        setCountries(clonecountries);
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
                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
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

            <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </div>
    );
}

export default CountryAdmin;
