const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const moiveBox = document.querySelector("#movie-box");

const getMovies = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  showMovies(data.results); // Accessing the 'results' array in the response data
};

getMovies(APIURL);

const showMovies = (movies) => { // Renamed parameter to 'movies' for clarity
  moiveBox.innerHTML = "";
  movies.forEach((item) => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
      <img src="${IMGPATH + item.poster_path}" alt="" />
      <div class="overlay">
        <div class="title"> 
          <h2>${item.original_title}</h2>
          <span>${item.vote_average}</span> <!-- Corrected closing span tag -->
        </div>
        <h3>Overview:</h3>
        <p>${item.overview}</p>
      </div>
    `;
    moiveBox.appendChild(box);
  });
};

document.querySelector("#search").addEventListener("keyup", function(event) {
  const searchValue = event.target.value;
  if (searchValue !== "") {
    getMovies(SEARCHAPI + searchValue); // Constructing the search URL properly
  } else {
    getMovies(APIURL);
  }
});


