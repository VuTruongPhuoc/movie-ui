import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import RowSlider from '~/components/RowSlider';
import FilmByGenre from '~/components/FilmByGenre';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row-container')}>
                <RowSlider title={'Phim hành động mới'} />
                <FilmByGenre title={'Phim hay nhat'} />
                <FilmByGenre title={'Phim dam boc'} />
            </div>
        </div>
    );
}

export default Home;
