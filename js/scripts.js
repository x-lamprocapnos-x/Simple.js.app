let pokemonList = 
[ //create an array of pokemon objects
    //remember arrays start at 0
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

pokemonList.forEach(function(pokemon) {
    document.write(pokemon.name + '<br>' + pokemon.height + '<br>' + pokemon.type + '<br>')
});
