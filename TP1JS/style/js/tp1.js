
	let contenu = document.getElementById('corps')
	let taches = 0;

	ajout = document.querySelector('button')
	ajout.addEventListener('click', function () {
		taches ++;

		const parLignes = document.createElement('div');
		parLignes.classList.add('row');

		const boite = document.createElement('div');
		boite.classList.add('modal','col');

		// const nouveauParagraphe = document.createElement('br');
		// nouveauParagraphe.classList.add('pt400');

		// boite.classList.add('entete');
		boite.width = "350";
		boite.height = "400";

		const entete = document.createElement('div');
		entete.classList.add('modal-header');
		entete.height = "35"; 
		entete.width = "350"; 
		entete.style.backgroundColor = "#9EC962";

		// Créer les icônes "edit" et "corbeille"
		const edit = document.createElement('i');
		// edit.innerHTML ='Edit'
		edit.classList.add('fa','fa-2x', 'fa-edit','pl20','adroite','text-info');

		const corbeille = document.createElement('i');
		// corbeille.innerHTML = 'Fermer'
		corbeille.classList.add('fa','fa-2x','pl20', 'fa-trash','adroite','text-danger');

		entete.appendChild(corbeille);
		entete.appendChild(edit);
		

		const zoneDeTexte = document.createElement('textarea');
		zoneDeTexte.style.fontSize = '15px';
		zoneDeTexte.disabled=true;

		contenu.appendChild(parLignes);
		boite.appendChild(entete);
		boite.appendChild(zoneDeTexte);
		contenu.appendChild(boite)

		edit.addEventListener('click', function () {
			if (zoneDeTexte.disabled = true) {
				zoneDeTexte.disabled=false;
				entete.style.backgroundColor='lime';
				entete.style.opacity = '1';
			}
			else{
				zoneDeTexte.disabled=true;
				entete.style.backgroundColor="#9EC962";
			}
		});

		edit.addEventListener('dblclick', function () {
			if (zoneDeTexte.disabled = false) {
				zoneDeTexte.disabled=true;
				entete.style.backgroundColor='lime';
			}
			else{
				zoneDeTexte.disabled=true;
				entete.style.backgroundColor="#9EC962";
			}
		});

		corbeille.addEventListener('click', function () {
			contenu.removeChild(boite);
			taches --;
		});

		if (taches == 4) {
			// contenu.appendChild(nouveauParagraphe);
			taches = 0;
		}


	});

