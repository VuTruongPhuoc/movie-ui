import classNames from 'classnames/bind';
import styles from './SectionAdmin.module.scss';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';

import * as sectionServices from '~/services/sectionServices';
import formatDate from '~/utils/formatDate';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SectionAdmin() {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await sectionServices.getall();
            setSections(result);
        };
        fetchData();
    }, []);
    const handlePageClick = (event) => {};
    console.log(sections);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <div className={cx('title-name')}>Quản lý phần</div>
                <div className={cx('title-action')}>
                    <Button primary leftIcon={<FontAwesomeIcon icon={faAdd} />} className={cx('action-add')}>
                        Thêm phần
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
                    {sections ? (
                        sections.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{formatDate(new Date(item.createDate))}</td>
                                <td>{item.isActive ? 'hihi' : 'hoho'}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <div>Không có bản ghi</div>
                    )}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={20}
                previousLabel="< previous"
                pageClassName={cx('page-item')}
                pageLinkClassName={cx('page-link')}
                previousClassName={cx('page-item')}
                previousLinkClassName={cx('page-link')}
                nextClassName={cx('page-item')}
                nextLinkClassName={cx('page-link')}
                breakClassName={cx('page-item')}
                breakLinkClassName={cx('page-link')}
                containerClassName={cx('pagination')}
                activeClassName={cx('active')}
                renderOnZeroPageCount={null}
            />
        </div>
    );
}

export default SectionAdmin;
