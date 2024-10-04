import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import * as filmServices from '~/services/filmServices';
import styles from './Genre.module.scss';
import FilmByGenre from '~/components/FilmByGenre';

const cx = classNames.bind(styles);

const Genre = () => {
    const [pagenumber, setPagenumber] = useState(1);

    const [pagesize, setPagesize] = useState(20);
    const [title, setTitle] = useState();
    const [filmsList, setFilmsList] = useState();

    const { categoryId } = useParams();
    useEffect(() => {
        if (categoryId) {
            const fetchData = async () => {
                const response = await filmServices.getByCategory(pagenumber, pagesize, categoryId);
                if (response && response.success) {
                    setFilmsList(response.data.items);
                    setTitle(response.name);
                }
            };
            fetchData();
        }
    }, [categoryId, pagenumber, pagesize]);
    return (
        <div>
            <FilmByGenre title={title} filmsList={filmsList} />
        </div>
    );
};

export default Genre;
