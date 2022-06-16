// let time = Date();

let easter = {
  2021: ["Sun", "Apr", "04", "2021"],
  2022: ["Sun", "Apr", "17", "2022"],
  2023: ["Sun", "Apr", "09", "2023"],
  2024: ["Sun", "Mar", "31", "2024"],
  2025: ["Sun", "Apr", "20", "2025"],
  2026: ["Sun", "Apr", "05", "2026"],
  2027: ["Sun", "Mar", "28", "2027"],
  2028: ["Sun", "Apr", "16", "2028"],
  2029: ["Sun", "Apr", "01", "2029"],
  2030: ["Sun", "Apr", "21", "2030"],
};

let weekDays = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

let fullWeekDays = {
  Mon: `Monday`,
  Tue: `Tuesday`,
  Wed: `Wednesday`,
  Thu: `Thursday`,
  Fri: `Friday`,
  Sat: `Saturday`,
  Sun: `Sunday`,
};

let fullMonthNames = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

const upcomingHolidays = (lastHoliday) => {
  let j = 0;
  for (let i = 0; i < possibleFuture; i++) {
    if (lastHoliday === possibleFuture[i]) {
    }
  }
};

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

//basic stuff: get the easter date
// Ash Wed was March 2, 2022
// Easter was April 17, 2022
// Pentecost was June 5, 2022
// we need functions to get: Christian New Year, Christmas, Epiphany, Ash Wednesday, Easter, Pentecost

const getChristmas = (year) => {
  const christmasDate = new Date(`December 25 ${year}`);
  return christmasDate;
};

const getNewYear = (year) => {
  const christmasDate = String(new Date(`December 25 ${year}`));
  const christmasArr = christmasDate.split(" ");
  let newYearDate = getChristmas(year).addDays(
    -(21 + weekDays[christmasArr[0]])
  );
  return newYearDate;
};

const getEpiphany = (year) => {
  let epiphanyDate = getChristmas(year - 1).addDays(12);
  return epiphanyDate;
};

const getEaster = (year) => {
  const easterDate = new Date(easter[year].join(" "));
  return easterDate;
};
const getAshWed = (year) => {
  let ashDate = getEaster(year).addDays(-46);
  return ashDate;
};
const getPentecost = (year) => {
  let penteDate = getEaster(year).addDays(49);
  return penteDate;
};

let today = new Date();
let thisYear = String(new Date()).split(" ")[3];
let smolDayOfTheWeek = String(new Date()).split(" ")[0];
let dayOfTheWeek = fullWeekDays[smolDayOfTheWeek];
let oneDay = 86400000;
let oneWeek = 604800000;
let nextYear = String(new Date()).split(" ")[3];
let nextYearA = nextYear++;

let possibleFuture = {
  1: [getEpiphany(thisYear), "Epiphany"],
  2: [getAshWed(thisYear), "Ash Wednesday"],
  3: [getEaster(thisYear), "Easter"],
  4: [getPentecost(thisYear), "Pentecost"],
  5: [getNewYear(thisYear), "first day of Advent"],
  6: [getChristmas(thisYear), "Christmas"],
  7: [getEpiphany(nextYear), "Epiphany"],
  8: [getAshWed(nextYear), "Ash Wednesday"],
  9: [getEaster(nextYear), "Easter"],
  10: [getPentecost(nextYear), "Pentecost"],
  11: [getNewYear(nextYear), "first day of Advent"],
  12: [getChristmas(nextYear), "Christmas"],
};

