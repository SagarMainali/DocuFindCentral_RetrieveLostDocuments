import i18next from "i18next";
import { initReactI18next } from 'react-i18next';

// english translations files
import home_en_ts from './english/home.json';
import sideNavbar_en_ts from './english/sideNavbar.json';
import user_form_en_ts from './english/userForm.json';
import feedback_form_en_ts from './english/feedbackForm.json';
import howItWorks_en_ts from './english/howItWorks.json'
import button_en_ts from './english/button.json'

// nepali translations files
import home_np_ts from './nepali/home.json';
import sideNavbar_np_ts from './nepali/sideNavbar.json';
import user_form_np_ts from './nepali/userForm.json';
import feedback_form_np_ts from './nepali/feedbackForm.json';
import howItWorks_np_ts from './nepali/howItWorks.json'
import button_np_ts from './nepali/button.json'

i18next
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                home_ns: home_en_ts,
                sideNavbar_ns: sideNavbar_en_ts,
                user_form_ns: user_form_en_ts,
                feedback_form_ns: feedback_form_en_ts,
                howItWorks_ns: howItWorks_en_ts,
                button: button_en_ts
            },
            np: {
                home_ns: home_np_ts,
                sideNavbar_ns: sideNavbar_np_ts,
                user_form_ns: user_form_np_ts,
                feedback_form_ns: feedback_form_np_ts,
                howItWorks_ns: howItWorks_np_ts,
                button: button_np_ts
            }
        },
        lng: 'en',
        fallbackLng: 'en'
    })

export default i18next;