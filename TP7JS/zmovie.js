const moviesContainer = document.querySelector("#movie-container");
let search = document.querySelector("#movie-name");
let isInputCheck = false;
let patternRecherche = "default";
let page = 1;
let firstElt = 0
let lastElt = 8
let memoire = localStorage
ImgPath ="/home/kala/joofmusa/Desktop/tpJS/TP7JS/"
// memoire.clear()


let compteur = 0;
let listeFilms = []

const afficherFilm = (movie) => {

	compteur ++;

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

	const movieTitle = document.createElement("textarea");
	// movieTitle.disabled=true
	movieTitle.classList.add("mytitle");
	movieTitle.style.fontSize = '18px';
	movieTitle.style.fontWeight = 'bolder';
	movieTitle.style.float = 'left'
	movieTitle.style.width='250px'
	movieTitle.style.wordBreak = 'break-all'
	movieTitle.innerText = movie.title;
	listeFilms.push(movie.title)

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


	const movieSinopse = document.createElement("textarea");
	movieSinopse.classList.add("sinopse")
	movieSinopse.style.backgroundColor='white'
	movieSinopse.style.textAlign='left'
	let overView = document.createElement("div");
	overView.innerHTML = '<b>Overview</b>';
	overView.style.color='white' 
	movieSinopse.innerHTML = movie.overview 
	overView.appendChild(movieSinopse)
	overView.classList.add('hide')


	divStars.appendChild(ranking);
	divCategory.appendChild(divStars);
	divDescription.appendChild(movieTitle);
	divDescription.appendChild(divCategory);
	divInfo.appendChild(movieCover);
	divInfo.appendChild(overView);
	divInfo.appendChild(divDescription);

	movieCard.appendChild(divInfo);
	moviesContainer.appendChild(movieCard);

	let overArea = document.querySelectorAll(".hide");
	let titleArea =  document.querySelectorAll('.mytitle')
	let imgArea =  document.querySelectorAll('.movie-cover')

	imgArea.forEach(myimg => myimg.addEventListener('mouseover', ()=>{
		newinput = document.createElement('input')
		newinput.type='file'
		newinput.setAttribute("id","imageInput")
		myimg.appendChild(newinput)
	}))

	imgArea.forEach(myimg => myimg.addEventListener('click', ()=>{
		var newinput = document.getElementById('imageInput')
		newinput.click();
		newinput.addEventListener('change', function(){
			previewImage(newinput, myimg);
		});

	}))


	overArea.forEach(area => area.addEventListener('mouseover', ()=>{
		area.classList.remove("hide")
	}))

	// titleArea.forEach(tarea => tarea.addEventListener('click', ()=>{
	// 	tarea.disabled = false
	// }))


	titleArea.forEach(tarea => tarea.addEventListener('change', (event)=>{
		tarea.value = event.target.value;
  		memoire['title']=tarea.value
  		// console.log(memoire)
	}))

	overArea.forEach(area => area.addEventListener('mouseout', ()=>{
		area.classList.add("hide")
	}))

	overArea.forEach(area => area.addEventListener('change', (event)=>{
  		area.value = event.target.value;
  		memoire['overview']=area.value
  		// console.log(memoire)
	}))

	


}

function previewImage(fileInput, image) {
  
  if (fileInput.files && fileInput.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      image.setAttribute('src', e.target.result);
    }
    memoire['image']= ImgPath + fileInput.files[0].name
    // console.log(memoire)
    reader.readAsDataURL(fileInput.files[0]);
  }
}

function showElement(element) {
  element.classList.remove("hide");
}

function getTextareaValue(x, newValue) {

  x.value = newValue;
  return newValue;

}


const effacerListeFilm = () => moviesContainer.innerHTML = "";

const ajouterFilmListe = (movies) => {
	effacerListeFilm();
	// movies.slice(0,8).map(movie => afficherFilm(movie));
	movies.map(movie => afficherFilm(movie));
}

