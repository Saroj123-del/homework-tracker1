function storeText() {
  let inputText = document.getElementById("textInput").value;
  if (!inputText) {
    return;
  }
  localStorage.setItem("storedText", inputText);
  window.location.href = "home.html";
}

const storesText = localStorage.getItem("storedText");
const username = document.getElementById("name");

if (username !== null) {
  if (storesText !== null) {
    username.textContent = storesText.trim().slice(0, 10);
  }
}

let userTitle = `Title_${storesText}`;
let userDescription = `Description_${storesText}`;
let userStatus = `Status_${storesText}`;

let form = document.querySelector("form");
let ls = localStorage.getItem(userTitle);
let ds = localStorage.getItem(userDescription);
let ss = localStorage.getItem(userStatus);
let Title = document.getElementById("title");
let Description = document.getElementById("description");
let Selects = document.getElementById("selected");
let todo = ls ? JSON.parse(ls) : [];
let todos = ds ? JSON.parse(ds) : [];
let todoss = ss ? JSON.parse(ss) : [];
let screenSize = window.screen.availWidth;
let isMobile = screenSize < 479;
let editingIndex = -1;

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (editingIndex !== -1) {
      todo[editingIndex] = Title.value;
      todos[editingIndex] = Description.value;
      todoss[editingIndex] = Selects.value;
      editingIndex = -1;
    } else {
      todo.push(Title.value);
      todos.push(Description.value);
      todoss.push(Selects.value);
    }

    localStorage.setItem(userTitle, JSON.stringify(todo));
    localStorage.setItem(userDescription, JSON.stringify(todos));
    localStorage.setItem(userStatus, JSON.stringify(todoss));

    form.reset();
    displayTasks();
  });
}

function displayTasks(tasksToShow) {
  document.querySelector("#result").innerHTML = "";
  if (!tasksToShow) {
    tasksToShow = todo.map((item, index) => index);
  }
  tasksToShow.forEach((index) => {
    const data1 = todo[index];
    const data2 = todos[index];
    const data3 = todoss[index];
    document.querySelector("#result").innerHTML += `
        <div id="dataResult2">
        <div id="topresult">
          <h3 id="sub">${data1}</h3>
          <p id="status">${data3}</p>
          </div>
          <p id="desc">${data2}</p>
          <div id="butto" style="display:flex;" >
          <button id="Delt" onclick="del(${index})" style="display:flex;" >
          <img src="delete-512.png"/ style="width:18px ">
         <span style="font-size:18px" > Delete</span></button>
          <button  id="Edi"onclick="edit(${index})" style="display:flex";>
          <img src="edit-512.png"/ style="width:18px;margin-right:5px">
         <span style="font-size:18px" > Edit</span></button>
         </button>
          </div>
          </div>
        `;
  });
}

function edit(index) {
  editingIndex = index;
  Title.value = todo[index];
  Description.value = todos[index];
  Selects.value = todoss[index];
  formresult.style.display = "none";
  formContainer.style.display = "flex";
  tittle.style.display = "none";
  const headings = document.querySelectorAll(".but");
  headings.forEach((h) => h.classList.remove("active"));
}

function del(index) {
  todo.splice(index, 1);
  todos.splice(index, 1);
  todoss.splice(index, 1);
  localStorage.setItem("Title", JSON.stringify(todo));
  localStorage.setItem("Description", JSON.stringify(todos));
  localStorage.setItem("Select", JSON.stringify(todoss));
  const headings = document.querySelectorAll(".but");
  headings.forEach((h) => h.classList.remove("active"));
  displayTasks();
}

displayTasks();

function filterTasks(filter) {
  let tasksToShow = [];
  switch (filter) {
    case "all":
      tasksToShow = todo.map((item, index) => index);

      break;
    case "inProgress":
      tasksToShow = todo
        .map((item, index) => index)
        .filter((index) => todoss[index] === "In Progress");

      break;
    case "notStarted":
      tasksToShow = todo
        .map((item, index) => index)
        .filter((index) => todoss[index] === "Not Started");

      break;
    case "completed":
      tasksToShow = todo
        .map((item, index) => index)
        .filter((index) => todoss[index] === "Completed");

      break;
    default:
      break;
  }
  formresult.style.display = "grid";
  formContainer.style.display = "none";
  if (isMobile) {
    sidebar.style.display = "none";
  }
  displayTasks(tasksToShow);
}

let addbtn = document.getElementById("Add");
let forms = document.getElementById("from");
let cancelbutton = document.getElementById("cancelbtn");
let formcon = document.getElementById("formContainer");
let submitbutton = document.getElementById("submitbtn");
let formresult = document.getElementById("result");
let editbutton = document.getElementById("edi");
let tittle = document.getElementById("hi");

addbtn.addEventListener("click", () => {
  formContainer.style.display = "flex";
  formresult.style.display = "none";
  const headings = document.querySelectorAll(".but");
  headings.forEach((h) => h.classList.remove("active"));
});

cancelbutton.addEventListener("click", () => {
  formContainer.style.display = "none";
  tittle.style.display = "none";
});

submitbutton.addEventListener("click", () => {
  formContainer.style.display = "none";
  formresult.style.display = "grid";
});
let cancolbutton = document.getElementById("cancol");
cancolbutton.addEventListener("click", () => {
  sidebar.style.display = "none";
});

let loginpage = document.getElementById("loginpage");
if (loginpage) {
  loginpage.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

const headings = document.querySelectorAll(".but");

headings.forEach((heading) => {
  heading.addEventListener("click", () => {
    headings.forEach((h) => h.classList.remove("active"));
    heading.classList.add("active");
  });
});

let hamburger = document.getElementById("ham");
let cancelbuton = document.getElementById("cancol");
let sidebar = document.getElementById("sidebarr");
hamburger.addEventListener("click", () => {
  sidebar.style.display = "block";
  cancelbuton.style.display = "flex";
});
