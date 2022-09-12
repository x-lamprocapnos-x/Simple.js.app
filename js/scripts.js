let pokemonRepository = (function () {
    let pokemonList = 
    [ //array of pokemon
        {
        name: 'Charmander',
        height: 0.6,
        type: ['fire']
        },
        {
        name: 'Cubone',
        height: 0.4,
        type: ['ground']
        },
        {
        name: 'Psyduck',
        height: 0.8,
        type: ['water']
        },
        {
        name: 'Sandshrew',
        height: 0.6,
        type: ['ground']
        },
        {
        name: 'Celebi',
        height: 0.6,
        type: ['psychic', 'grass']
        }
    ];
//seperate add function
  function add(pokemon){
    if(typeof pokemon === "object" && "name"){
    pokemonList.push(pokemon);
    } else {
        console.log('pokemon is not correct')
    }

  }
//seperate getAll function
  function getAll(){
    return pokemonList;
  }
//return function
  return {
    add:add,
    getAll:getAll
  };
    
  })();
  console.log(pokemonRepository.getAll()); //get pokemonList array
pokemonRepository.add({ name: 'Furret', height: 1.8, type:'normal' }); //add pokemon 'furret"
console.log(pokemonRepository.getAll()); //get pokemonList array

//forEach fuction penetrating into IIFE to display pokemon
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(pokemon.name + ' ' + pokemon.height + ' ' + pokemon.type + '<br>')
});