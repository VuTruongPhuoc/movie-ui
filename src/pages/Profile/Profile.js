import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useContext, useEffect, useState } from 'react';
import ModalCustom from '~/components/Modal';
import ModalChangeAvatar from '~/components/Modal/ModalChangeAvatar';
import AuthContext from '~/context/AuthProvider';
import * as userServices from '~/services/userServices';

const cx = classNames.bind(styles);

const Profile = () => {
    const [isShowFormChangeAvatar, setIsShowFormChangeAvatar] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    let { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_CURRENT_USER));
    }
    useEffect(() => {
        setAvatarUrl(currentUser.avatarUrl);
        refreshUser();
    }, []);
    const refreshUser = async () => {
        const fetchApi = async () => {
            try {
                const response = await userServices.get(currentUser.userName);
                setAvatarUrl(response.user.avatarUrl);
            } catch (err) {}
        };
        fetchApi();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Hello {currentUser.displayName}</div>
            <div className={cx('user-profile')}>
                <div className={cx('avatar')}>
                    <img
                        src={avatarUrl ? avatarUrl : 'https://animehay.cam/upload/avatar/37371.jpg?t=1726814583'}
                        alt=""
                    />
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
                    <ModalChangeAvatar
                        user={currentUser}
                        handleClose={() => setIsShowFormChangeAvatar(false)}
                        handleRefreshUserList={refreshUser}
                    />
                </ModalCustom>
            )}
        </div>
    );
};

export default Profile;
