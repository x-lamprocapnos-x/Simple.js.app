//IIFE wrap
let pokemonRepository = (function () {
	//pokemonArray list
	let pokemonArray = [];
	//pokemon api link
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	// add function
	function add(pokemon) {
		if (typeof pokemon === 'object' &&
			'name' in pokemon &&
			'detailsUrl' in pokemon
		) {
			pokemonArray.push(pokemon);
		} else {
			console.log('pokemon is not correct');
		}
	};
	//getAll function
	function getAll() {
		return pokemonArray;
	};
	// adds pokemon into list items and enables pokemon buttons to listen to event
	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');
		let listPokemon = document.createElement('li');
		listPokemon.classList.add('group-list-item');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('btn');
		listPokemon.appendChild(button);
		pokemonList.appendChild(listPokemon);
		button.addEventListener('click', () => {
			showDetails(pokemon);
		});
	};
	//function loadlist for apiUrl
	function loadList() {
		return fetch(apiUrl).then(function (response) {
			return response.json();
		}).then(function (json) {
			json.results.forEach(function (item) {
				let pokemon = {
					name: item.name,
					detailsUrl: item.url
				};
				add(pokemon);
			});
		}).catch(function (e) {
			console.error(e);
		})
	};
	//loadDetails function for pokemon
	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
			//add item details (image, height, type)
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			item.weight = details.weight;
			item.types = details.types;
		}).catch(function (e) {
			console.error(e);
		});
	};
	//showMore function
	function showDetails(pokemon) {
		pokemonRepository.loadDetails(pokemon).then(function () {
			//console.log(pokemon);
			showModal(pokemon);
	});
	};
	//showModal function
	function showModal(pokemon){
		let modalBody = $('.modal-body');
		let modalTitle = $('.modal-title');
		let modalHeader = $('.modal-header');
		//let modalContainer = document.querySelector('#modal-container');
		//modalContainer.innerText = '';
		modalTitle.empty();
		modalBody.empty();
		// create modal
		let nameElement = $('<h1>' + pokemon.name + '</h1>');
		let imageElement = $('<img class="modal-img" style="width:50%>');
			imageElement.attr('src', pokemon.imageUrl);
		let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
		let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
		let typeElement = $('<p>' + 'pokemon type(s): ' + pokemon.types + '</p>');
		//append modal children
		modalTitle.append(nameElement);
		modalBody.append(imageElement);
		modalBody.append(heightElement);
		modalBody.append(weightElement);
		modalBody.append(typeElement);

	};
	//return function
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails,
		showModal: showModal,
	};
})();
//IIFE wrap end

console.log(pokemonRepository.getAll()); //get pokemonList array
pokemonRepository.add({ name: 'Furret', height: 1.8, type: ['normal'] }); //add pokemon 'furret"
console.log(pokemonRepository.getAll()); //get pokemonArray

//forEach fuction penetrating into IIFE to display pokemon
pokemonRepository.loadList().then(function () {
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});