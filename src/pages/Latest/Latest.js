import classNames from 'classnames/bind';
import styles from './Latest.module.scss';
import FilmByGenre from '~/components/FilmByGenre';

const cx = classNames.bind(styles);

const Latest = () => {
    return (
        <div className={cx('wrapper')}>
            <FilmByGenre title="Phim mới"></FilmByGenre>
        </div>
    );
};

export default Latest;
