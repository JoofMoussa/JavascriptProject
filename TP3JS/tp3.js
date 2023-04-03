
	
	// notSuccess  = document.getElementById('a1');
	// notDanger   = document.getElementById('a2');
	// notWarning  = document.getElementById('a3');
	// notInfo     = document.getElementById('a4');

	const btns =document.querySelectorAll('button')
    
    function getNotif(element) {
    	const notes = document.getElementById('notif');
    	let nouveauDiv = document.createElement('div');
    	nouveauDiv.innerText = 'Mon Projet 4';
    	let attr = element.attributes
		nouveauDiv.classList.add('notifications',attr[1].value);
		notes.appendChild(nouveauDiv);
		setTimeout( ()=>{
			notes.removeChild(nouveauDiv);
		}, 5000);
    }

    btns.forEach(btn => btn.addEventListener('click', ()=> {
    	getNotif(btn)
    }));
	// notSuccess.addEventListener('click', ()=> {
	// 	getNotif(notSuccess)
	// });

	// notDanger.addEventListener('click', ()=> {
	// 	getNotif(notDanger)
	// });
	// notWarning.addEventListener('click', ()=> {
	// 	getNotif(notWarning)
	// });
	// notInfo.addEventListener('click', ()=> {
	// 	getNotif(notInfo)
	// });
