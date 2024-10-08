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
    const [categories, setCategories] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 500);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const result = await categoryServices.getall();

            setCategories(result);
        };
        fetchData();
    }, [debouncedValue]);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value.trim());
    };

    const handleUpdateData = (data) => {
        setCategories([data, ...categories]);
    };
    const handleUpdateFromModal = (data) => {
        let cloneCategorys = _.cloneDeep(categories);
        let index = categories.findIndex((item) => item.id === data.id);
        cloneCategorys[index].name = data.name;
        cloneCategorys[index].slug = data.slug;
        cloneCategorys[index].isActive = data.isActive;

        setCategories(cloneCategorys);
    };
    const handleDeleteFromModal = (data) => {
        let cloneCategorys = _.cloneDeep(categories);
        cloneCategorys = cloneCategorys.filter((item) => item.id !== data.id);
        setCategories(cloneCategorys);
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
                    {categories.length > 0 ? (
                        categories.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
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
        </div>
    );
}

export default CategoryAdmin;
