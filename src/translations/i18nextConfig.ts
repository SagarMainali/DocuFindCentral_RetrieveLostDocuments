import i18next from "i18next";
import { initReactI18next } from 'react-i18next';

import enTranslations from './english.json';
import npTranslations from './nepali.json';

i18next
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translations: enTranslations
            },
            np: {
                translations: npTranslations
            }
        },
        lng: 'en',
        fallbackLng: 'en'
    })

export default i18next;