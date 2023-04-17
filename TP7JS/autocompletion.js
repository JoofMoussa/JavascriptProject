//je recupere mes elements importants
const searchwrapper = document.querySelector(".search-input");
const inputbox = searchwrapper.querySelector("input");
const suggbox = searchwrapper.querySelector(".autocom-box");


    //Si l'utilisateur clique sur le bouton
    inputbox.onkeyup = (e)=>{
    let userData = e.target.value; //l'utilisateur entre des données
    let emptyArray = [];
    if(userData){
        emptyArray = listeFilms.filter((data)=>{
            // filtrer  les valeurs du tableau de ses recherches
            //cela débute quand l'tulisateur tape un mot
              return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
          });
  
              emptyArray = emptyArray.map((data)=>{
                  return data = '<li>'+ data +'</li>';
              
        });
        console.log(emptyArray);
        searchwrapper.classList.add("active"); // afficher l'autocomplete
        showsuggestion(emptyArray);
        let allList = suggbox.querySelectorAll("li");
        for (let i = 0; i <allList.length; i++) {
            allList[i].setAttribute("onclick", "select(this)");
        }
        
    }else{
        searchwrapper.classList.remove("active"); // cacher l'autocomplete
    }

  }

  // inputbox.addEventListener('onkeypress',function () {
  //   searchwrapper.classList.remove("active");
  // });

  function select(element){
        let selectUserData = element.textContent;
        inputbox.value = selectUserData;
  }

  function showsuggestion(list){
      let listData;
      if(!list.length){
            userValue = inputbox.value;
            listData ='<li>' + userValue + '</li>';

      }else{
          listData = list.join('');
      }
      suggbox.innerHTML = listData;
  }