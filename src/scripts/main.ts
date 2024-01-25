"use strict";

let pokemonId: number = 1;
let pokeapiUrl: string = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

const POKEMON_IMAGE: HTMLElement | null =
	document.getElementById("pokemon-image");

const POKEMON_NAME_DOM: HTMLElement | null =
	document.getElementById("pokemon-name");

const POKEMON_ID_DOM: HTMLElement | null =
	document.getElementById("pokemon-id");

class Converter {
	public pokemonNameFirstLetterToUpperCase(pokemonName: string): string {
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

function modifyPokeApiUrl(step: number) {
	pokemonId += step;
	pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
}

function loadPokemon() {
	fetch(pokeapiUrl)
		.then((response) => response.json())
		.then((response) => {
			const converter: Converter = new Converter();
			POKEMON_NAME_DOM.innerText = converter.pokemonNameFirstLetterToUpperCase(
				response.name
			);
			POKEMON_ID_DOM.innerText = converter.pokemonAddZerosAndHashtagToId(
				response.id
			);
			POKEMON_IMAGE.setAttribute(
				"src",
				response.sprites.other.dream_world.front_default
			);
		})
		.catch((error) => {
			console.error(error);
		});
}

document.addEventListener("onload", loadPokemon());
