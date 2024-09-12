import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react/headless';
import { PopperWrapper } from '..';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);
const Menu = ({ children, items = [] }) => {
    return (
        <div className={cx('wrapper')}>
            <Tippy
                interactive={true}
                placement="bottom-end"
                delay={[200, 500]}
                zIndex={997}
                render={(attrs) => (
                    <div tabIndex={-1} {...attrs}>
                        <PopperWrapper className={cx('list-menu')}>
                            {items.map((item, index) => {
                                return <MenuItem key={item.title} data={item} onClick={item.onClick} />;
                            })}
                        </PopperWrapper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
};

export default Menu;
