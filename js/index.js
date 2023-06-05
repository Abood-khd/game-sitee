let category = document.querySelectorAll("ul li a");
let row = document.getElementById("row");
let cat = document.querySelectorAll("ul li a");
let seemore = document.getElementById("seemore");
let btnclose = document.getElementById("close");
let boxContainer = document.getElementById("boxContainer");
let result = [];
let card = document.querySelectorAll(".row ");
let rowdatils = document.getElementById("rowdatils");
let parent = document.getElementById("parent");
let resultcard = {};

async function GetData(cat) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b32de9188dmsh055352d9ecd1a54p11192djsn0ab56a52a033",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
  };
  const Api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`,
    options
  );
  const result = await Api.json();
  display(result.slice(0, 20));
  let count = 20;
  seemore.addEventListener("click", function () {
    count += 10;
    display(result.slice(0, count));
  });
}

for (let i = 0; i < cat.length; i++) {
  cat[i].addEventListener("click", function (e) {
    GetData(e.target.innerHTML);
  });
}

function display(result) {
  let box = ``;
  for (let i = 0; i < result.length; i++) {
    box += `
      <div  id="carditem" class="col-md-3 mt-3" onclick=" movedatills(${result[i].id})" >
      <div  class="card fst-italic ">
        <div class="card-body text-white">
        <img src="${result[i].thumbnail}" class="img-fluid img-card " alt="...">
          <div class="card-title mt-3 text-start d-flex justify-content-between">
            <h6 class="card-title">${result[i].title}</h6>
            <span class="badge bg-primary ">Free</span>
          </div>
          <div class="desc pb-1">
            <p class="text-muted">Built,for,mobile,and,also,released,on,PC,</p>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <span class="badge bg-secondary">${result[i].genre}</span>
          <span class="badge bg-secondary">${result[i].platform}</span>
        </div>
      </div>
      </div>
    `;
  }
  row.innerHTML = box;
}

window.addEventListener("load", function () {
  GetData("mmorpg");
});

function DisplayCard(resultcard) {
  boxContainer.classList.remove("coustemboxContainer");
  let box = ``;
  box += `
  <div class="d-flex justify-content-end">
  <div class="close">
    <p class="text-white mt-3">   <i id="close" onclick=" closediv()"  class="close-icon fas fa-close fa-2x"></i></p>
  </div>
</div>
  <div class="col-md-4 mt-2">
    <h2 class="text-white fst-italic"> Details Game</h2>
    <img class=" w-100 img-fluid mt-4" src="${resultcard.thumbnail}" alt="">
  </div>
  <div class="col-md-8 mt-4 fst-italic ps-2">
    <h2 class="text-white mt-5 ">Title: ${resultcard.title}</h2>
    <p class="text-white parent-para">
      Category: <span class="badge bg-info">ARPG</span><br>
      Platform: <span class="badge bg-info">${resultcard.platform}</span><br>
      Status:  <span class="badge bg-info">${resultcard.status}</span><br>
        <p class="line-hight text-white">  ${resultcard.description}</p>
          <button id="showgame" class="btn btn-outline-warning rounded-3 "><a class="text-decoration-none text-white"  target="_blank"  href="${resultcard.game_url}">Show Game</a></button>
    </p>
  </div>
  
  `;
  rowdatils.innerHTML = box;
}

function closediv() {
  boxContainer.classList.add("coustemboxContainer");
}

async function movedatills(id) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b32de9188dmsh055352d9ecd1a54p11192djsn0ab56a52a033",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const Api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  let resultcard = await Api.json();
  DisplayCard(resultcard);
}
