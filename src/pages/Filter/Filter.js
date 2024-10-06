import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Filter.module.scss';
import * as categoryServices from '~/services/categoryServices';
import * as countryServices from '~/services/countryServices';
import * as filmServices from '~/services/filmServices';
import config from '~/config';
import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);

const Filter = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 24;
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [year, setYear] = useState('');
    const [category, setCategory] = useState('');
    const [country, setCountry] = useState('');
    const [films, setFilms] = useState([]);

    const years = [
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019',
        '2020',
        '2021',
        '2022',
        '2023',
        '2024',
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    useEffect(() => {
        const fetchCategoriesData = async () => {
            const result = await categoryServices.getall();
            setCategories(result);
        };

        const fetchCountriesData = async () => {
            const result = await countryServices.getall();
            setCountries(result);
        };

        fetchCategoriesData();
        fetchCountriesData();
    }, []);

    useEffect(() => {
        const fetchFilmsData = async (page, pageSize) => {
            try {
                const response = await filmServices.filter(page, pageSize, year, category, country);
                setCurrentPage(response.data.pageNumber);
                setPageCount(response.data.totalPages);
                setFilms(response.data.items);
            } catch (error) {}
        };

        fetchFilmsData(currentPage, itemsPerPage);
    }, [currentPage, pageCount, year, category, country]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('filter-header')}>
                <title className={cx('filter-title')}>Lọc phim</title>
                <div className={cx('dropdowns-container')}>
                    <span>Điều chình tùy chọn</span>
                    <div className={cx('dropdowns')}>
                        <div className={cx('category-dropdown')}>
                            <select
                                className={cx('dropdown')}
                                style={{ width: '200px' }}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Tùy chọn thể loại</option>
                                {categories &&
                                    categories.map((item) => {
                                        return (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className={cx('country-dropdown')}>
                            <select
                                className={cx('dropdown')}
                                style={{ width: '200px' }}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Tùy chọn đất nước</option>
                                {countries &&
                                    countries.map((item) => {
                                        return (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className={cx('year-dropdown')}>
                            <select
                                className={cx('dropdown')}
                                style={{ width: '200px' }}
                                onChange={(e) => setYear(e.target.value)}
                            >
                                <option value="">Tùy chọn năm</option>
                                {years &&
                                    years.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('filter-content')}>
                <div className={cx('content-list')}>
                    {films &&
                        films.map((item) => {
                            return (
                                <Link
                                    className={cx('film-item')}
                                    key={item.id}
                                    to={`${config.routes.watch}/${item.slug}`}
                                >
                                    <div className={cx('img-area')}>
                                        <img className={cx('film-img')} src={item.imageUrl} alt={item.name} />
                                        <span className={cx('film-episode')}>Tập {item.numberOfEpisodes}</span>
                                    </div>
                                    <span className={cx('film-name')}>{item.name}</span>
                                </Link>
                            );
                        })}
                </div>
            </div>
            <div style={{ margin: '0 auto' }}>
                <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
            </div>
        </div>
    );
};

export default Filter;
