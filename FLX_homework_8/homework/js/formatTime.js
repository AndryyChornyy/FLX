const formatTime = function (minAmount) {
    const day = Math.floor(minAmount / 1440);
    const hour = Math.floor((minAmount - (day * 1440)) / 60);
    const min = minAmount - (day * 1440) - (hour * 60);
    return day + ' day(s) ' + hour + ' hour(s) ' + min + ' minute(s).';
};

formatTime(120);