const weekInAdvent = () => {
  let timeBetween = today - getNewYear(thisYear);
  let thisWeek = 1 + Math.floor(timeBetween / oneWeek);
  return `It is ${dayOfTheWeek}, week ${thisWeek} of Ordinary Time!`;
};
const weekInChristmastide = () => {
  let timeBetween = today - getEaster(thisYear);
  let thisWeek = 1 + Math.floor(timeBetween / oneWeek);
  return `It is ${dayOfTheWeek}, week ${thisWeek} of Ordinary Time!`;
};
const weekInEpiphany = () => {
  let timeBetween = today - getEaster(thisYear);
  let thisWeek = 1 + Math.floor(timeBetween / oneWeek);
  return `It is ${dayOfTheWeek}, week ${thisWeek} of Ordinary Time!`;
};
const weekInLent = () => {
  let timeBetween = today - getEaster(thisYear);
  let thisWeek = 1 + Math.floor(timeBetween / oneWeek);
  return `It is ${dayOfTheWeek}, week ${thisWeek} of Ordinary Time!`;
};
const weekInEastertide = () => {
  let timeBetween = today - getEaster(thisYear);
  let thisWeek = 1 + Math.floor(timeBetween / oneWeek);
  return `It is ${dayOfTheWeek}, week ${thisWeek} of Ordinary Time!`;
};
const weekInOrdinaryTime = () => {
  let timeBetween = today - getPentecost(thisYear);
  let thisWeek = 1 + Math.floor(timeBetween / oneWeek);
  return `It is ${dayOfTheWeek}, week ${thisWeek} of Ordinary Time!`;
};

nextDate = () => {
  if (today < getAshWed(thisYear)) {
    return weekInLent();
  } else if (today < getEaster(thisYear)) {
    return weekInEastertide();
  } else if (today < getPentecost(thisYear)) {
    return weekInOrdinaryTime();
  } else {
    return weekInAdvent();
  }
};

module.exports = {
  lastDate: (req, res) => {
    let answer;
    if (today > getChristmas(thisYear)) {
      answer = weekInChristmastide();
    } else if (today > getNewYear(thisYear)) {
      answer = weekInOrdinaryTime();
    } else if (today > getPentecost(thisYear)) {
      answer = weekInOrdinaryTime();
    } else if (today > getEaster(thisYear)) {
      answer = weekInEastertide();
    } else if (today > getAshWed(thisYear)) {
      answer = weekInLent();
    } else if (today > getEpiphany(thisYear)) {
      answer = weekInEpiphany();
    } else {
      answer = weekInChristmastide();
    }
    res.status(200).send(answer);
  },
  upcomingDates: (req, res) => {
    let list = [];
    let next;
    if (today > getChristmas(thisYear)) {
      console.log("xmas");
      next = 1;
    } else if (today > getNewYear(thisYear)) {
      console.log("advent");
      next = 6;
    } else if (today > getPentecost(thisYear)) {
      console.log("ordinary");
      next = 5;
    } else if (today > getEaster(thisYear)) {
      console.log("easter");
      next = 4;
    } else if (today > getAshWed(thisYear)) {
      console.log("lent");
      next = 3;
    } else if (today > getEpiphany(thisYear)) {
      console.log("epiphany");
      next = 2;
    } else {
      next = 1;
    }
    for (let i = next; i < next + 6; i++) {
      let arr = String(possibleFuture[i][0]).split(" ");
      let theDate = `${fullWeekDays[arr[0]]}, ${
        fullMonthNames[arr[1]]
      } ${+arr[2]} ${arr[3]}`;
      let date = `The coming ${possibleFuture[i][1]} is on ${theDate}`;
      list.push(date);
    }
    res.status(200).send(list);
  },
  dateList: (req, res) => {
    console.log(req.body.value);
    let date = new Date(req.body.value);
    console.log(date);
    let answer;
    if (date > getChristmas(thisYear)) {
      answer = weekInChristmastide();
    } else if (date > getNewYear(thisYear)) {
      answer = weekInOrdinaryTime();
    } else if (date > getPentecost(thisYear)) {
      answer = weekInOrdinaryTime();
    } else if (date > getEaster(thisYear)) {
      answer = weekInEastertide();
    } else if (date > getAshWed(thisYear)) {
      answer = weekInLent();
    } else if (date > getEpiphany(thisYear)) {
      answer = weekInEpiphany();
    } else {
      answer = weekInChristmastide();
    }
    res.status(200).send("money");
  },
};
