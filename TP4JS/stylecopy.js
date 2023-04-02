
function myFunction() {
var copyText = document.getElementById("afficherMotdePasse");
// copyText.select();
// copyText.setSelectionRange(0, 99999);
// alert(copyText.innerText)
navigator.clipboard.writeText(copyText.innerText);
var tooltip = document.getElementById("myTooltip");
tooltipText = "mot de passe copie: " + copyText.innerText;
alert(tooltipText)
}
