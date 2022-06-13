let time = Date();

let easter = {
  2022: ["Sun", "Apr", "17", "2022"],
  2023: ["Sun", "Apr", "17", "2023"],
  2024: ["Sun", "Apr", "17", "2024"],
  2025: ["Sun", "Apr", "17", "2025"],
  2026: ["Sun", "Apr", "17", "2026"],
  2027: ["Sun", "Apr", "17", "2027"],
  2028: ["Sun", "Apr", "17", "2028"],
  2029: ["Sun", "Apr", "17", "2029"],
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
};
