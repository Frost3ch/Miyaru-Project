var speciesV = "";
var sizeV = "";
var behaviourV = "";

const selectedAll = document.querySelectorAll(".selected");
selectedAll.forEach((selected) => {
  const optionsContainer = selected.previousElementSibling;
  const searchBox = selected.nextElementSibling;

  const optionsList = optionsContainer.querySelectorAll(".option2");

  selected.addEventListener("click", () => {
    if (optionsContainer.classList.contains("active")) {
      optionsContainer.classList.remove("active");
    } else {
      let currentActive = document.querySelector(".options-container.active");

      if (currentActive) {
        currentActive.classList.remove("active");
      }

      optionsContainer.classList.add("active");
    }

    searchBox.value = "";
    filterList("");

    if (optionsContainer.classList.contains("active")) {
      searchBox.focus();
    }
  });

  optionsList.forEach((o) => {
    o.addEventListener("click", () => {
      selected.innerHTML = o.querySelector("label").innerHTML;
      let sName = selected.getAttribute("name");
      if (sName == "species"){
        speciesV = o.querySelector("label").innerHTML;}
      else if (sName == "size"){
        sizeV = o.querySelector("label").innerHTML;}
      else if (sName == "behaviour"){
        behaviourV = o.querySelector("label").innerHTML;}
      optionsContainer.classList.remove("active");
    });
  });

  searchBox.addEventListener("keyup", function (e) {
    filterList(e.target.value);
  });

  const filterList = (searchTerm) => {
    searchTerm = searchTerm.toLowerCase();
    optionsList.forEach((option) => {
      let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
      if (label.indexOf(searchTerm) != -1) {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });
  };
});

document.getElementById('form').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent the form from reloading the page

  // Get values from the form inputs
  const dd = document.getElementById('date1').value;
  const mm = document.getElementById('date2').value;
  const yyyy = document.getElementById('date3').value;
  const hh = document.getElementById('time1').value;
  const min = document.getElementById('time2').value;
  const extraInformation  = document.getElementById('extras').value;
  const longitude = document.getElementById('loc1').value;
  const latitude = document.getElementById('loc2').value;

  // Define API links
  const apiLink = {
    'mongodb': 'https://sharkproject.tactor.dev/api/addShark',
    'xano': 'https://x8ki-letl-twmt.n7.xano.io/api:2D0WNQvF/shark_data',
  };

fetch(apiLink['mongodb'], {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    date: `${dd}/${mm}/${yyyy}`,
    time: `${hh}:${min}`,
    extraInformation: extraInformation,
    location: `${longitude}, ${latitude}`,
    species: speciesV,
    size: sizeV,
    behaviour: behaviourV,
  }),
});
});
