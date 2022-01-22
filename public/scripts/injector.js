function inject() {
	Module.import('definers')
	Module.import('map')
	Module.import('placer')
	Module.import('characters')
	
	Module.cssImport('character')
	
	fadeOutPercent = 0
	fadeOut = setInterval(()=>{
		document.body.style = `clip-path: circle(${fadeOutPercent}% at center center);`
		fadeOutPercent++
		if(fadeOutPercent==101) clearInterval(fadeOut)
	},1)
}