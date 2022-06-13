const mainURL = "http://localhost:5500/";
const easterBtn = document.getElementById("is-it-easter");
const midSection = document.getElementById("mid");

const isItEaster = (event) => {
  event.preventDefault();
  console.log("hit");
  addToList(" It's Easter ");
};

const addToList = (script) => {
  const dateAdded = document.createElement("li");
  dateAdded.textContent = script;
  midSection.appendChild(dateAdded);
};

const isItReallyEaster = (event) => {
  event.preventDefault();
  console.log("hit");
  axios
    .get(`${mainURL}easter`)
    .then((res) => {
      addToList(res.data);
    })
    .catch((err) => console.log(err));
};

easterBtn.addEventListener("click", isItReallyEaster);
