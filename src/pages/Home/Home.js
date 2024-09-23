import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import RowSlider from '~/components/RowSlider';
import FilmByGenre from '~/components/FilmByGenre';
import { useContext, useEffect } from 'react';
import AuthContext from '~/context/AuthProvider';
import httpRequest from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function Home() {
    const { accessToken } = useContext(AuthContext);
    const getAllFilms = async () => {
        try {
            const response = await httpRequest.get('role/all', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllFilms();
    }, []);

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
