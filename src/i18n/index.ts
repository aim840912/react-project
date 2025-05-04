import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import zh from './locales/zh.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            zh: { translation: zh },
        },
        lng: 'zh', // 預設語言
        fallbackLng: 'en', // 找不到語言時使用
        interpolation: {
            escapeValue: false, // 避免 React 雙重轉義
        },
    });

export default i18n;
