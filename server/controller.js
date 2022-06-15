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

let possibleFuture = [
  "new year",
  "christmas",
  "epiphany",
  "ash wednesday",
  "easter",
  "pentacost",
  "new year",
  "christmas",
  "epiphany",
  "ash wednesday",
  "easter",
  "pentacost",
];

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
// Pentacose was June 5, 2022
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

console.log(getNewYear(2021));
console.log(getChristmas(2021));
console.log(getEpiphany(2022));
console.log(getAshWed(2022));
console.log(getEaster(2022));
console.log(getPentacost(2022));

let today = new Date();
let firstDay = new Date(0);
let thisYear = String(new Date()).split(" ")[3];
let smolDayOfTheWeek = String(new Date()).split(" ")[0];
let dayOfTheWeek = fullWeekDays[smolDayOfTheWeek];
let oneDay = 86400000;
let oneWeek = 604800000;
let summary = "It is ${dayOfTheWeek}, week ${thisWeek} of";

console.log({ thisYear });

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
  let timeBetween = today - getPentacost(thisYear);
  let thisWeek = 1 + Math.floor(timeBetween / oneWeek);
  return `It is ${dayOfTheWeek}, week ${thisWeek} of Ordinary Time!`;
};

console.log(weekInOrdinaryTime());

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
      return weekInLent();
    } else if (today < getEaster(thisYear)) {
      return weekInEastertide();
    } else if (today < getPentacost(thisYear)) {
      return weekInOrdinaryTime();
    } else {
      return weekInAdvent();
    }
  },
  // lastDate: (req, res) => {
  //   let answer;
  //   if (today > getPentacost(thisYear)) {
  //     answer = "It's ordinary time!";
  //   } else if (today < getEaster(thisYear)) {
  //     answer = "It's eastertide!";
  //   } else if (today < getAshWed(thisYear)) {
  //     answer = "It's Lent!";
  //   } else {
  //     answer = "It's sometime at the beginning of the year!";
  //   }
  //   res.status(200).send(answer);
  // },
  lastDate: (req, res) => {
    let answer;
    if (today > getPentacost(thisYear)) {
      answer = weekInOrdinaryTime();
    } else if (today < getEaster(thisYear)) {
      answer = weekInEastertide();
    } else if (today < getAshWed(thisYear)) {
      answer = weekInLent();
    } else {
      answer = weekInAdvent();
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
