
	const chaineMdpval        = document.getElementById('tailleMotdePasse');
	const majusculesInclusval = document.getElementById('majuscules');
	const chiffreInclusval    = document.getElementById('chiffres');
    const minusculesInclusval = document.getElementById('minuscules');
	const specialInclusval    = document.getElementById('caracteresSpeciaux');
	const form                = document.getElementById('generateurMotdePasse');
	const mdpZone             = document.getElementById('afficherMotdePasse');
	const btnSubmit           = document.getElementById('submit');
	btnSubmit.disabled = true;
	btnSubmit.style.opacity = '0.5'
	const tooltip = document.getElementById("myTooltip");
	tooltip.style.display = 'none'
	const zoneText = document.getElementsByClassName('tooltip')[0]
	
	

	const Codes_Lettres_Majuscules   = TabMinMax(65, 90);
	const Codes_Lettres_Minuscules   = TabMinMax(97, 122);
	const Codes_Chiffres             = TabMinMax(48, 57);
	const Codes_characteres_speciaux = TabMinMax(33, 47).concat(
	  TabMinMax(58, 64)
	).concat(
	  TabMinMax(91, 96)
	).concat(
	  TabMinMax(123, 126)
	);
	alert('Pour desactiver le bouton\n1=>Veuillez Choisir au moins une Option\n2=>La taille doit etre superieur a 15 et inferieur a 20')
	function misAjour() {

		  if (minusculesInclusval.checked || chiffreInclusval.checked || majusculesInclusval.checked || specialInclusval.checked || chaineMdp.value.length > 15) {
		  		btnSubmit.disabled = false;
		  		btnSubmit.style.opacity = '1'

		  }else {
				btnSubmit.disabled = true;
		   }
		}
	// misAjour();

	minusculesInclusval.addEventListener("change", misAjour);
	chiffreInclusval.addEventListener("change", misAjour);
	majusculesInclusval.addEventListener("change", misAjour);
	specialInclusval.addEventListener("change", misAjour);
	chaineMdpval.addEventListener("input", misAjour);


	form.addEventListener('submit', e => {
	  e.preventDefault()
	  const chaineMdp        = chaineMdpval.value;
	  const chiffreInclus    = chiffreInclusval.checked;
	  const minusculesInclus = minusculesInclusval.checked;
	  const majusculesInclus = majusculesInclusval.checked;
	  const specialInclus    = specialInclusval.checked;
	  const tooltip = document.getElementById("myTooltip");
	  tooltip.style.backgroundColor = 'white'
	  tooltip.style.color = 'black'
	  tooltip.innerText = 'Copier'
	  const motDePasse = creerMotdePasse(chaineMdp, majusculesInclus,minusculesInclus, chiffreInclus,specialInclus);
	  mdpZone.innerText = motDePasse;

	  if (mdpZone.innerText != '') {
	  		// zoneText.addEventListener('onmouseover', ()=>{
	  		tooltip.style.display = 'inline-block'
	  		// });
		}
	});

	function creerMotdePasse(chaineMdp, majusculesInclus,minusculesInclus, chiffreInclus, specialInclus) {
		  // par defaut que des lettres minuscules
		  let texte = Codes_Lettres_Minuscules;
		  if (minusculesInclus) {
		  		texte = texte
		  }
		  // concatenation des caracteres incluses
		  if (majusculesInclus) {
		  		texte = texte.concat(Codes_Lettres_Majuscules);
		  }
		  if (specialInclus) {
		  	texte = texte.concat(Codes_characteres_speciaux);
		  }
		  if (chiffreInclus){
		  	texte = texte.concat(Codes_Chiffres);
		  }
		  
		  // Creation d un tableau pour recuperer le mot de passe
		  const tab = [];
		  for (let i = 0; i < chaineMdp; i++) {
			    const random = texte[Math.floor(Math.random() * texte.length)]
			    tab.push(String.fromCharCode(random));
			  }
			  return tab.join('');
			}

	function TabMinMax(min, max) {
		  const array = []
		  for (let i = min; i <= max; i++) {
		    array.push(i)
		  }
		  return array
		}

	
function copier() {
	var copyText = document.getElementById("afficherMotdePasse");
	navigator.clipboard.writeText(copyText.innerText);
	tooltipText = "mot de passe copie: " + copyText.innerText;
	const tooltip = document.getElementById("myTooltip");
	tooltip.style.backgroundColor = 'green'
	tooltip.style.color = 'white'
	tooltip.innerText = 'copié'
}




