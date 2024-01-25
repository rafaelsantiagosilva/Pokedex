"use strict";
let pokemonId = 1;
let pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
const POKEMON_IMAGE = document.getElementById("pokemon-image");
const POKEMON_NAME_DOM = document.getElementById("pokemon-name");
const POKEMON_ID_DOM = document.getElementById("pokemon-id");
class Converter {
    pokemonNameFirstLetterToUpperCase(pokemonName) {
        let name = pokemonName[0].toUpperCase();
        name += pokemonName.slice(1, pokemonName.length).toLowerCase();
        return name;
    }
    pokemonAddZerosAndHashtagToId(pokemonId) {
        let id = pokemonId.toString();
        if (pokemonId < 100) {
            if (pokemonId < 10) {
                id = "#00" + id;
            }
            else {
                id = "#0" + id;
            }
        }
        else {
            id = "#" + id;
        }
        return id;
    }
}
function modifyPokeApiUrl(step) {
    pokemonId += step;
    pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
}
function loadPokemon() {
    fetch(pokeapiUrl)
        .then((response) => response.json())
        .then((response) => {
        const converter = new Converter();
        POKEMON_NAME_DOM.innerText = converter.pokemonNameFirstLetterToUpperCase(response.name);
        POKEMON_ID_DOM.innerText = converter.pokemonAddZerosAndHashtagToId(response.id);
        POKEMON_IMAGE.setAttribute("src", response.sprites.other.dream_world.front_default);
    })
        .catch((error) => {
        console.error(error);
    });
}
document.addEventListener("onload", loadPokemon());
//# sourceMappingURL=main.js.map