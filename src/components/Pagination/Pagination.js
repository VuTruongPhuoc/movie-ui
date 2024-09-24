import React from 'react';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination(props) {
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={props.handlePageClick}
            pageRangeDisplayed={3}
            pageCount={props.pageCount}
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
    );
}

export default Pagination;
