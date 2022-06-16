const mainURL = "http://localhost:5501";
const seasonBtn = document.getElementById("what-season");
const midSection = document.getElementById("mid");
const today = document.getElementById("today");
const seasonListBtn = document.getElementById("season-button");
const upcomingList = document.getElementById("upcoming");
const date = document.getElementById("input-date");

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

const currSeason = (event) => {
  event.preventDefault();
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
  console.log(date.value);
  axios
    .post(`${mainURL}/get-date`, { value: date.value })
    .then((res) => {})
    .catch((err) => console.log(err));
};

seasonBtn.addEventListener("click", currSeason);
seasonListBtn.addEventListener("click", getDateInput);

upcomingDates();
