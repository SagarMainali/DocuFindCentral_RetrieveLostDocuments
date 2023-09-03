export const getDateOfToday = () => {
    const dateObj = new Date()

    const year = dateObj.getFullYear()
    let month: number | string = dateObj.getMonth() + 1
    let date: number | string = dateObj.getDate()

    month = month < 10 ? `0${month}` : month
    date = date < 10 ? `0${date}` : date

    return `${year}-${month}-${date}`
}

export const formatDate = (unformattedDate: string) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const dateArr = unformattedDate.split('-')
    const [year, month, date] = dateArr

    return `${date} ${months[parseInt(month) - 1]}, ${year}`
}