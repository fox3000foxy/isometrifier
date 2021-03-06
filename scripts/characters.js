characterElements = document.querySelectorAll(".character")
characterElements.forEach(characterElement=>{
	// console.log(characterElement)
	var me = parseInt(characterElement.getAttribute('me'))
	self = {
		speed: 16,
		jumping: false,
		jumpingFinished: true,
		dir: 1
	}
	var characterType = characterElement.getAttribute("player")
	var character = document.createElement("img")
	var characterShadow = document.createElement("img")
	var idleSrc = "characters/"+characterType+"/idle.gif"
	var runSrc = "characters/"+characterType+"/run.gif"
	var pressed = {left: false,up:false,down:false,right:false,run:1}
	character.src = idleSrc
	character.style.left = "0px"
	character.style.top = "0px"
	character.style.zIndex = "1"
	characterShadow.src = character.src
	characterShadow.style.left = "8px"
	characterShadow.style.top = "-16px"
	characterShadow.style.width = "64px"
	characterShadow.style.height = "16px"
	characterShadow.style.opacity = "0.30"
	characterShadow.style.zIndex = "0"
	characterShadow.style.transform = "scale(1) skew(-45deg)"
	characterShadow.style.filter = "brightness(0)"
	characterElement.appendChild(character)
	if(characterElement.hasAttribute('autoShadow'))
	characterElement.appendChild(characterShadow)
	
	if(localStorage.coordinates){
		if(JSON.parse(localStorage.coordinates).x) mapBox.style.left = JSON.parse(localStorage.coordinates).x
		if(JSON.parse(localStorage.coordinates).y) mapBox.style.top = JSON.parse(localStorage.coordinates).y
		if(JSON.parse(localStorage.coordinates).d) self.dir = JSON.parse(localStorage.coordinates).d
	}
	
	if(me) {
		characterElement.setAttribute("coordX",parseInt(mapBox.style.left))
		characterElement.setAttribute("coordY",parseInt(mapBox.style.top))
	}
	
	document.addEventListener('keydown',(ev)=>{
		if(ev.key == "ArrowLeft") {self.dir = -1;}
		if(ev.key == "ArrowRight") {self.dir = 1;}
		
		if(ev.key == "ArrowRight") {pressed.right = true}
		if(ev.key == "ArrowLeft") {pressed.left = true}
		if(ev.key == "ArrowUp") {pressed.up = true}
		if(ev.key == "ArrowDown") {pressed.down = true}
		if(ev.key == "Shift") {pressed.run = 1.5}
		if(ev.key == " " && self.jumpingFinished==true) {self.jumping = true}
	})
		
	document.addEventListener('keyup',(ev)=>{
		if(ev.key == "ArrowRight") {pressed.right = false}
		if(ev.key == "ArrowLeft") {pressed.left = false}
		if(ev.key == "ArrowUp") {pressed.up = false}
		if(ev.key == "ArrowDown") {pressed.down = false}
		if(ev.key == "Shift") {pressed.run = 1}
	})
	
	setInterval(()=>{
		if(me) {
			character.style.transform = `scaleX(${self.dir})`;
			if(me) characterShadow.style.transform = `scale(${self.dir},1) skew(${self.dir * -45}deg, 0deg)`
			if(pressed.left) 	{mapBox.style.left = (parseInt(mapBox.style.left)+(self.speed*pressed.run))+"px"}
			if(pressed.right) 	{mapBox.style.left = (parseInt(mapBox.style.left)-(self.speed*pressed.run))+"px"}
			if(pressed.up) 		{mapBox.style.top = (parseInt(mapBox.style.top)+(self.speed*pressed.run))+"px"}
			if(pressed.down) 	{mapBox.style.top = (parseInt(mapBox.style.top)-(self.speed*pressed.run))+"px"}	
			if(pressed.up || pressed.down || pressed.left || pressed.right || !self.jumpingFinished) {
				localStorage.coordinates = JSON.stringify({
					x: mapBox.style.left,
					y: mapBox.style.top,
					d: self.dir
				})
				if(character.src.indexOf(runSrc) == -1) {
					character.src = runSrc;
					characterShadow.src = runSrc
				}
			}
			else if(character.src.indexOf(idleSrc) == -1) {
				character.src = idleSrc;
				characterShadow.src = idleSrc
			}
		
			if(self.jumping) {
				self.jumpingFinished = false
				self.jumping=false
				for (i=0;i<21;i++ && self.jumping!=false) {
					setTimeout(()=>{
						character.style.top = (parseFloat(character.style.top)-(self.speed/16))+"px"
						characterShadow.style.top = (parseFloat(characterShadow.style.top)-(self.speed/16))+"px"
						characterShadow.style.left = (parseFloat(characterShadow.style.left)+(self.speed/16))+"px"
					},i*10)
				}
				for (i=25;i<46;i++) {
					setTimeout(()=>{
						character.style.top = (parseFloat(character.style.top)+(self.speed/16))+"px"
						characterShadow.style.top = (parseFloat(characterShadow.style.top)+(self.speed/16))+"px"
						characterShadow.style.left = (parseFloat(characterShadow.style.left)-(self.speed/16))+"px"
					},i*10)
				}
				setTimeout(()=>{self.jumpingFinished = true;},480)
			}
		}
		
		myCoordX = parseInt(mapBox.style.left)
		myCoordY = parseInt(mapBox.style.top)
		
		otherCharacters = document.querySelectorAll("*[me='0']")
		otherCharacters.forEach(otherCharacter=>{
			var coordX = parseInt(otherCharacter.getAttribute("coordx"))
			var coordY = parseInt(otherCharacter.getAttribute("coordy"))
			otherCharacter.style.left = myCoordX - coordX
			otherCharacter.style.top = myCoordY - coordY
			
			characterElement.style.zIndex = "2"
			if(myCoordY > coordY) otherCharacter.style.zIndex = "3"
			else otherCharacter.style.zIndex = "1"
		
		})
		
		
		if(me){
			characterElement.setAttribute("coordX",myCoordX)
			characterElement.setAttribute("coordY",myCoordY)
		}
	},50)
})