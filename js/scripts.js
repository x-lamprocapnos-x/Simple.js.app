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

for (let i=0; i < pokemonList.length; i++) //loop around pokemonList array
{
    if (pokemonList[i].height > 0.7) {
    document.write (`${pokemonList[i].name} height ${pokemonList[i].height} Woah, thats huge!<br>`); 
    } 
     else {
        document.write (`${pokemonList[i].name} height ${pokemonList[i].height}<br>`);
    }
}