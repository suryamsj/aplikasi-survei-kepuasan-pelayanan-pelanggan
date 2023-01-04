// Get Total Data
export const getTotal = (data) =>{
    let total = eval(data);
    return total;
}

// Data / 100
export const getPercentage = (data, total) => {
    let percentage = getTotal(data) !== 0 ? (getTotal(data) / total) * 100 : 0;
    return Math.round(percentage);
}