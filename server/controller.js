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

let monthsAndDays = {
  Jan: [1, 31],
  Feb: [2, 28, 29],
  Mar: [3, 31],
  Apr: [4, 30],
  May: [5, 31],
  Jun: [6, 30],
  Jul: [7, 31],
  Aug: [8, 31],
  Sep: [9, 30],
  Oct: [10, 31],
  Nov: [11, 30],
  Dec: [12, 31],
};

let months = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
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

let possibleFuture = ['new year','christmas','epiphany','ash wednesday','easter','pentacost']

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

//basic stuff: get the easter date
// we need functions to get: Christian New Year, Christmas, Epiphany, Ash Wednesday, Easter, Pentacost

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
const getPentacost = (year) => {
  let pentaDate = getEaster(year).addDays(49);
  return pentaDate;
};

let dates = [];

let today = new Date();
let now = String(new Date());
let thisYear = now.split(" ")[3];

module.exports = {
  isItEaster: (req, res) => {
    let time = Date().split(" ");
    for (let i = 2022; i < 2029; i++) {
      if (easter[i][3] === time[3]) {
        if (months[easter[i][1]] < months[time[1]]) {
          var answer = "Easter has passed for this year.";
        } else if (months[easter[i][1]] > months[time[1]]) {
          var answer = "Easter is on it's way!";
        } else if (months[easter[i][1]] === months[time[1]]) {
          if (easter[i][2] < time[2]) {
            var answer = "Easter has passed.";
          }
        }
      }
    }
    res.status(200).send(answer);
  },
  nextDate: () => {
    if (today < getAshWed(thisYear)) {
      return "Ash Wednesday is coming.";
    } else if (today < getEaster(thisYear)) {
      return "Easter is coming!";
    } else if (today < getPentacost(thisYear)) {
      return "Pentacost is coming!";
    } else {
      return "Christmas is coming!";
    }
  },
  lastDate: (req, res) => {
    let answer;
    if (today > getPentacost(thisYear)) {
      answer = "It's ordinary time!";
    } else if (today < getEaster(thisYear)) {
      answer = "It's eastertide!";
    } else if (today < getAshWed(thisYear)) {
      answer = "It's Lent!";
    } else {
      answer = "It's sometime at the beginning of the year!";
    }
    res.status(200).send(answer);
  },
  lastDateReq: (req, res) => {
    let answer;
    if (req.body > getPentacost(thisYear)) {
      answer = "It's ordinary time!";
    } else if (req.body < getEaster(thisYear)) {
      answer = "It's eastertide!";
    } else if (req.body < getAshWed(thisYear)) {
      answer = "It's Lent!";
    } else {
      answer = "It's sometime at the beginning of the year!";
    }
    res.status(200).send(answer);
  },

  upcomingDates: (req, res) => {
    for (let i = req.body; i < 5; i++) {}
  },
};

console.log(getNewYear(2021));
console.log(getChristmas(2021));
console.log(getEpiphany(2022));
console.log(getAshWed(2022));
console.log(getEaster(2022));
console.log(getPentacost(2022));
console.log(getNewYear(2022));
console.log(getChristmas(2022));
console.log(getEpiphany(2023));

// Ash Wed was March 2, 2022
// Easter was April 17, 2022
// Pentacose was June 5, 2022

