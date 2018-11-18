var SNESGameData = [
	["Contra III", 1992, "Konami"],
	["Donkey Kong Country", 1994, "Rare"],
	["F Zero", 1991, "Nintendo"],
	["Kirby Super Star", 1996, "Nintendo"],
	["Mega Man X", 1993, "Capcom"],
	["Secret of Mana", 1993, "Square"],
	["Star Fox", 1993, "Nintendo"],
	["Super Ghouls n Ghosts", 1991, "Capcom"],
	["Super Mario Kart", 1992, "Nintendo"],
	["Super Mario RPG", 1996, "Square"],
	["Super Mario World", 1991, "Nintendo"],
	["Super Metroid", 1994, "Nintendo"],
	["EarthBound", 1994, "HAL Labs"],
	["Street Fighter II Turbo", 1992, "Capcom"],
	["Super Castlevania IV", 1991, "Konami"],
	["Super Punch Out", 1994, "Nintendo"],
	["Zelda Link to the Past", 1992, "Nintendo"],
	["Chrono Trigger", 1995, "Square"],
	["Final Fantasy VI", 1994, "Square"],
	["Mario Paint", 1992, "Nintendo"]
];

function SNESGame(title, year, company){
	this.title = title;
	this.year = year;
	this.company = company;
	
	this.getTitle = function(){
		return this.title.toUpperCase();
	};

	this.getInfo = function(){
		return this.title + "<br/>" + this.year + "<br/>" + this.company;
	};
}

var SNESGames = [];
for (videoGame of SNESGameData){
	var snesGame = new SNESGame(videoGame[0], videoGame[1], videoGame[2]);
	SNESGames.push(snesGame);
}

function pickGame(){
	var randNum = Math.floor(Math.random()*SNESGames.length);
	return SNESGames[randNum];
}