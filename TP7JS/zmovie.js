const moviesContainer = document.querySelector("#movie-container");
const check = document.querySelector("#check");
let isCheck = false;
let search = document.querySelector("#movie-name");
let isInputCheck = false;
let patternRecherche = "default";

const estFavori = (id) => {
	let IDs = localStorage.getItem("idMovie");
	if (IDs !== null) {
		IDs = JSON.parse(IDs)
		return IDs.includes(id) ? true : false;
	}
	return false;
}
let compteur = 0;
const afficherFilm = (movie) => {
	compteur ++;
	newRow= document.createElement('div');
	newRow.classList.add('row');

	const movieCard = document.createElement("div");
	movieCard.classList.add("movie-card")

	const divInfo = document.createElement("div");
	divInfo.classList.add("info");

	const movieCover = document.createElement("img");
	movieCover.setAttribute("src", movie.image);
	movieCover.classList.add("movie-cover")
	movieCover.setAttribute("src", `https://image.tmdb.org/t/p/w1280${movie.poster_path}`)

	const divDescription = document.createElement("div");
	divDescription.classList.add("description");

	const movieTitle = document.createElement("p");
	movieTitle.classList.add("title");
	movieTitle.style.fontSize = '20px';
	movieTitle.style.display = 'flex'
	movieTitle.innerText = movie.title;


	const divCategory = document.createElement("div");
	divCategory.classList.add("category");

	const divStars = document.createElement("div");
	divStars.classList.add("stars");
	const starClasse = document.getElementById('stars');
	// starClasse.style.backgroundColor = '';


	const ranking = document.createElement("p");
	ranking.innerText = Number(movie.vote_average).toFixed(1);


	const movieSinopse = document.createElement("p");
	movieSinopse.classList.add("sinopse")
	movieSinopse.innerText = movie.overview ? movie.overview : "Pas de description!";

	divStars.appendChild(ranking);

	divCategory.appendChild(divStars);
	divDescription.appendChild(movieTitle);
	divDescription.appendChild(divCategory);
	divInfo.appendChild(movieCover);
	divInfo.appendChild(divDescription);
	movieCard.appendChild(divInfo);
	movieCard.appendChild(movieSinopse)
	movieSinopse.style.display='none'

	moviesContainer.appendChild(movieCard);

	// mcards = document.querySelectorAll('movie-card'){
	// 	if (compteur == 4) {
	// 		mcards.forEach(mc => ()=> {
	// 	    	mcards.removeAttributes('col')
	// 	    });
	// 	}
	// }

}



const effacerListeFilm = () => moviesContainer.innerHTML = "";

const ajouterFilmListe = (movies) => {
	effacerListeFilm();
	movies.map(movie => afficherFilm(movie));
}

const getMovies = async (search) => {
	if (search === "default") {
		try {
			const url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
			const movies = await fetch(url).then(res => res.json());
			const data = await movies.results;

			patternRecherche = "default";

			return ajouterFilmListe(data);
		} catch (error) {
			console.log(error);
		}
	}
	return getMoviesByName(search);
}

const getMoviesByName = async (nomFilm) => {
	patternRecherche = nomFilm;
	try {
		const url = `https://api.themoviedb.org/3/search/movie?api_key=c01784035bbc1fa42a613a52fd09e823&language=fr&query=${nomFilm}&page=1&include_adult=false`;
		const movies = await fetch(url).then(res => res.json());
		const data = movies.results;

		ajouterFilmListe(data);
	} catch (error) {
		console.log(error);
	}
}

const gererRechercheFilm = () => {
	if (search.value !== "") {
		getMoviesByName(search.value);
		return search.value = "";
	}
}

const stockerFilm = (id) => {
	const IDs = localStorage.getItem("idMovie");
	if (IDs !== null) {
		const allIDs = JSON.parse(IDs);
		localStorage.setItem("idMovie", JSON.stringify([...allIDs, id]));
		return getMovies(patternRecherche);
	}
	localStorage.setItem("idMovie", JSON.stringify([id]));
	return getMovies(patternRecherche);
}

const rafraichirPage = (idMovies) => {
	if (idMovies.length > 0) {
		return voirFavori();
	} else {
		isCheck = false;
		check.checked = false;
		return getMovies(patternRecherche);
	}
}

const afficherFilmStocke = (id) => {
	let idMovies = localStorage.getItem("idMovie");
	idMovies = JSON.parse(idMovies);

	idMovies = idMovies.filter(idMovie => idMovie != id)

	localStorage.setItem("idMovie", JSON.stringify([...idMovies]));

	rafraichirPage(idMovies);
}

const siFilmExiste = (id) => {
	const IDs = localStorage.getItem("idMovie");
	if (IDs !== null) {
		const movieExists = JSON.parse(IDs)
		return movieExists.includes(id) ? true : false;
	}
	return false
}

const gererFavori = async (id) => {
	if (!siFilmExiste(id)) {
		return stockerFilm(id);
	}
	afficherFilmStocke(id)
}

const getMoviebyID = async (id) => {
	try {
		const url = (`https://api.themoviedb.org/3/movie/${id}?api_key=c01784035bbc1fa42a613a52fd09e823&language=fr`);
		const movie = await fetch(url).then(res => res.json());
		return movie;
	} catch (error) {
		console.log(error);
	}
}

const getMoviesFavorite = (arrayIDs) => {
	let arrayMovies = []
	arrayIDs.map(id => {
		arrayMovies.push(getMoviebyID(id))
	});
	arrayMovies = Promise.all(arrayMovies).then(favoriteMovies => favoriteMovies)
	arrayMovies.then(favoriteMovies => ajouterFilmListe(favoriteMovies))
}

const voirFavori = () => {
	const alertText = "Ops! pour utiliser cette fonctionnalité, recherchez vos films préférés et cliquez sur favori et réessayez !";
	let arrayIDs = localStorage.getItem("idMovie");
	arrayIDs = JSON.parse(arrayIDs);
	arrayIDs.length > 0 ? getMoviesFavorite(arrayIDs) : alert(alertText);
}

check.addEventListener("change", () => {
	isCheck = !isCheck;
	if (isCheck) {
		return voirFavori();
	}
	return getMovies(patternRecherche);
});

window.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		console.log(search.value)
		if (search.value !== "") {
			gererRechercheFilm();
		}
	}
});

getMovies(patternRecherche);

let mcard= document.querySelectorAll('title')

	mcard.forEach(mc => mc.addEventListener('click', ()=> {
		movieSinopse.style.display = 'block';
    }));

// mcard.onmouseover = function() {
//   movieSinopse.style.display = 'block';
// }
