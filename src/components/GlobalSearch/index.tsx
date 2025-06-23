// src/components/GlobalSearch/index.tsx

import { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGlobalSearchQuery, SearchResult } from '../../features/dashboard/api/dashboardApi';
import useDebounce from '../../hooks/useDebounce';

const GlobalSearch: React.FC = () => {
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce(value, 500);
    const navigate = useNavigate();

    const { data: options = [], isFetching } = useGlobalSearchQuery(debouncedValue, {
        skip: !debouncedValue,
    });

    const handleSelect = (value: string, option: SearchResult) => {
        navigate(option.url);
        setValue('');
    };

    const renderOption = (item: SearchResult) => ({
        // --- 主要修改處：在這裡為每個選項加上唯一的 key ---
        key: item.id,
        value: item.name,
        label: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {item.name}
                <span style={{ color: '#999' }}>{item.type}</span>
            </div>
        ),
        // 將原始資料附加到 option 上
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
            <Input.Search placeholder="搜尋租戶、合約、設備..." loading={isFetching} />
        </AutoComplete>
    );
};

export default GlobalSearch;