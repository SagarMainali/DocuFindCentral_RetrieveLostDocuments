import i18next from "i18next";
import { initReactI18next } from 'react-i18next';

import home_en_ts from './english/home.json';
import sideNavbar_en_ts from './english/sideNavbar.json';
import form_en_ts from './english/form.json';
import home_np_ts from './nepali/home.json';
import sideNavbar_np_ts from './nepali/sideNavbar.json';
import form_np_ts from './nepali/form.json';

i18next
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                home_ns: home_en_ts,
                sideNavbar_ns: sideNavbar_en_ts,
                form_ns: form_en_ts
            },
            np: {
                home_ns: home_np_ts,
                sideNavbar_ns: sideNavbar_np_ts,
                form_ns: form_np_ts
            }
        },
        lng: 'np',
        fallbackLng: 'en'
    })

export default i18next;