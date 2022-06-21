require("dotenv").config();

const { DATABASE_URL } = process.env;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

let easter = {
  2000: ["Sun", 23, "Apr", 2000],
  2001: ["Sun", 15, "Apr", 2001],
  2002: ["Sun", 31, "Mar", 2002],
  2003: ["Sun", 20, "Apr", 2003],
  2004: ["Sun", 11, "Apr", 2004],
  2005: ["Sun", 27, "Mar", 2005],
  2006: ["Sun", 16, "Apr", 2006],
  2007: ["Sun", 08, "Apr", 2007],
  2008: ["Sun", 23, "Mar", 2008],
  2009: ["Sun", 12, "Apr", 2009],
  2010: ["Sun", 04, "Apr", 2010],
  2011: ["Sun", 24, "Apr", 2011],
  2012: ["Sun", 08, "Apr", 2012],
  2013: ["Sun", 31, "Mar", 2013],
  2013: ["Sun", 20, "Apr", 2013],
  2015: ["Sun", 05, "Apr", 2015],
  2016: ["Sun", 27, "Mar", 2016],
  2017: ["Sun", 16, "Apr", 2017],
  2018: ["Sun", 01, "Apr", 2018],
  2019: ["Sun", 21, "Apr", 2019],
  2020: ["Sun", 12, "Apr", 2020],
  2021: ["Sun", 04, "Apr", 2021],
  2022: ["Sun", 17, "Apr", 2022],
  2023: ["Sun", 09, "Apr", 2023],
  2024: ["Sun", 31, "Mar", 2024],
  2025: ["Sun", 20, "Apr", 2025],
  2026: ["Sun", 05, "Apr", 2026],
  2027: ["Sun", 28, "Mar", 2027],
  2028: ["Sun", 16, "Apr", 2028],
  2029: ["Sun", 01, "Apr", 2029],
  2030: ["Sun", 21, "Apr", 2030],
  2031: ["Sun", 13, "Apr", 2031],
  2032: ["Sun", 28, "Mar", 2032],
  2033: ["Sun", 17, "Apr", 2033],
  2034: ["Sun", 09, "Apr", 2034],
  2035: ["Sun", 25, "Mar", 2035],
  2036: ["Sun", 13, "Apr", 2036],
  2037: ["Sun", 05, "Apr", 2037],
  2038: ["Sun", 25, "Apr", 2038],
  2039: ["Sun", 10, "Apr", 2039],
  2040: ["Sun", 01, "Apr", 2040],
  2041: ["Sun", 21, "Apr", 2041],
  2042: ["Sun", 06, "Apr", 2042],
  2043: ["Sun", 29, "Mar", 2043],
  2044: ["Sun", 17, "Apr", 2044],
  2045: ["Sun", 09, "Apr", 2045],
  2046: ["Sun", 25, "Mar", 2046],
  2047: ["Sun", 14, "Apr", 2047],
  2048: ["Sun", 05, "Apr", 2048],
  2049: ["Sun", 18, "Apr", 2049],
  2050: ["Sun", 10, "Apr", 2050],
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
const getLastDayOfTheYear = (year) => {
  const christmasDate = String(new Date(`December 25 ${year}`));
  const christmasArr = christmasDate.split(" ");
  let newYearDate = getChristmas(year).addDays(
    -(22 + weekDays[christmasArr[0]])
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
  /*

GMT is 5 hours ahead of us. 
Then why would it be giving trouble at 10 am?!




*/
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

    console.log({ answer }, { date }, { thatDate }, { thatYear }, { today });
    console.log(
      String(answer),
      String(date),
      String(thatDate),
      String(thatYear)
    );

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

  getDegrees: (req, res) => {
    let adventLength = +(
      Math.floor(getChristmas(thisYear - 1) - getNewYear(thisYear - 1)) / oneDay
    );
    let christmasTideLength = +(
      Math.floor(getEpiphany(thisYear) - getChristmas(thisYear - 1)) / oneDay
    );
    let epiphanyLength = +(
      Math.floor(getAshWed(thisYear) - getEpiphany(thisYear)) / oneDay
    );
    let lentLength = +(
      Math.floor(getEaster(thisYear) - getAshWed(thisYear)) / oneDay
    );
    let eastertideLength = +(
      Math.floor(getPentecost(thisYear) - getEaster(thisYear)) / oneDay
    );
    let pentecostLength = +(
      Math.floor(getNewYear(thisYear) - getPentecost(thisYear)) / oneDay
    );
    res
      .status(200)
      .send([
        adventLength,
        christmasTideLength,
        epiphanyLength,
        lentLength,
        eastertideLength,
        pentecostLength,
        `<span style="color: rgb(66, 66, 196) ;"> Advent</span>`,
        `<span style="color: rgb(239, 235, 235) ;"> Christmastide</span>`,
        `<span style="color: rgb(76, 165, 76) ;">Epiphany</span>`,
        `<span style="color: rgb(147, 67, 147) ;">Lent</span>`,
        `<span style="color: rgb(224, 226, 96) ;">Eastertide</span>`,
        `<span style="color: rgb(50, 119, 50) ;">Pentecost</span>`,
      ]);
  },

  getThisYear: (req, res) => {
    let lastNYArr = String(getNewYear(thisYear - 1)).split(" ");
    let comingNYArr = String(getLastDayOfTheYear(thisYear)).split(" ");
    let answer = `This church calendar year is from ${
      fullMonthNames[lastNYArr[1]]
    }  ${lastNYArr[2]},  ${lastNYArr[3]} to ${
      fullMonthNames[comingNYArr[1]]
    }  ${comingNYArr[2]},  ${comingNYArr[3]}.`;
    res.status(200).send(answer);
  },

  whatIsEaster: (req, res) => {
    sequelize
      .query(`SELECT * FROM easters WHERE this_year = ${thisYear}`)
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      });
  },
  seed: (req, res) => {
    sequelize
      .query(
        `
    drop table if exists easters;

    CREATE TABLE easters (
        date_id SERIAL PRIMARY KEY,
        week_day VARCHAR(15) NOT NULL,
        date_of_easter INTEGER NOT NULL,
        easter_month VARCHAR(15) NOT NULL,
        this_year INTEGER NOT NULL);

      INSERT INTO easters (week_day, date_of_easter, easter_month, this_year)
      VALUES 
      ('Sun', 23, 'Apr', 2000),
      ('Sun', 15, 'Apr', 2001), 
      ('Sun', 31, 'Mar', 2002), 
      ('Sun', 20, 'Apr', 2003), 
      ('Sun', 11, 'Apr', 2004), 
      ('Sun', 27, 'Mar', 2005), 
      ('Sun', 16, 'Apr', 2006), 
      ('Sun', 08, 'Apr', 2007), 
      ('Sun', 23, 'Mar', 2008), 
      ('Sun', 12, 'Apr', 2009), 
      ('Sun', 04, 'Apr', 2010), 
      ('Sun', 24, 'Apr', 2011), 
      ('Sun', 08, 'Apr', 2012), 
      ('Sun', 31, 'Mar', 2013), 
      ('Sun', 20, 'Apr', 2014), 
      ('Sun', 05, 'Apr', 2015), 
      ('Sun', 27, 'Mar', 2016), 
      ('Sun', 16, 'Apr', 2017), 
      ('Sun', 01, 'Apr', 2018), 
      ('Sun', 21, 'Apr', 2019),
      ('Sun', 12, 'Apr', 2020), 
      ('Sun', 04, 'Apr', 2021), 
      ('Sun', 17, 'Apr', 2022), 
      ('Sun', 09, 'Apr', 2023),
      ('Sun', 31, 'Mar', 2024),
      ('Sun', 20, 'Apr', 2025),
      ('Sun', 05, 'Apr', 2026),
      ('Sun', 28, 'Mar', 2027),
      ('Sun', 16, 'Apr', 2028),
      ('Sun', 01, 'Apr', 2029),
      ('Sun', 21, 'Apr', 2030),
      ('Sun', 13, 'Apr', 2031),
      ('Sun', 28, 'Mar', 2032),
      ('Sun', 17, 'Apr', 2033),
      ('Sun', 09, 'Apr', 2034),
      ('Sun', 25, 'Mar', 2035),
      ('Sun', 13, 'Apr', 2036),
      ('Sun', 05, 'Apr', 2037),
      ('Sun', 25, 'Apr', 2038),
      ('Sun', 10, 'Apr', 2039),
      ('Sun', 01, 'Apr', 2040),
      ('Sun', 21, 'Apr', 2041),
      ('Sun', 06, 'Apr', 2042),
      ('Sun', 29, 'Mar', 2043),
      ('Sun', 17, 'Apr', 2044),
      ('Sun', 09, 'Apr', 2045),
      ('Sun', 25, 'Mar', 2046),
      ('Sun', 14, 'Apr', 2047),
      ('Sun', 05, 'Apr', 2048),
      ('Sun', 18, 'Apr', 2049),
      ('Sun', 10, 'Apr', 2050);

    `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendstatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },
};
