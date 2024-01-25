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
		return weightInKg + " Kg";
	}

	public formatPokemonHeight(height: number): string {
		let heightInM: number = height / 10;
		return heightInM + " m";
	}
}

let pokemonId: number = 1;
let pokeapiUrl: string = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

const POKEMON_IMAGE: HTMLElement | null =
	document.getElementById("pokemon-image");

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

const converter: Converter = new Converter();

function modifyPokeApiUrl(step: number) {
	pokemonId += step;
	pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
}

function addTypesToListDom(types: []) {
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

function loadPokemon() {
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
		})
		.catch((error) => {
			console.error(error);
		});
}

// @ts-ignore
document.addEventListener("onload", loadPokemon());
