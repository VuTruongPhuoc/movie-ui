import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import RowSlider from '~/components/RowSlider';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row-container')}>
                <RowSlider />
            </div>
        </div>
    );
}

export default Home;
