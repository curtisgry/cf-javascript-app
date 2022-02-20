// Initialize pokemon repository
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

        // Gets pokemon list from IIFE
        function getAll() {
                return pokemonList;
        }

        // Adds item to pokemon list
        function add(item) {
                // Stop if not an object
                if (typeof item !== 'object') {
                        return;
                }
                // Get keys from object and check the correct format exists
                const keys = Object.keys(item);
                if (keys.indexOf('name') !== -1 && keys.indexOf('height') !== -1 && keys.indexOf('types') !== -1) {
                        pokemonList.push(item);
                }
        }

        // Finds item in pokemon list
        function find(name) {
                // Get new array with pokemon name that matches string input
                const result = pokemonList.filter(function (item) {
                        // Check non case sensitive for item with the name input
                        if (item.name.toLowerCase() === name.toLowerCase()) {
                                return true;
                        }
                        return false;
                });
                return result;
        }

        // Shows details of selected pokemon
        function showDetails(pokemon) {
                console.log(pokemon);
        }

        // Adds event listener for pokemon button
        function addButtonEvent(button, pokemon) {
                button.addEventListener('click', function () {
                        showDetails(pokemon);
                });
        }

        // Adds list of buttons to page
        function addListItem(pokemon) {
                // List container
                const listContainer = document.querySelector('.pokemon-list');

                // New elements
                const listItem = document.createElement('li');
                const button = document.createElement('button');

                // Event listener on list buttons for show details
                addButtonEvent(button, pokemon);

                // Set button text and add class
                button.innerText = pokemon.name;
                button.classList.add('button');

                // Append to list
                listItem.append(button);
                listContainer.append(listItem);
        }

        return {
                getAll,
                add,
                find,
                addListItem,
        };
})();

// Make list items on page from current pokemon list
pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
});
