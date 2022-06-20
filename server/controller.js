require("dotenv").config();

const { CONNECTION_STRING } = process.env;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

/*

date_id: 1,
week_day: 'Sun',
date_of_easter: 17,
easter_month: 'Apr',
this_year: 2022

*/

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

//some random declarations
let today = new Date();
let thisYear = String(new Date()).split(" ")[3];
let smolDayOfTheWeek = String(new Date()).split(" ")[0];
let dayOfTheWeek = fullWeekDays[smolDayOfTheWeek];
let oneDay = 86400000;
let oneWeek = 604800000;
let nextYear = String(new Date()).split(" ")[3];
let nextYearA = nextYear++;

const getMoney = () => {
  sequelize
    .query(`SELECT * FROM easters WHERE this_year = ${thisYear}`)
    .then((dbRes) => {
      const month = dbRes[0][0].easter_month;
      const date = dbRes[0][0].date_of_easter;
      const easterString = `Sun ${month} ${date} ${thisYear}`;
      send(easterString)
    })
    .catch((err) => console.log(err));
};

console.log(getMoney());
/*


   .query(`SELECT * FROM easters WHERE this_year = 2022`)
    .then((dbRes) => {
      console.log(dbRes[0]);
    })

date_id: 1,
week_day: 'Sun',
date_of_easter: 17,
easter_month: 'Apr',
this_year: 2022

*/

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

//functions for getting the dates based on the year
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

// This object is used to pull upcoming dates.
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

// these functions find specific dates in whatever year that date is from
const weekInAdvent = (date) => {
  let year = (" " + String(date)).slice(1).split(" ")[3];
  let weekday = fullWeekDays[(" " + String(date)).slice(1).split(" ")[0]];
  let timeBetween = date - getNewYear(year);
  let thisWeek = 1 + Math.floor(timeBetween / oneWeek);
  return `is ${weekday}, week ${thisWeek} of Advent!`;
};
const weekInChristmastide = (date) => {
  let year = (" " + String(date)).slice(1).split(" ")[3];
  let weekday = fullWeekDays[(" " + String(date)).slice(1).split(" ")[0]];
  let timeBetween = date - getChristmas(year);
  let thisWeek = 1 + Math.floor(timeBetween / oneWeek);
  return `is ${weekday}, week ${thisWeek} of Christmastide!`;
};
const weekInChristmastideNewYear = (date) => {
  let year = (" " + String(date)).slice(1).split(" ")[3];
  let weekday = fullWeekDays[(" " + String(date)).slice(1).split(" ")[0]];
  let timeBetween = date - getChristmas(year - 1);
  let thisWeek = 1 + Math.floor(timeBetween / oneWeek);
  return `is ${weekday}, week ${thisWeek} of Christmastide!`;
};
const weekInEpiphany = (date) => {
  let year = (" " + String(date)).slice(1).split(" ")[3];
  let weekday = fullWeekDays[(" " + String(date)).slice(1).split(" ")[0]];
  let timeBetween = date - getEpiphany(year);
  let thisWeek = 1 + Math.floor(timeBetween / oneWeek);
  return `is ${weekday}, week ${thisWeek} of Epiphany!`;
};
const weekInLent = (date) => {
  let year = (" " + String(date)).slice(1).split(" ")[3];
  let weekday = fullWeekDays[(" " + String(date)).slice(1).split(" ")[0]];
  let timeBetween = date - getAshWed(year);
  let thisWeek = 1 + Math.floor(timeBetween / oneWeek);
  return `is ${weekday}, week ${thisWeek} of Lent!`;
};
const weekInEastertide = (date) => {
  let year = (" " + String(date)).slice(1).split(" ")[3];
  let weekday = fullWeekDays[(" " + String(date)).slice(1).split(" ")[0]];
  let timeBetween = date - getEaster(year);
  let thisWeek = 1 + Math.floor(timeBetween / oneWeek);
  return `is ${weekday}, week ${thisWeek} of Eastertide!`;
};
const weekInOrdinaryTime = (date) => {
  let year = (" " + String(date)).slice(1).split(" ")[3];
  let weekday = fullWeekDays[(" " + String(date)).slice(1).split(" ")[0]];
  let timeBetween = date - getPentecost(year);
  let thisWeek = 1 + Math.floor(timeBetween / oneWeek);
  return `is ${weekday}, week ${thisWeek} of Ordinary Time!`;
};

let daysAskedFor = [];

/* 

To do:
Seed Database
Deploy to Heroku
Pie Chart w/ Explanation and Number of Weeks

*/

module.exports = {
  lastDate: (req, res) => {
    let answer;
    if (today > getChristmas(thisYear)) {
      answer = "Today " + weekInChristmastide(today);
    } else if (today > getNewYear(thisYear)) {
      answer = "Today " + weekInOrdinaryTime(today);
    } else if (today > getPentecost(thisYear)) {
      answer = "Today " + weekInOrdinaryTime(today);
    } else if (today > getEaster(thisYear)) {
      answer = "Today " + weekInEastertide(today);
    } else if (today > getAshWed(thisYear)) {
      answer = "Today " + weekInLent(today);
    } else if (today > getEpiphany(thisYear)) {
      answer = "Today " + weekInEpiphany(today);
    } else {
      answer = "Today " + weekInChristmastide(today);
    }
    res.status(200).send(answer);
  },

  upcomingDates: (req, res) => {
    let list = [];
    let next;
    if (today > getChristmas(thisYear)) {
      next = 1;
    } else if (today > getNewYear(thisYear)) {
      next = 6;
    } else if (today > getPentecost(thisYear)) {
      next = 5;
    } else if (today > getEaster(thisYear)) {
      next = 4;
    } else if (today > getAshWed(thisYear)) {
      next = 3;
    } else if (today > getEpiphany(thisYear)) {
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
    let date = new Date(req.body.value).addDays(1);
    let thatDate = new Date(req.body.value).addDays(1);
    let thatYear = String(thatDate).split(" ")[3];
    let answer;
    if (date > getChristmas(thatYear)) {
      answer = weekInChristmastide(date);
    } else if (date > getNewYear(thatYear)) {
      answer = weekInAdvent(date);
    } else if (date > getPentecost(thatYear)) {
      answer = weekInOrdinaryTime(date);
    } else if (date > getEaster(thatYear)) {
      answer = weekInEastertide(date);
    } else if (date > getAshWed(thatYear)) {
      answer = weekInLent(date);
    } else if (date > getEpiphany(thatYear)) {
      answer = weekInEpiphany(date);
    } else {
      answer = weekInChristmastideNewYear(date);
    }
    let monthName = fullMonthNames[String(thatDate).split(" ")[1]];
    let day = String(thatDate).split(" ")[2];
    let prettyDate = `${monthName} ${day}, ${thatYear}`;
    daysAskedFor.push(`${String(prettyDate)} ${String(answer)}`);
    res.status(200).send(daysAskedFor);
  },
  deleteValue: (req, res) => {
    const { id } = req.params;
    daysAskedFor.splice(id, 1);
    res.status(200).send(daysAskedFor);
  },
  getList: (req, res) => {
    res.status(200).send(daysAskedFor);
  },
};
