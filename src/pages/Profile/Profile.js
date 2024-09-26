import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useState } from 'react';
import ModalCustom from '~/components/Modal';
import ModalChangeAvatar from '~/components/Modal/ModalChangeAvatar';

const cx = classNames.bind(styles);

const Profile = () => {
    const [isShowFormChangeAvatar, setIsShowFormChangeAvatar] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Hello Marin</div>
            <div className={cx('user-profile')}>
                <div className={cx('avatar')}>
                    <img src="https://animehay.cam/upload/avatar/37371.jpg?t=1726814583" alt="" />
                    <div className={cx('btn-default')} onClick={() => setIsShowFormChangeAvatar(true)}>
                        Thay Avatar
                    </div>
                </div>
                <div className={cx('user-info')}>
                    <div className={cx('input')}>
                        <div className={cx('label')}>Tên hiển thị</div>
                        <input name="displayname" type="text" required placeholder="Nhập tên hiển thị" />
                    </div>
                </div>
            </div>
            {isShowFormChangeAvatar && (
                <ModalCustom onClose={() => setIsShowFormChangeAvatar(false)} title="Tải lên ảnh đại diện mới">
                    <ModalChangeAvatar />
                </ModalCustom>
            )}
        </div>
    );
};

export default Profile;
