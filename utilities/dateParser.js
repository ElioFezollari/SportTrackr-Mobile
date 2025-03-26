const monthMap = {
    "January": 0,
    "February": 1,
    "March": 2,
    "April": 3,
    "May": 4,
    "June": 5,
    "July": 6,
    "August": 7,
    "September": 8,
    "October": 9,
    "November": 10,
    "December": 11
};


const dateParser = (startTime, currYear, currMon, currDate) => {
    const dateDes = startTime.split(" ");
    const date = parseInt(dateDes[0], 10);
    const month = monthMap[dateDes[1]];
    const year = parseInt(dateDes[2], 10);

    if (year > currYear) return false;

    if (year === currYear && month > currMon) return false;

    if (year === currYear && month === currMon && date > currDate) return false;

    return true;
};


export default dateParser