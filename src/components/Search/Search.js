import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const Search = () => {
    const [searchValue, setSearchValue] = useState('');

    const inputRef = useRef();

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handleSpaceChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search-box')}>
                <div className={cx('search-input')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        spellCheck={false}
                        onChange={handleSpaceChange}
                        placeholder="Tìm kiếm phim"
                    />
                    {!!searchValue && (
                        <FontAwesomeIcon icon={faCircleXmark} className={cx('search-clear')} onClick={handleClear} />
                    )}
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-icon')} />
                </div>
            </div>
        </div>
    );
};

export default Search;
