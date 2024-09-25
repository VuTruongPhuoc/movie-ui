import classNames from 'classnames/bind';
import Table from 'react-bootstrap/Table';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import { useEffect, useRef, useState } from 'react';

import * as userServices from '~/services/userServices';
import styles from './UserAdmin.module.scss';
import formatDate from '~/utils/formatDate';
import useDebounce from '~/hooks/useDebounce';
import Pagination from '~/components/Pagination';
import ModalAddUser from './ModalAddUser';
import ModalUpdateUser from './ModalUpdateUser';
import { faAdd, faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalDeleteUser from './ModalDeleteUser';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';

const cx = classNames.bind(styles);

function UserAdmin() {
    const [users, setUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 500);
    const itemsPerPage = 10;

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModalChangeRole, setShowModalChangeRole] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    useEffect(() => {
        const fetchData = async (page, pageSize) => {
            const result = await userServices.getall(page, pageSize);
            setCurrentPage(result.pageNumber);
            setPageCount(result.totalPages);
            const filtered = result.items.filter((item) =>
                item.displayName?.toLowerCase().includes(debouncedValue.toLowerCase()),
            );
            setUsers(filtered);
        };
        fetchData(currentPage, itemsPerPage);
    }, [currentPage, debouncedValue, showModalChangeRole]);
    const handleClickChangeRole = (rolename) => {
        const fetchApi = async () => {
            try {
                console.log(selectedUser);
                const response = await userServices.changerole(selectedUser.userName, rolename);

                toast.success(response.message);
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
    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value.trim());
    };

    const handleUpdateData = (data) => {
        setUsers([data, ...users]);
    };
    const handleUpdateFromModal = (data) => {
        let cloneUsers = _.cloneDeep(users);
        let index = users.findIndex((item) => item.id === data.id);
        cloneUsers[index].name = data.name;
        cloneUsers[index].isActive = data.isActive;

        setUsers(cloneUsers);
    };
    const handleDeleteFromModal = (data) => {
        let cloneUsers = _.cloneDeep(users);
        cloneUsers = cloneUsers.filter((item) => item.id !== data.id);
        setUsers(cloneUsers);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <div className={cx('title-name')}>Quản lý người dùng</div>
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
                        <FontAwesomeIcon icon={faAdd} /> Thêm người dùng
                    </Button>
                </div>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên tài khoản</th>
                        <th>Hình ảnh</th>
                        <th>Tên hiển thị</th>
                        <th>Email</th>
                        <th>Vai trò</th>
                        <th>Hoạt động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((item, index) => (
                            <tr key={item.id}>
                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td>{item.userName}</td>
                                <td>
                                    {' '}
                                    <img
                                        className={cx('avatar')}
                                        src={
                                            item.avatar
                                                ? item.avatar
                                                : 'https://animehay.cam/upload/avatar/37371.jpg?t=1726814583'
                                        }
                                        alt="hihi"
                                    />
                                </td>
                                <td>{item.displayName}</td>
                                <td>{item.email}</td>
                                <td>
                                    <div className={cx('role-wrapper')}>
                                        <div
                                            className={cx('role')}
                                            onClick={(e) => {
                                                const rect = e.target.getBoundingClientRect();
                                                setModalPosition({
                                                    top: rect.bottom + window.scrollY,
                                                    left: rect.left + window.scrollX,
                                                });
                                                setSelectedUser(item);
                                                setShowModalChangeRole(true);
                                            }}
                                        >
                                            {item.roleName}
                                        </div>
                                    </div>
                                </td>
                                <td>{item.LockoutEnable ? 'hihi' : 'hiho'}</td>
                                <td>
                                    <FontAwesomeIcon
                                        className={cx('update-icon')}
                                        onClick={() => {
                                            setSelectedUser(item);
                                            setShowUpdateModal(true);
                                        }}
                                        icon={faPen}
                                    />

                                    <FontAwesomeIcon
                                        className={cx('delete-icon')}
                                        onClick={() => {
                                            setSelectedUser(item);
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
            {showModalChangeRole && selectedUser && (
                <div
                    className={cx('changerole')}
                    style={{
                        top: `${modalPosition.top + 60}px`,
                        left: `${modalPosition.left + 100}px`,
                    }}
                >
                    <div className={cx('changerole-content')}>
                        <div
                            className={cx('role')}
                            onClick={() => {
                                handleClickChangeRole('admin');
                                setShowModalChangeRole(false);
                            }}
                        >
                            admin
                        </div>
                        <div
                            className={cx('role')}
                            onClick={() => {
                                handleClickChangeRole('customer');
                                setShowModalChangeRole(false);
                            }}
                        >
                            customer
                        </div>
                        <div
                            className={cx('role')}
                            onClick={() => {
                                handleClickChangeRole('employee');
                                setShowModalChangeRole(false);
                            }}
                        >
                            employee
                        </div>
                    </div>
                </div>
            )}
            <ModalAddUser
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                handleUpdateData={handleUpdateData}
            />
            <ModalUpdateUser
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                user={selectedUser}
                handleUpdateFromModal={handleUpdateFromModal}
            />
            <ModalDeleteUser
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                user={selectedUser}
                handleDeleteFromModal={handleDeleteFromModal}
            />

            <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </div>
    );
}

export default UserAdmin;
