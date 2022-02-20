const pokemonRepository = (function () {
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

        function getAll() {
                return pokemonList;
        }

        function add(item) {
                pokemonList.push(item);
        }

        return {
                getAll,
                add,
        };
})();

// Get list from within IIFE and display info from all pokemon in list
pokemonRepository.getAll().forEach(function (item) {
        // Check for height over 0.6 to display additional text
        const specialText = item.height > 0.6 ? 'Wow thats big!' : '';
        // Write to page
        document.write(`<p>${item.name} (height: ${item.height}) <span>${specialText}</span></p>`);
});
