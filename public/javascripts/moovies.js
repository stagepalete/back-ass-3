$(document).ready(function () {
    // Function to fetch movies
    async function fetchMovies(name = 'a') {
        try {
            var uri = `/api/movies?name=${name}`
            const response = await fetch(uri);
            const movies = await response.json();
            return movies;
            console.log(movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
            return [];
        }
    }

    // Function to display movies
    async function displayMovies(name) {
        const movies = await fetchMovies(name);
        const movieList = document.getElementById('movieList');
        movieList.innerHTML = '';
        console.log(movies);
        if (Array.isArray(movies)) {
            movies.forEach(movie => {
                const movieItem = document.createElement('div');
                movieItem.classList.add('col-md-4', 'mb-4');
                movieItem.innerHTML = `
                <div class="card">
                    <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}" class="card-img-top" alt="Movie Poster">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">Release Date: ${movie.release_date}</p>
                    </div>
                </div>
            `;
                movieList.appendChild(movieItem);
            });
        } else {
            console.error('Invalid movies data:', movies);
        }

    }

    // Function to search movies
    function searchMovies() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const movieCards = document.querySelectorAll('.card');
        displayMovies(searchInput);
    }

    $('#searchButton').on('click', searchMovies);
    displayMovies();
})