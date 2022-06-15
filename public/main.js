const mainURL = "http://localhost:5500";
const seasonBtn = document.getElementById("what-season");
const midSection = document.getElementById("mid");
const today = document.getElementById("today");
const seasonListBtn = document.getElementById("season-button");

const isItEaster = (event) => {
  event.preventDefault();
  console.log("hit");
  addToList(" It's Easter ");
};

const addToList = (script) => {
  today.innerHTML = "";
  const dateAdded = document.createElement("div");
  dateAdded.textContent = script;
  today.appendChild(dateAdded);
};

const whatSeasonIsIt = (event) => {
  event.preventDefault();
  axios
    .get(`${mainURL}/what-season-now`)
    .then((res) => {
      addToList(res.data);
    })
    .catch((err) => console.log(err));
};

seasonBtn.addEventListener("click", whatSeasonIsIt);
seasonListBtn.addEventListener("click");
