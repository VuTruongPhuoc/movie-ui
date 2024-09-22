import classNames from 'classnames/bind';
import styles from './NoPage.module.scss';

const cx = classNames.bind(styles);

const NoPage = () => {
    return (
        <div className={cx('wrapper')}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for doesn't exist.</p>
        </div>
    );
};

export default NoPage;
