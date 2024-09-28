import classNames from 'classnames/bind';
import Table from 'react-bootstrap/Table';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

import * as categoryServices from '~/services/categoryServices';
import styles from './CategoryAdmin.module.scss';
import formatDate from '~/utils/formatDate';
import useDebounce from '~/hooks/useDebounce';
import Pagination from '~/components/Pagination';
import ModalAddCategory from './ModalAddCategory';
import ModalUpdateCategory from './ModalUpdateCategory';
import { faAdd, faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalDeleteCategory from './ModalDeleteCategory';

const cx = classNames.bind(styles);

function CategoryAdmin() {
    const [categrories, setCategorys] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 500);
    const itemsPerPage = 10;

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    useEffect(() => {
        const fetchData = async (page, pageSize) => {
            const result = await categoryServices.getall(page, pageSize);
            setCurrentPage(result.pageNumber);
            setPageCount(result.totalPages);

            const filtered = result.items.filter((item) =>
                item.name.toLowerCase().includes(debouncedValue.toLowerCase()),
            );
            setCategorys(filtered);
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
        setCategorys([data, ...categrories]);
    };
    const handleUpdateFromModal = (data) => {
        let cloneCategorys = _.cloneDeep(categrories);
        let index = categrories.findIndex((item) => item.id === data.id);
        cloneCategorys[index].name = data.name;
        cloneCategorys[index].slug = data.slug;
        cloneCategorys[index].isActive = data.isActive;

        setCategorys(cloneCategorys);
    };
    const handleDeleteFromModal = (data) => {
        let cloneCategorys = _.cloneDeep(categrories);
        cloneCategorys = cloneCategorys.filter((item) => item.id !== data.id);
        setCategorys(cloneCategorys);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <div className={cx('title-name')}>Quản lý thể loại</div>
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
                        <FontAwesomeIcon icon={faAdd} /> Thêm thể loại
                    </Button>
                </div>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên thể loại</th>
                        <th>Slug</th>
                        <th>Ngày tạo</th>

                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categrories.length > 0 ? (
                        categrories.map((item, index) => (
                            <tr key={item.id}>
                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.slug}</td>
                                <td>{formatDate(new Date(item.createDate))}</td>

                                <td>
                                    <FontAwesomeIcon
                                        className={cx('update-icon')}
                                        onClick={() => {
                                            setSelectedCategory(item);
                                            setShowUpdateModal(true);
                                        }}
                                        icon={faPen}
                                    />

                                    <FontAwesomeIcon
                                        className={cx('delete-icon')}
                                        onClick={() => {
                                            setSelectedCategory(item);
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
            <ModalAddCategory
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                handleUpdateData={handleUpdateData}
            />
            <ModalUpdateCategory
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                category={selectedCategory}
                handleUpdateFromModal={handleUpdateFromModal}
            />
            <ModalDeleteCategory
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                category={selectedCategory}
                handleDeleteFromModal={handleDeleteFromModal}
            />

            <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </div>
    );
}

export default CategoryAdmin;
