"use strict";

class Converter {
	public firstLetterOfStringToUpperCase(pokemonName: string): string {
		let name: string = pokemonName[0].toUpperCase();
		name += pokemonName.slice(1, pokemonName.length).toLowerCase();
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
			// @ts-ignore
			POKEMON_NAME_DOM.innerText = converter.firstLetterOfStringToUpperCase(
				response.name
			);
			// @ts-ignore
			POKEMON_ID_DOM.innerText = converter.pokemonAddZerosAndHashtagToId(
				response.id
			);
			// @ts-ignore
			POKEMON_IMAGE.setAttribute(
				"src",
				response.sprites.other.dream_world.front_default
			);
			addTypesToListDom(response.types);
		})
		.catch((error) => {
			console.error(error);
		});
}

// @ts-ignore
document.addEventListener("onload", loadPokemon());
