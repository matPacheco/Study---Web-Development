const superheroes = require("superheroes");
const supervillains = require("supervillains");

var superHeroName = superheroes.random();
var superVillainName = supervillains.random();


console.log(superHeroName + " vs " + superVillainName);