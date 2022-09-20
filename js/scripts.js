//IIFE wrap
let pokemonRepository = (function () {
	let pokemonArray = [];
	// add function
	function add(pokemon) {
		if (typeof pokemon === 'object' &&
			'name' in pokemon &&
			'height' in pokemon &&
			'type' in pokemon) { pokemonArray.push(pokemon); }
		else { console.log('pokemon is not correct') }

	};
	//getAll function
	function getAll() {
		return pokemonArray;
	};
	// adds pokemon into list items and enables pokemon buttons to listen to event
	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');
		let listPokemon = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('button-class');
		listPokemon.appendChild(button);
		pokemonList.appendChild(listPokemon);
		button.addEventListener('click', () => {
			showDetails(pokemon);
		});
	};
	//showMore function
	function showDetails(pokemon) {
		console.log(pokemon.name)
	};
	//return function
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem
	};
})();
//IIFE wrap end
console.log(pokemonRepository.getAll()); //get pokemonList array
pokemonRepository.add({ name: 'Furret', height: 1.8, type: ['normal'] }); //add pokemon 'furret"
console.log(pokemonRepository.getAll()); //get pokemonArray

//forEach fuction penetrating into IIFE to display pokemon
pokemonRepository.getAll().forEach(function (pokemon) {
	pokemonRepository.addListItem(pokemon);
});
