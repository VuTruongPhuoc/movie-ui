import classNames from 'classnames/bind';
import Table from 'react-bootstrap/Table';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

import * as sectionServices from '~/services/sectionServices';
import styles from './SectionAdmin.module.scss';
import formatDate from '~/utils/formatDate';
import useDebounce from '~/hooks/useDebounce';
import Pagination from '~/components/Pagination';
import ModalAddSection from './ModalAddSection';
import ModalUpdateSection from './ModalUpdateSection';
import { faAdd, faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalDeleteSection from './ModalDeleteSection';

const cx = classNames.bind(styles);

function SectionAdmin() {
    const [sections, setSections] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 500);
    const itemsPerPage = 10;

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSection, setSelectedSection] = useState({});
    useEffect(() => {
        const fetchData = async (page, pageSize) => {
            const result = await sectionServices.getall(page, pageSize);
            setCurrentPage(result.pageNumber);
            setPageCount(result.totalPages);

            const filtered = result.items.filter((item) =>
                item.name.toLowerCase().includes(debouncedValue.toLowerCase()),
            );
            setSections(filtered);
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
        setSections([data, ...sections]);
    };
    const handleUpdateFromModal = (data) => {
        let cloneSections = _.cloneDeep(sections);
        let index = sections.findIndex((item) => item.id === data.id);
        cloneSections[index].name = data.name;
        cloneSections[index].isActive = data.isActive;

        setSections(cloneSections);
    };
    const handleDeleteFromModal = (data) => {
        let cloneSections = _.cloneDeep(sections);
        cloneSections = cloneSections.filter((item) => item.id !== data.id);
        setSections(cloneSections);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <div className={cx('title-name')}>Quản lý phần</div>
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
                        <FontAwesomeIcon icon={faAdd} /> Thêm phần
                    </Button>
                </div>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên phần</th>
                        <th>Ngày tạo</th>
                        <th>Hoạt động</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {sections.length > 0 ? (
                        sections.map((item, index) => (
                            <tr key={item.id}>
                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td>{item.name}</td>
                                <td>{formatDate(new Date(item.createDate))}</td>
                                <td>{item.isActive ? 'Hoạt động' : 'Không hoạt động'}</td>
                                <td>
                                    <FontAwesomeIcon
                                        className={cx('update-icon')}
                                        onClick={() => {
                                            setSelectedSection(item);
                                            setShowUpdateModal(true);
                                        }}
                                        icon={faPen}
                                    />

                                    <FontAwesomeIcon
                                        className={cx('delete-icon')}
                                        onClick={() => {
                                            setSelectedSection(item);
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
            <ModalAddSection
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                handleUpdateData={handleUpdateData}
            />
            <ModalUpdateSection
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                section={selectedSection}
                handleUpdateFromModal={handleUpdateFromModal}
            />
            <ModalDeleteSection
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                section={selectedSection}
                handleDeleteFromModal={handleDeleteFromModal}
            />

            <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </div>
    );
}

export default SectionAdmin;
