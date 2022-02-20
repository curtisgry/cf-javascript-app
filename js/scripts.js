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
pokemonList.forEach(function (item) {
        // Check for height over 0.6 to display additional text
        const specialText = item.height > 0.6 ? 'Wow thats big!' : '';
        // Write to page
        document.write(`<p>${item.name} (height: ${item.height}) <span>${specialText}</span></p>`);
});
