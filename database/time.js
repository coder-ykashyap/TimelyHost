var currentTime = new Date();

var currentOffset = currentTime.getTimezoneOffset();

var ISTOffset = 330;   // IST offset UTC +5:30 

var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

module.exports = ISTTime;


// // ISTTime now represents the time in IST coordinates

// var hoursIST = ISTTime.getHours()
// var minutesIST = ISTTime.getMinutes()
// var dayIST = ISTTime.getDay()

// time = hoursIST*100+minutesIST
// console.log(time)

// module.exports = time,dayIST
// // module.exports = [time,dayIST]