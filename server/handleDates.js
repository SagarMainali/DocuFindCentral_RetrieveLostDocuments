const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

function getCurrentUTC() {
    return dayjs().utc().format();
}

// convert the given utc to format or return current local time if on argument provided
function convertUTCtoLocal(utc = undefined) {
    return dayjs(utc).local().format('MMM DD, YYYY - hh:mm A');
}

module.exports = {
    getCurrentUTC,
    convertUTCtoLocal
}