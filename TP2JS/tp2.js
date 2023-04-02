
	
		const coteGauche   = document.getElementById("left");
		const coteDroite   = document.getElementById("right");
		const boutonDroite = document.getElementById("aDroite");
		const boutonGauche = document.getElementById("aGauche");
		let eltSelectionne = null;

		coteGauche.addEventListener("mouseover", function(event) {
			if (event.target.tagName === "P") {
				if (eltSelectionne) {
					eltSelectionne.classList.remove("selected");
				}
				eltSelectionne = event.target;
				eltSelectionne.classList.add("selected");
			}
		});

		// deplacer les elements selectionnes gauche=>droite
		boutonDroite.addEventListener("click", function() {
			if (eltSelectionne) {
				coteDroite.appendChild(eltSelectionne);
				eltSelectionne.classList.remove("selected");
				eltSelectionne = null;
				// Appel de la fonction etat bouton
				etatBouton();
			}
		});

		coteDroite.addEventListener("mouseover", function(event) {
			if (event.target.tagName === "P") {
				if (eltSelectionne) {
					eltSelectionne.classList.remove("selected");
				}
				eltSelectionne = event.target;
				eltSelectionne.classList.add("selected");
			}
		});

		// deplacer les elements selectionnes droite=>gauche
		boutonGauche.addEventListener("click", function() {
			if (eltSelectionne) {
				coteGauche.appendChild(eltSelectionne);
				eltSelectionne.classList.remove("selected");
				eltSelectionne = null;
				// Appel de la fonction etat bouton
				etatBouton();
			}
		});

		// verifier si le bouton doit etre actif ou desactiver
		function etatBouton() {
			if (coteGauche.children.length === 0) {
				boutonDroite.disabled = true;
			} else {
				boutonDroite.disabled = false;
			}

			if (coteDroite.children.length === 0) {
				boutonGauche.disabled = true;
			} else {
				boutonGauche.disabled = false;
			}
		}

		etatBouton();
	