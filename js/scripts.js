// Initialize pokemon repository
const pokemonRepository = (function () {
        const pokemonList = [];
        const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
                pokemonList.push(item);
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

        // Shows a loading message on the page
        function showLoadingMessage() {
                const loadMessage = document.createElement('h2');
                loadMessage.classList.add('load-message');
                loadMessage.innerText = 'Loading...';
                const container = document.querySelector('.app');
                container.append(loadMessage);
        }

        // Removes the loading message from the page
        function hideLoadingMessage() {
                const loadMessage = document.querySelector('.load-message');
                loadMessage.remove();
        }

        // Gets more details for single pokemon from API
        function loadDetails(item) {
                showLoadingMessage();
                return fetch(item.detailsUrl)
                        .then(function (response) {
                                return response.json();
                        })
                        .then(function (details) {
                                item.imageUrl = details.sprites.front_default;
                                item.height = details.height;
                                item.types = details.types;
                                hideLoadingMessage();
                        })
                        .catch(function (e) {
                                hideLoadingMessage();
                                console.error(e);
                        });
        }

        // Logs details for a pokemon
        function showDetails(pokemon) {
                loadDetails(pokemon).then(function () {
                        console.log(pokemon);
                });
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

        // Loads list of 150 pokemon
        function loadList() {
                showLoadingMessage();
                return fetch(apiUrl)
                        .then(function (response) {
                                return response.json();
                        })
                        .then(function (json) {
                                hideLoadingMessage();
                                json.results.forEach(function (item) {
                                        const pokemon = {
                                                name: item.name,
                                                detailsUrl: item.url,
                                        };
                                        add(pokemon);
                                });
                        })
                        .catch(function (e) {
                                hideLoadingMessage();
                                console.error(e);
                        });
        }

        return {
                getAll,
                add,
                find,
                addListItem,
                loadList,
                loadDetails,
        };
})();

pokemonRepository.loadList().then(function () {
        pokemonRepository.getAll().forEach(function (pokemon) {
                pokemonRepository.addListItem(pokemon);
        });
});
