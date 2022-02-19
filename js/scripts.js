const pokemonList = [
        {
                name: 'Bulbasaur',
                height: 0.7,
                types: ['grass', 'poison'],
        },
        {
                name: 'Charmander',
                height: 0.6,
                types: ['fire'],
        },
        {
                name: 'Squirtle',
                height: 0.5,
                types: ['water'],
        },
];

// Display info from all pokemon in list
for (let i = 0; i < pokemonList.length; i++) {
        // Additional text for height over 0.6
        const specialText = pokemonList[i].height > 0.6 ? ' Wow thats big!' : '';
        // Write to page
        document.write(`<p>${pokemonList[i].name} (height:${pokemonList[i].height})<span>${specialText}</span></p>`);
}
