const API_KEY = '406625e4be82bbdcff2d29fbf016a597';
const searchInput = document.querySelector('.search-bar');
const moviesContainer = document.querySelector('.movies-container');
let movies = [];

function fetchMovies(){
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        movies = data.results;
        renderMovies(movies);
    });
}

function renderMovies(moviesArray){
    moviesContainer.innerHTML = '';
    if(moviesArray.length === 0){
        moviesContainer.innerHTML = '<p class="noresults">No Movies found</p>';
        return;
    }
    moviesArray.forEach(movie =>{
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-container');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
        `;
        moviesContainer.appendChild(movieCard);
    })
}

function handleSearch(){
    const searchValue = searchInput.value.toLowerCase().trim();
    const filteredMovies = movies.filter(movie =>{
        return movie.title.toLowerCase().includes(searchValue);
    });
    renderMovies(filteredMovies);
}

searchInput.addEventListener('input', handleSearch);
fetchMovies();