const getMovies = async (search) => {
	if (search === "default") {
		try {
			const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;
			const movies = await fetch(url).then(res => res.json());
			const data   = await movies.results;
			// const data   = await movies.results.slice(firstElt,lastElt);
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
		const url = `https://api.themoviedb.org/3/search/movie?api_key=c01784035bbc1fa42a613a52fd09e823&language=fr&query=${nomFilm}&page=${page}&include_adult=false`;
		const movies = await fetch(url).then(res => res.json());
		const data = movies.results;
		ajouterFilmListe(data);
	} catch (error) {
		console.log(error);
	}
}

const stockageFilm = (id) => {
	const IDs = memoire.getItem("title");
	if (IDs !== null) {
		const allIDs = JSON.parse(IDs);
		memoire.setItem("title", JSON.stringify([...allIDs, id]));
		return getMovies(patternRecherche);
	}
	memoire.setItem("title", JSON.stringify([id]));
	return getMovies(patternRecherche);
}

const gererRechercheFilm = () => {
	if (search.value !== "") {
		getMoviesByName(search.value);
		return search.value = "";
	}
}

const stockerFilm = (id) => {
	const IDs = memoire.getItem("idMovie");
	if (IDs !== null) {
		const allIDs = JSON.parse(IDs);
		memoire.setItem("idMovie", JSON.stringify([...allIDs, id]));
		return getMovies(patternRecherche);
	}
	memoire.setItem("idMovie", JSON.stringify([id]));
	return getMovies(patternRecherche);
}

const rafraichirPage = (idMovies) => {
	if (idMovies.length > 0) {
		return getMovies(patternRecherche);
	}
}

const effacerFilmStocke = (id) => {
	let idMovies = memoire.getItem("title");
	idMovies = JSON.parse(idMovies);
	idMovies = idMovies.filter(idMovie => idMovie != id)
	memoire.setItem("title", JSON.stringify([...idMovies]));
	rafraichirPage(idMovies);
}

const siFilmExiste = (id) => {
	const IDs = memoire.getItem("title");
	if (IDs !== null) {
		const movieExists = JSON.parse(IDs)
		return movieExists.includes(id) ? true : false;
	}
	return false
}


const FilmFavoris = async (id) => {
	if (!siFilmExiste(id)) {
		return stockerFilm(id);
	}
	effacerFilmStocke(id)
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

const lireFilmFavoris = (arrayIDs) => {
	let arrayMovies = []
	arrayIDs.map(id => {
		arrayMovies.push(getMoviebyID(id))
	});
	arrayMovies = Promise.all(arrayMovies).then(favoriteMovies => favoriteMovies)
	arrayMovies.then(favoriteMovies => ajouterFilmListe(favoriteMovies))
}

const rechercherFilmFavori= () => {
	const alertText = "recherchez vos films préférés et cliquez sur favori";
	let arrayIDs = memoire.getItem("title");
	arrayIDs = JSON.parse(arrayIDs);
	arrayIDs.length > 0 ? lireFilmFavoris(arrayIDs) : alert(alertText);
}


window.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		console.log(search.value)
		if (search.value !== "") {
			gererRechercheFilm();
		}else {
		window.location.reload();
		}
	}
});

getMovies(patternRecherche);


window.addEventListener('scroll', function() {
   if (window.scrollY >= window.scrollMaxY) {
   	 page++;
	 getMovies(patternRecherche)
	 window.scroll(0,0)
  
   }

});



const searchInput = document.querySelector("#movie-name");
searchInput.addEventListener('input', function() {
  const keyword = this.value;
  rechercheMotCles(keyword);
});



function rechercheMotCles(keyword) {
  fetch(`https://api.themoviedb.org/3/search?keywords=${keyword}`)
    .then(response => response.json())
    .then(data => {
      const resultList = document.getElementById('results');
      resultList.innerHTML = '';
      data.forEach(result => {
        const resultItem = document.createElement('li');
        resultItem.textContent = result.name;
        resultList.appendChild(resultItem);
      });
    })
    .catch(error => console.error(error));
}


console.table(memoire)