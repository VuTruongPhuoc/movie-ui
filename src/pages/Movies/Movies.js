import classNames from 'classnames/bind';
import styles from './Movies.module.scss';
import FilmByGenre from '~/components/FilmByGenre';

const cx = classNames.bind(styles);

const Movies = () => {
    return (
        <div className={cx('wrapper')}>
            <FilmByGenre title="Phim lẻ"></FilmByGenre>
        </div>
    );
};

export default Movies;
