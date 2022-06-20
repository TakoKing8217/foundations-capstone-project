const mainURL = "https://localhost:5501";
const seasonBtn = document.getElementById("what-season");
const midSection = document.getElementById("mid");
const today = document.getElementById("today");
const seasonListBtn = document.getElementById("season-button");
const upcomingList = document.getElementById("upcoming");
const date = document.getElementById("input-date");
const inputList = document.getElementById("input-list");

const addToCenterList = (script) => {
  today.innerHTML = "";
  const dateAdded = document.createElement("div");
  dateAdded.textContent = script;
  today.appendChild(dateAdded);
};

const addToRightList = (script) => {
  const dateAdded = document.createElement("li");
  dateAdded.textContent = script;
  upcomingList.appendChild(dateAdded);
};

const currSeason = () => {
  axios
    .get(`${mainURL}/what-season-now`)
    .then((res) => {
      addToCenterList(res.data);
    })
    .catch((err) => console.log(err));
};

const dateSeason = (date) => {
  axios
    .get(`${mainURL}/add-date`, date)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

const upcomingDates = () => {
  axios
    .get(`${mainURL}/upcoming`)
    .then((res) => {
      let datesArr = res.data;
      // res.body will be an array of information.
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
    .post(`${mainURL}/get-date`, { value: date.value })
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
    .get(`${mainURL}/list`)
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
    .delete(`${mainURL}/list/${num}`)
    .then(() => {
      getList();
    })
    .catch((err) => console.log(err));
};

// seasonBtn.addEventListener("click", currSeason);
seasonListBtn.addEventListener("click", getDateInput);

currSeason();
upcomingDates();
