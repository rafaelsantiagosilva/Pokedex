"use strict";
var _a, _b;
class Converter {
    firstLetterOfStringToUpperCase(string) {
        let name = string[0].toUpperCase();
        name += string.slice(1, string.length).toLowerCase();
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
    formatPokemonWeight(weight) {
        let weightInKg = weight / 10;
        return weightInKg + " kg";
    }
    formatPokemonHeight(height) {
        let heightInM = height / 10;
        return heightInM + " m";
    }
}
let pokemonId = 1;
let pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
const POKEMON_IMAGE = document.getElementById("pokemon-image");
const POKEMON_NAME_DOM = document.getElementById("pokemon-name");
const POKEMON_ID_DOM = document.getElementById("pokemon-id");
const POKEMON_TYPE_LIST_DOM = document.getElementById("pokemon-types");
const POKEMON_WEIGHT_DOM = document.getElementById("pokemon-weight");
const POKEMON_HEIGHT_DOM = document.getElementById("pokemon-height");
const POKEMON_STATS_DOM = document.querySelectorAll("td.stat-value");
const converter = new Converter();
const BUTTONS_SOUND = new Audio("./src/sounds/beep-8bits.mp3");
function playButtonSound() {
    BUTTONS_SOUND.play();
}
function modifyPokeApiUrl(step) {
    pokemonId += step;
    pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
}
function eventButtons(condition, stepIf, stepElse) {
    if (pokemonId == condition) {
        modifyPokeApiUrl(stepIf);
        loadPokemon(pokeapiUrl);
    }
    else {
        modifyPokeApiUrl(stepElse);
        loadPokemon(pokeapiUrl);
    }
}
function addTypesToListDom(types) {
    if ((POKEMON_TYPE_LIST_DOM === null || POKEMON_TYPE_LIST_DOM === void 0 ? void 0 : POKEMON_TYPE_LIST_DOM.children.length) != 0) {
        while (POKEMON_TYPE_LIST_DOM === null || POKEMON_TYPE_LIST_DOM === void 0 ? void 0 : POKEMON_TYPE_LIST_DOM.firstChild) {
            let otherTypes = POKEMON_TYPE_LIST_DOM.firstChild;
            POKEMON_TYPE_LIST_DOM.removeChild(otherTypes);
        }
    }
    types.forEach((type) => {
        // @ts-ignore
        let typeName = type.type.name;
        let listItem = document.createElement("li");
        listItem.classList.add("pokemon-type");
        listItem.classList.add(typeName);
        let text = document.createTextNode(converter.firstLetterOfStringToUpperCase(typeName));
        listItem.appendChild(text);
        // @ts-ignore
        POKEMON_TYPE_LIST_DOM.appendChild(listItem);
    });
}
function addStatsToTableDom(stats) {
    //  @ts-ignore
    for (let i = 0; i < POKEMON_STATS_DOM.length; i++) {
        // @ts-ignore
        POKEMON_STATS_DOM[i].innerText = stats[i].base_stat;
    }
}
function loadPokemon(pokeapiUrl) {
    fetch(pokeapiUrl)
        .then((response) => response.json())
        .then((response) => {
        let pokemonImage = response.sprites.other.dream_world.front_default;
        // @ts-ignore
        POKEMON_IMAGE.setAttribute("src", pokemonImage);
        let pokemonName = response.name;
        // @ts-ignore
        POKEMON_NAME_DOM.innerText =
            converter.firstLetterOfStringToUpperCase(pokemonName);
        let pokemonId = response.id;
        // @ts-ignore
        POKEMON_ID_DOM.innerText =
            converter.pokemonAddZerosAndHashtagToId(pokemonId);
        let pokemonTypes = response.types;
        addTypesToListDom(pokemonTypes);
        let pokemonWeight = response.weight;
        // @ts-ignore
        POKEMON_WEIGHT_DOM.innerText = converter.formatPokemonWeight(pokemonWeight);
        let pokemonHeight = response.height;
        // @ts-ignore
        POKEMON_HEIGHT_DOM.innerText = converter.formatPokemonHeight(pokemonHeight);
        let pokemonStats = response.stats;
        addStatsToTableDom(pokemonStats);
    })
        .catch((error) => {
        console.error(error);
    });
}
// @ts-ignore
document.addEventListener("onload", loadPokemon(pokeapiUrl));
(_a = document.getElementById("btn-before")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    playButtonSound();
    eventButtons(1, 150, -1);
});
(_b = document.getElementById("btn-next")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    playButtonSound();
    eventButtons(151, -150, 1);
});
//# sourceMappingURL=main.js.map