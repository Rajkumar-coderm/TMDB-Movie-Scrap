let pageNumber = 1;
var gvariable = false;
var totalpages = 0;
const API_KEy = "5d98a7a1405b8032e28c31e19e4d10a9";
const baseUrl = "https://api.themoviedb.org/3/search/movie";
const myfunction = async function () {
  console.log(pageNumber, totalpages, "page....");
  const movieName = document.getElementById("mov-name").value;
  try {
    if (movieName === "") {
      const res = await fetch(
        `${baseUrl}?api_key=${API_KEy}&language=en-US&query=a&page=${pageNumber}&include_adult=false`
      );
      const data = await res.json();
      console.log(data.total_pages);
      totalpages = data.total_pages;

      showAllMoviesData(data);
    } else {
      const res = await fetch(
        `${baseUrl}?api_key=${API_KEy}&language=en-US&query=${movieName}&page=${pageNumber}&include_adult=false`
      );
      const data = await res.json();
      console.log(data.total_pages);
      totalpages = data.total_pages;

      showAllMoviesData(data);
    }
  } catch (error) {
    console.log(error);
  }
};

const myfunction2 = function () {
  document.getElementById("all-movie").innerHTML = "";
  pageNumber = 1;
  myfunction();
};

// !Show All movies in Arry Form in The all  section.
function showAllMoviesData(data) {
  document.getElementById("show-all-data").style.display = "block";
  document.getElementById("after-first").style.display = "none";
  // console.log(data.results.length);
  if (data.results.length === 0) {
    document.getElementById("movies-data").style.display = "none";
    document.getElementById("page-not-found").style.display = "block";
  } else {
    for (let i of data.results.slice(-20)) {
      let mydiv = document.createElement("div");
      mydiv.className = "movie";
      mydiv.innerHTML = `
        <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${i.poster_path}" alt="poster-image">
      <p class="movie-id">${i.id}</p>
      <div class="movie-data">
          <p class="title">${i.original_title}</p>
          <p class="other"><span>Popularity :- </span>${i.popularity}</p>
          <p class="lang other"><span>Language :- </span>${i.original_language}</p>
          <p class="other"><span>Release Data :- </span>${i.release_date}</p>
      </div>
      `;
      document.getElementById("all-movie").appendChild(mydiv);
    }
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    gvariable = clientHeight;
    eventCaller();
  }
}

// ! This is all event call in one by one...
function eventCaller() {
  const data = document.querySelectorAll(".movie");
  data.forEach(function (main) {
    main.addEventListener("click", function () {
      let id = main.querySelector(".movie-id").textContent;
      myData(id);
    });
  });
}

// !This is show data in one movie in whole movie data in one side...
const myData = async function (id) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEy}`
    );
    const data = await res.json();
    mainData(data);
  } catch (err) {
    console.log(err);
  }
};

// !This is show main data in our web pages....
function mainData(data) {
  let timeFormat = `${(data["runtime"] / 60) ^ 0}:` + (data["runtime"] % 60);
  let gener = data["genres"];
  let data1 = gener.map((i) => {
    return i["name"];
  });
  document.getElementById("one-data").innerHTML = "";
  html = `
          <div class="one-movie-data">
              <img
              src="https://www.themoviedb.org/t/p/w220_and_h330_face${data["poster_path"]}"
              alt=""
              />
              <div class="more-data">
                  <h1>${data["original_title"]}</h1>
                  <div class="again-data">
                      <p class="more-p"><span>Release Date :- </span>${data["release_date"]}</p>
                      <p class="more-p"><span>Gener :- </span>${data1}</p>
                      <p class="more-p"><span>Run-Time :- </span>${timeFormat} hr</p>
                      <p class="more-p again-more-p"><span>Movie Language :- </span>${data["original_language"]}</p>
                      <p class="more-p"><span>Rating :- </span>${data["vote_average"]}</p>

                  </div>
              </div>
          </div>
          <div class="overview">
              <p class="overview-P"><span>Movie Overview :-  </span>  
              ${data["overview"]}
              </p>
          </div>
       `;

  document.getElementById("one-data").insertAdjacentHTML("beforeend", html);
}

// !Scrolling window and then call one by one myfunction...
const scrollerButtom = async () => {
  setTimeout(() => {
    pageNumber++;
    myfunction();
  }, 500);
};

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight === scrollHeight) {
    // console.log("Scroll down");
    // console.log(scrollTop, clientHeight, scrollHeight);
    scrollerButtom();
  } else {
    console.log(
      Math.floor((scrollTop + clientHeight) / 500),
      Math.floor(scrollHeight / 500)
    );
  }
});

// !........................The End Happy Coding.......................!//
