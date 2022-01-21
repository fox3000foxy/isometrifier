width = 60
height = width * 3/4
speed = 16
jumping = false 
//Tiles minimizer
g = 'grass'
s = 'stone'
w = 'water'

//Type of tile
format = {
	"grass": "jpg",
	"stone": "jpg",
	"water": "gif"
}

//Define the tile size
Module.defineStyle(`
	html {
		--width: ${width+1}px;
		--height: ${height+1}px
	}
`)

//Elements
mapElement = document.getElementById('map')
mapBox = document.getElementById('mapBox')