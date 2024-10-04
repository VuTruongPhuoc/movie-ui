import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Search.module.scss';
import { PopperWrapper } from '~/components/Popper';
import FilmItem from '~/components/FilmItem';
import useDebounce from '~/hooks/useDebounce';
import * as filmServices from '~/services/filmServices';

const cx = classNames.bind(styles);

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchData = async () => {
            const result = await filmServices.search(1, 10, debouncedValue);
            setSearchResult(result.items);
        };
        fetchData();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleSpaceChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <HeadlessTippy
                interactive={true}
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h3 className={cx('search-title')}>Films</h3>
                            {searchResult.map((result) => (
                                <FilmItem key={result.id} data={result} onClick={() => setShowResult(false)} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search-box')}>
                    <div className={cx('search-input')}>
                        <input
                            ref={inputRef}
                            value={searchValue}
                            spellCheck={false}
                            onChange={handleSpaceChange}
                            onFocus={() => setShowResult(true)}
                            placeholder="Tìm kiếm phim"
                        />
                        {!!searchValue && (
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className={cx('search-clear')}
                                onClick={handleClear}
                            />
                        )}
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-icon')} />
                    </div>
                </div>
            </HeadlessTippy>
        </div>
    );
};

export default Search;
