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
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('button-class');
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
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			item.types = details.types;
		}).catch(function (e) {
			console.error(e);
		})
	};
	//showMore function
	function showDetails(item) {
		pokemonRepository.loadDetails(item).then(function () {
			//console.log(item)
			showModal(item)
	});
	};
	//showModal function
	function showModal(item){
		let modalContainer = document.querySelector('.modal-container');
		modalContainer.innerText = '';
		// create modal
		let modal = document.createElement('div');
		modal.classList.add('modal');
		//modal title (pokemon name)
		let title = document.createElement('h1');
		title.innerText = item.name;
		// modal content (pokemon heigt)
		let height = document.createElement('p');
		height.innerText = 'Height is' + item.height;
		// modal content pokemon image
		let image = document.createElement('img');
		image.src = item.imageUrl
		//append all children to modal container
		modal.appendChild(title);
		modal.appendChild(height);
		modal.appendChild(image);
		modalContainer.appendChild(modal);
	}
	//return function
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails
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