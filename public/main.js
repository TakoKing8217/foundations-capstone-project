const mainURL = "https://localhost:5501";
const seasonBtn = document.getElementById("what-season");
const midSection = document.getElementById("mid");
const today = document.getElementById("mid-top");
const seasonListBtn = document.getElementById("season-button");
const upcomingList = document.getElementById("upcoming");
const date = document.getElementById("input-date");
const inputList = document.getElementById("input-list");
const midCenter = document.getElementById("mid-center");
const midBase = document.getElementById("mid-base");

const addToCenterList = (script) => {
  const dateAdded = document.createElement("li");
  dateAdded.textContent = script;
  today.appendChild(dateAdded);
};

const addToRightList = (script) => {
  const dateAdded = document.createElement("li");
  dateAdded.textContent = script;
  upcomingList.appendChild(dateAdded);
};

const getEaster = () => {
  axios
    .get("/get-easter")
    .then((res) => {
      let obj = res.data[0];
      console.log(obj.week_day);
      const dateAdded = document.createElement("div");
      dateAdded.innerHTML = `Easter in ${obj["this_year"]} is on ${obj["easter_month"]} ${obj["date_of_easter"]}!`;
      today.appendChild(dateAdded);
    })
    .catch((err) => console.log(err));
};

const putTheChart = () => {
  axios
    .get(`/calendar-pieces`)
    .then((res) => {
      let arr = res.data;
      const chart = document.createElement("li");
      chart.innerHTML = `  <li
      id=""
      class="piechart"
      style="
              width: 400px;
              height: 400px;
              border-radius: 50%;
              border: black solid;
              background-image: conic-gradient(
                rgb(66, 66, 196) ${arr[0]}deg,
                rgb(239, 235, 235) 0 ${arr[0] + arr[1]}deg,
                rgb(76, 165, 76) 0 ${arr[0] + arr[1] + arr[2]}deg,
                rgb(147, 67, 147) 0 ${arr[0] + arr[1] + arr[2] + arr[3]}deg,
                rgb(224, 226, 96) 0 ${
                  arr[0] + arr[1] + arr[2] + arr[3] + arr[4]
                }deg,
                rgb(50, 119, 50) 0
              );
            "
    ></li>`;
      midCenter.appendChild(chart);
      midCenter.appendChild(chart);
      currYear();
      for (let i = 0; i < 6; i++) {
        const chart = document.createElement("li");
        chart.innerHTML = `This year, ${arr[i + 6]} is ${Math.round(
          arr[i]
        )} days long.`;
        midSection.appendChild(chart);
      }
    })
    .catch((err) => console.log(err));
};

const currSeason = () => {
  axios
    .get(`/what-season-now`)
    .then((res) => {
      addToCenterList(res.data);
    })
    .catch((err) => console.log(err));
};

const currYear = () => {
  axios
    .get(`/what-church-year`)
    .then((res) => {
      const dateAdded = document.createElement("li");
      dateAdded.textContent = res.data;
      midBase.appendChild(dateAdded);
    })
    .catch((err) => console.log(err));
};

const dateSeason = (date) => {
  axios
    .get(`/add-date`, date)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

const upcomingDates = () => {
  axios
    .get(`/upcoming`)
    .then((res) => {
      let datesArr = res.data;
      for (let i = 0; i < res.data.length; i++) {
        addToRightList(datesArr[i]);
      }
    })
    .catch((err) => console.log(err));
};

const getDateInput = () => {
  if (date.value == "") {
    alert("Invalid Date");
    return;
  }
  axios
    .post(`/get-date`, { value: date.value })
    .then((res) => {
      console.log(res.data);
      if (res.data == "") {
        alert("Invalid date");
      } else {
        date.value = "";
        getList();
      }
    })
    .catch((err) => console.log(err));
};

const getList = () => {
  axios
    .get(`/list`)
    .then((res) => {
      inputList.innerHTML = "";
      for (let i = 0; i < res.data.length; i++) {
        const dateAdded = document.createElement("div");
        dateAdded.innerHTML = `<li>${res.data[i]}</li><button onclick="delDate(${i})">x</button> `;
        inputList.appendChild(dateAdded);
      }
    })
    .catch((err) => console.log(err));
};

const delDate = (num) => {
  axios
    .delete(`/list/${num}`)
    .then(() => {
      getList();
    })
    .catch((err) => console.log(err));
};

seasonListBtn.addEventListener("click", getDateInput);

getEaster();
currSeason();
upcomingDates();
putTheChart();
