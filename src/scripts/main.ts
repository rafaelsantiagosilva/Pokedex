"use strict";

class Converter {
	public firstLetterOfStringToUpperCase(string: string): string {
		let name: string = string[0].toUpperCase();
		name += string.slice(1, string.length).toLowerCase();
		return name;
	}

	public pokemonAddZerosAndHashtagToId(pokemonId: number): string {
		let id = pokemonId.toString();
		if (pokemonId < 100) {
			if (pokemonId < 10) {
				id = "#00" + id;
			} else {
				id = "#0" + id;
			}
		} else {
			id = "#" + id;
		}

		return id;
	}

	public formatPokemonWeight(weight: number): string {
		let weightInKg: number = weight / 10;
		return weightInKg + " kg";
	}

	public formatPokemonHeight(height: number): string {
		let heightInM: number = height / 10;
		return heightInM + " m";
	}
}

let pokemonId: number = 0;
// localStorage.clear();

if (localStorage.length === 0) {
	pokemonId = 1;
} else {
	pokemonId = Number(localStorage.getItem("pokemonId"));
}

let pokeapiUrl: string = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

const POKEMON_IMAGE: HTMLElement | null =
	document.getElementById("pokemon-image");

const POKEMON_BACKGROUND_IMAGE_DOM: HTMLElement | null =
	document.getElementById("pokemon-image-background");

const POKEMON_NAME_DOM: HTMLElement | null =
	document.getElementById("pokemon-name");

const POKEMON_ID_DOM: HTMLElement | null =
	document.getElementById("pokemon-id");

const POKEMON_TYPE_LIST_DOM: HTMLElement | null =
	document.getElementById("pokemon-types");

const POKEMON_WEIGHT_DOM: HTMLElement | null =
	document.getElementById("pokemon-weight");

const POKEMON_HEIGHT_DOM: HTMLElement | null =
	document.getElementById("pokemon-height");

const POKEMON_STATS_DOM: NodeList | null =
	document.querySelectorAll("td.stat-value");

const converter: Converter = new Converter();
const BUTTONS_SOUND: HTMLAudioElement = new Audio(
	"./src/sounds/beep-8bits.mp3"
);

function playButtonSound(): void {
	BUTTONS_SOUND.play();
}

function modifyPokeApiUrl(step: number) {
	pokemonId += step;
	pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
	localStorage.setItem("pokemonId", pokemonId.toString());
}

function eventButtons(
	condition: number,
	stepIf: number,
	stepElse: number
): void {
	if (pokemonId == condition) {
		modifyPokeApiUrl(stepIf);
		loadPokemon(pokeapiUrl);
	} else {
		modifyPokeApiUrl(stepElse);
		loadPokemon(pokeapiUrl);
	}
}

function changeBackgroundPokemonImage(type: string): void {
	let backgroundImg: string = "grove";
	if (type == "water") {
		backgroundImg = "beach";
	} else if (type == "rock") {
		backgroundImg = "cave";
	} else if (type == "ground") {
		backgroundImg = "desert";
	} else if (type == "bug" || type == "grass") {
		backgroundImg = "forest";
	} else if (type == "normal" || type == "flying" || type == "fairy") {
		backgroundImg = "grove";
	} else if (
		type == "fighting" ||
		type == "steel" ||
		type == "electric" ||
		type == "fire"
	) {
		backgroundImg = "gym";
	} else if (
		type == "poison" ||
		type == "ghost" ||
		type == "psychic" ||
		type == "dark"
	) {
		backgroundImg = "mind-space";
	} else if (type == "dragon") {
		backgroundImg = "ocean";
	} else if (type == "ice") {
		backgroundImg = "snow-forest";
	}

	// @ts-ignore
	POKEMON_BACKGROUND_IMAGE_DOM.style.backgroundImage = `url('./src/images/backgrounds/${backgroundImg}.png')`;
}

function addTypesToListDom(types: []): void {
	if (POKEMON_TYPE_LIST_DOM?.children.length != 0) {
		while (POKEMON_TYPE_LIST_DOM?.firstChild) {
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

		let text = document.createTextNode(
			converter.firstLetterOfStringToUpperCase(typeName)
		);
		listItem.appendChild(text);

		// @ts-ignore
		POKEMON_TYPE_LIST_DOM.appendChild(listItem);
	});
}

function addStatsToTableDom(stats: []): void {
	//  @ts-ignore
	for (let i = 0; i < POKEMON_STATS_DOM.length; i++) {
		// @ts-ignore
		POKEMON_STATS_DOM[i].innerText = stats[i].base_stat;
	}
}

function loadPokemon(pokeapiUrl: string): void {
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

			// changeBackgroundPokemonImage(pokemonTypes.type[0]);
			changeBackgroundPokemonImage(pokemonTypes[0].type.name);

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
document.getElementById("btn-before")?.addEventListener("click", () => {
	playButtonSound();
	eventButtons(1, 150, -1);
});

document.getElementById("btn-next")?.addEventListener("click", () => {
	playButtonSound();
	eventButtons(151, -150, 1);
});
