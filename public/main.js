const easterBtn = document.getElementById("is-it-easter");
const midSection = document.getElementById("mid");

const isItEaster = (event) => {
  event.preventDefault();
  console.log("hit");
  addToList("It's Easter");
};

const addToList = (script) => {
  const dateAdded = document.createElement("p");
  dateAdded.textContent = script;
  midSection.appendChild(dateAdded);
};

easterBtn.addEventListener("click", isItEaster);
