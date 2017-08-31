var NESGameData = [
	["Balloon Fight",	1986, "Nintendo"],
	["Castlevania",	1987, "Konami"],
	["Donkey Kong",	1986, "Nintendo"],
	["Double Dragon",	1988, "Technos"], 
	["Dr Mario", 1990, "Nintendo"],
	["Excitebike", 1985, "Nintendo"],
	["Galaga", 1988, "Namco"],
	["Ghosts n Goblins", 1986,	"Capcom"],
	["Gradius",	1986, "Konami"],
	["Ice Climber",	1985, "Nintendo"],
	["Kirbys Adventure", 1993, "Nintendo"],
	["Mario Bros", 1985, "Nintendo"],
	["Mega Man", 1987, "Capcom"],
	["Metroid",	1987, "Nintendo"],
	["Ninja Gaiden", 1989, "Tecmo"],
	["Pac Man",	1984, "Namco"],
	["Contra", 1987, "Konami"],
	["Super Mario Bros", 1985,	"Nintendo"],
	["Legend of Zelda", 1987, "Nintendo"],
	["Bubble Bobble",	1988, "Taito"],
	["Final Fantasy", 1990, "Nintendo"],
	["Kid Icarus", 1987, "Nintendo"],
	["Punch Out", 1990, "Nintendo"],
	["StarTropics", 1990, "Nintendo"],
	["Tecmo Bowl", 1989, "Tecmo"]
];

function NESGame(title, year, company){
	this.title = title;
	this.year = year;
	this.company = company;
}

var NESGames = [];
for (videoGame of NESGameData){
	var nesGame = new NESGame(videoGame[0], videoGame[1], videoGame[2]);
	NESGames.push(nesGame);
}

function pickGame(){
	var randNum = Math.floor(Math.random()*NESGames.length);
	return NESGames[randNum];
}