import { useState } from 'react';
import { AutoComplete, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGlobalSearchQuery, SearchResult } from '../../features/dashboard/api/dashboardApi';
import useDebounce from '../../hooks/useDebounce';
import { useAppDispatch } from '../../app/hooks';
import { toggleTheme } from '../../features/theme/themeSlice';
import { logout, setMenu } from '../../features/user/authSlice';


const GlobalSearch: React.FC = () => {
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce(value, 500);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { data: options = [], isFetching } = useGlobalSearchQuery(debouncedValue, {
        skip: !debouncedValue,
    });

    const handleSelect = (value: string, option: SearchResult) => {
        if (option.type === 'action') {
            switch (option.actionType) {
                case 'TOGGLE_THEME':
                    dispatch(toggleTheme());
                    break;
                case 'LOGOUT':
                    dispatch(logout());
                    dispatch(setMenu([]));
                    message.success('成功退出登錄');
                    navigate("/login", { replace: true });
                    break;
                default:
                    break;
            }
        }

        else if (option.url) {
            navigate(option.url);
        }

        setValue('');
    };

    const renderOption = (item: SearchResult) => ({
        key: item.id,
        value: item.name,
        label: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {item.name}
                <span style={{ color: '#999' }}>{item.type}</span>
            </div>
        ),
        ...item,
    });

    return (
        <AutoComplete
            style={{ width: 250 }}
            options={options.map(renderOption)}
            onSelect={handleSelect}
            onSearch={(text) => setValue(text)}
            value={value}
            getPopupContainer={triggerNode => triggerNode.parentNode}
        >
            <Input.Search placeholder="搜尋或執行指令..." loading={isFetching} />
        </AutoComplete>
    );
};

export default GlobalSearch;