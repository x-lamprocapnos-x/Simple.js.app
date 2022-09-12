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
//forEach fuction allowing pokemon list to be displayed
pokemonList.forEach(function(pokemon) {
    document.write(pokemon.name + '<br>' + pokemon.height + '<br>' + pokemon.type + '<br>')
});
  
    return {
      add: function(pokemon) {
        pokemonList.push(pokemon);
      },
      getAll: function() {
        return pokemonList;
      }
    };
  })();
  console.log(pokemonRepository.getAll()); //get pokemonList array
pokemonRepository.add({ name: 'Furret', height: 1.8, type:'normal' }); //add pokemon 'furret"
console.log(pokemonRepository.getAll()); //get pokemonList array
