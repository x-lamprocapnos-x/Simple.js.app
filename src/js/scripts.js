//IIFE wrap
let pokemonRepository = (function () {
	//pokemonArray list
	let pokemonArray = [];
	//pokemon api link
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';

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
	}
	//getAll function
	function getAll() {
		return pokemonArray;
	}
	// adds pokemon into list items and enables pokemon buttons to listen to event
	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.list-group');
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
	}
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
	}
	//loadDetails function for pokemon
	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
			//add item details (image, height,weight, type, and ability)
			item.imageUrlFront = details.sprites.front_default;
			item.imageUrlback = details.sprites.back_default;
			item.height = details.height;
			item.weight = details.weight;
			item.types = details.types;
			item.abilities = details.abilities;
		}).catch(function (e) {
			console.error(e);
		});

	}
	//showMore function
	function showDetails(pokemon) {
		pokemonRepository.loadDetails(pokemon).then(function () {
			console.log(pokemon);
			showModal(pokemon);
		});
	}
	//showModal function
	function showModal(pokemon) {
		let modal = $('.modal');
		let modalBody = $('.modal-body');
		let modalTitle = $('.modal-title');
		modalTitle.empty();
		modalBody.empty();
		// create modal
		let nameElement = $('<h1>' + pokemon.name + '</h1>');
		let imageElementFront = $('<img class="modal-img" width= "55%">');
		imageElementFront.attr('src', pokemon.imageUrlFront);
		let imageElementBack = $('<img class="modal-img" width= "45%">')
		imageElementBack.attr('src', pokemon.imageUrlback);
		let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
		let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
		let typeArray = [];
		pokemon.types.forEach(item => typeArray.push(item.type.name))
		let typeElement = $('<p>' + 'Pokemon type(s): ' + typeArray.join(', ') + '</p>');
		let abilityArray = [];
		pokemon.abilities.forEach(item => abilityArray.push(item.ability.name))
		let abilityElement = $('<p>' + 'Abilities: ' + abilityArray.join(', ') + '</p>')
		let questionElement = $('<p>' + 'Can you catch me?' + '</p>');
		//append modal children
		modalTitle.append(nameElement);
		modalBody.append(imageElementFront);
		modalBody.append(imageElementBack);
		modalBody.append(heightElement);
		modalBody.append(weightElement);
		modalBody.append(typeElement);
		modalBody.append(abilityElement);
		modalBody.append(questionElement);
		modal.addClass('show');
	}
	//closeModal event listeners
	$('.close').click(closeModal);
	//close modal function
	function closeModal() {
		$('.modal').removeClass('show');
	}
	//searchBar function
	document.querySelector('#searchBar').addEventListener('input', searchHandler)
	function searchHandler(e){ 
		let pokemon=document.querySelectorAll('.pokemon-list li')
		for(let i=0; i<pokemon.length; i++){
			if(pokemon[i].querySelector('button').innerText.includes(e.target.value)){
				//make these pokemon visible
				pokemon[i].classList.remove('hide-pokemon')
			} else {
				//make these pokemon invisible
				pokemon[i].classList.add('hide-pokemon')
			}
		}
	}
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
//console log pokemon list
console.log(pokemonRepository.getAll()); //get pokemonList array

//forEach fuction penetrating into IIFE to display pokemon
pokemonRepository.loadList().then(function () {
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});