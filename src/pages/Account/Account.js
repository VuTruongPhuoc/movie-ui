import classNames from 'classnames/bind';
import styles from './Account.module.scss';

const cx = classNames.bind(styles);

const Account = () => {
    return (
        <div>
            <div className={cx('wrapper')}>account page</div>
        </div>
    );
};

export default Account;
