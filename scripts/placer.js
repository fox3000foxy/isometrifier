map.forEach((line,i)=>{
	line.forEach((column,j)=>{
		tile = map[i][j]
		decal = (column.length - i)
		//console.log(decal)
		tileLeft = (j * width) + (decal * height)
		tileTop = i * height
		
		tileElement = document.createElement('img')
		tileElement.src=`tiles/${tile}.${format[tile]}`
		tileElement.setAttribute('isometric','')
		tileElement.setAttribute('tile','')
		tileElement.style.left = tileLeft+"px"
		tileElement.style.top = tileTop+"px"
		mapElement.appendChild(tileElement)
	})
})

characterElements = document.querySelectorAll(".character")
characterElements.forEach(characterElement=>{
	// console.log(characterElement)
	let characterType = characterElement.getAttribute("player")
	let character = document.createElement("img")
	let idleSrc = "characters/"+characterType+"/idle.gif"
	let runSrc = "characters/"+characterType+"/run.gif"
	let pressed = {left: false,up:false,down:false,right:false}
	character.src = idleSrc
	characterElement.appendChild(character)
	
	if(localStorage.coordinates){
		if(JSON.parse(localStorage.coordinates).x) mapBox.style.left = JSON.parse(localStorage.coordinates).x
		if(JSON.parse(localStorage.coordinates).y) mapBox.style.top = JSON.parse(localStorage.coordinates).y
	}
	document.onkeydown = (ev)=>{
		// console.log(ev.key)
		// if (
			// ev.key == "ArrowRight" ||
			// ev.key == "ArrowDown" ||
			// ev.key == "ArrowLeft" ||
			// ev.key == "ArrowUp"
		// ){
		if(ev.key == "ArrowLeft") {character.style.transform = "scaleX(-1)";}
		if(ev.key == "ArrowRight") {character.style.transform = "scaleX(1)";}
		
		if(ev.key == "ArrowRight") {pressed.right = true}
		if(ev.key == "ArrowLeft") {pressed.left = true}
		if(ev.key == "ArrowUp") {pressed.up = true}
		if(ev.key == "ArrowDown") {pressed.down = true}
		if(ev.key == " ") {jumping = true}
		// console.log(ev.key,jumping)
		// }
	}
		
	document.onkeyup = (ev)=>{
		if(ev.key == "ArrowRight") {pressed.right = false}
		if(ev.key == "ArrowLeft") {pressed.left = false}
		if(ev.key == "ArrowUp") {pressed.up = false}
		if(ev.key == "ArrowDown") {pressed.down = false}
	}
	
	setInterval(()=>{
		if(pressed.left) 	{mapBox.style.left = (parseInt(mapBox.style.left)+speed)+"px"}
		if(pressed.right) 	{mapBox.style.left = (parseInt(mapBox.style.left)-speed)+"px"}
		if(pressed.up) 		{mapBox.style.top = (parseInt(mapBox.style.top)+speed)+"px"}
		if(pressed.down) 	{mapBox.style.top = (parseInt(mapBox.style.top)-speed)+"px"}	
		if(pressed.up || pressed.down || pressed.left || pressed.right) {
			localStorage.coordinates = JSON.stringify({
				x: mapBox.style.left,
				y: mapBox.style.top
			})
			if(character.src.indexOf(runSrc) == -1) character.src = runSrc
		}
		else if(character.src.indexOf(idleSrc) == -1) character.src = idleSrc
		
		if(jumping) {
			for (i=0;i<21;i++) {
				setTimeout(()=>{
					mapBox.style.top = (parseInt(mapBox.style.top)+(speed/4))+"px"
				},i*12.5)				
			}
			for (i=25;i<46;i++) {
				setTimeout(()=>{
					mapBox.style.top = (parseInt(mapBox.style.top)-(speed/4))+"px"
				},i*12.5)	
			}
			jumping = false
			// console.log("Jump")
		}
	},50)
	
	
})