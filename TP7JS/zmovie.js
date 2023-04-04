const moviesContainer = document.querySelector("#movie-container");
// const check = document.querySelector("#check");
// let isCheck = false;
let search = document.querySelector("#movie-name");
let isInputCheck = false;
let patternRecherche = "default";



let compteur = 0;
const afficherFilm = (movie) => {
	compteur ++;
	// if (Number(window.scrollY)==459) {
  	// 	// window.scroll(0, 0); // reset the scroll position to the top left of the document.
  	// 	window.scrollByPages(2);
	// }

	// window.scrollByPages(1);
	// newRow= document.createElement('div');
	// newRow.classList.add('row');

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
	movieTitle.classList.add("mytitle");
	movieTitle.style.fontSize = '18px';
	movieTitle.style.fontWeight = 'bolder';
	movieTitle.style.float = 'left'
	movieTitle.style.width='250px'
	movieTitle.style.wordBreak = 'break-all'
	movieTitle.innerText = movie.title;


	const divCategory = document.createElement("div");
	divCategory.classList.add("category");
	divCategory.style.float='right'
	divCategory.style.backgroundColor = '#24274D'
	divCategory.style.marginRight = '18px'

	const divStars = document.createElement("div");
	divStars.classList.add("stars");
	const starClasse = document.getElementById('stars');

	const ranking = document.createElement("p");
	let rang = Number(movie.vote_average).toFixed(1);
	if (rang > 7) {
		ranking.style.color='green'
		ranking.style.fontWeight = 'bolder';
	}else if (rang < 3) {
		ranking.style.color='red'
		ranking.style.fontWeight = 'bolder';
	}
	else{
		ranking.style.color='orange'
		ranking.style.fontWeight = 'bolder';
	}
	ranking.innerText = rang


	const movieSinopse = document.createElement("span");
	movieSinopse.classList.add("sinopse")
	movieSinopse.style.backgroundColor='white'
	movieSinopse.style.textAlign='left'
	movieSinopse.innerHTML = '<b>'+'Overview: '+'</b>'+'<br><br>'+movie.overview 
	movieSinopse.classList.add('hide')


	divStars.appendChild(ranking);

	divCategory.appendChild(divStars);
	divDescription.appendChild(movieTitle);
	divDescription.appendChild(divCategory);
	divInfo.appendChild(movieCover);
	divInfo.appendChild(movieSinopse);
	divInfo.appendChild(divDescription);

	movieCard.appendChild(divInfo);
	// movieCard.appendChild(movieSinopse)
	moviesContainer.appendChild(movieCard);
	

}

let maxY = window.scrollMaxY;
// maxY =Number(456)
window.scrollTo(0, maxY);

window.onscroll = function() {
	myFunction()
};

function myFunction() {
  if (document.documentElement.scrollTop == 550) {
      // document.getElementById("movie-container").classList.add("slideUp");
  	window.body.classList.add("slideUp");

  }
   // window.scroll(0, 0)

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
			const data   = await movies.results;

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
		// isCheck = false;
		// check.checked = false;
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



const getMoviebyID = async (id) => {
	try {
		const url = (`https://api.themoviedb.org/3/movie/${id}?api_key=c01784035bbc1fa42a613a52fd09e823&language=fr`);
		const movie = await fetch(url).then(res => res.json());
		return movie;
	} catch (error) {
		console.log(error);
	}
}


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

