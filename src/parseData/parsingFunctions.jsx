export const getDateDifference = (date) => {
    // Check if the date is an instance of Date
    if (!(date instanceof Date)) throw new Error("You passed a non-Date object");

    let differenceInTime = new Date().getTime() - date.getTime();
    const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays < 1) {
        return "a few hours ago";
    } else if (differenceInDays === 1) {
        return `${differenceInDays} day ago`;
    } else if (differenceInDays <= 30) {
        return `${differenceInDays} days ago`;
    } else if (differenceInDays > 30 && differenceInDays <= 365) {
        const differenceInMonths = Math.floor(differenceInDays / 30);
        return differenceInMonths === 1 ? `${differenceInMonths} month ago` : `${differenceInMonths} months ago`;
    } else {
        const differenceInYears = Math.floor(differenceInDays / 365);
        return differenceInYears === 1 ? `${differenceInYears} year ago` : `${differenceInYears} years ago`;
    }
}
