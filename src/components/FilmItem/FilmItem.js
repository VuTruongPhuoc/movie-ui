import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './FilmItem.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function FilmItem({ data, onClick }) {
    return (
        <>
            <Link to={`${config.routes.album}/${data.slug}`} className={cx('wrapper')} onClick={onClick}>
                <FontAwesomeIcon icon={faSearch} className={cx('icon')} />
                <h4 className={cx('name')}>
                    <span>{data.name}</span>
                </h4>
            </Link>
        </>
    );
}

FilmItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default FilmItem;
