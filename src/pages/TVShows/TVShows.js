import classNames from 'classnames/bind';
import styles from './TVShows.module.scss';
import FilmByGenre from '~/components/FilmByGenre';

const cx = classNames.bind(styles);

const TVShows = () => {
    return (
        <div className={cx('wrapper')}>
            <FilmByGenre title="Phim bộ"></FilmByGenre>
        </div>
    );
};

export default TVShows;
