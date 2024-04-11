import i18next from "i18next";
import { initReactI18next } from 'react-i18next';

// english translations files
import home_en_ts from './english/home.json';
import sideNavbar_en_ts from './english/sideNavbar.json';
import user_form_en_ts from './english/userForm.json';
import feedback_form_en_ts from './english/feedbackForm.json';
import howItWorks_en_ts from './english/howItWorks.json'
import button_en_ts from './english/button.json'
import unsolved_tickets_en_ts from './english/unsolvedTickets.json'
import solved_tickets_en_ts from './english/solvedTickets.json'
import great_beings_en_ts from './english/greatBeings.json'

// nepali translations files
import home_np_ts from './nepali/home.json';
import sideNavbar_np_ts from './nepali/sideNavbar.json';
import user_form_np_ts from './nepali/userForm.json';
import feedback_form_np_ts from './nepali/feedbackForm.json';
import howItWorks_np_ts from './nepali/howItWorks.json'
import button_np_ts from './nepali/button.json'
import unsolved_tickets_np_ts from './nepali/unsolvedTickets.json'
import solved_tickets_np_ts from './nepali/solvedTickets.json'
import great_beings_np_ts from './nepali/greatBeings.json'

const savedLng = localStorage.getItem('language');

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
                button_ns: button_en_ts,
                unsolved_tickets_ns: unsolved_tickets_en_ts,
                solved_tickets_ns: solved_tickets_en_ts,
                great_beings_ns: great_beings_en_ts
            },
            np: {
                home_ns: home_np_ts,
                sideNavbar_ns: sideNavbar_np_ts,
                user_form_ns: user_form_np_ts,
                feedback_form_ns: feedback_form_np_ts,
                howItWorks_ns: howItWorks_np_ts,
                button_ns: button_np_ts,
                unsolved_tickets_ns: unsolved_tickets_np_ts,
                solved_tickets_ns: solved_tickets_np_ts,
                great_beings_ns: great_beings_np_ts
            }
        },
        lng: savedLng ?? 'en',
        fallbackLng: 'en'
    })

export default i18next;