// Initialize pokemon repository
const pokemonRepository = (function () {
        let pokemonList = [];
        const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

        // Search input
        const searchInput = document.querySelector('input')

        searchInput.addEventListener('input', (e) => {
                const listContainer = document.querySelector('.pokemon-list');
                if(!e.target.value) {
                        listContainer.innerHTML = '';
                        pokemonList.forEach(function(pokemon){
                                addListItem(pokemon)
                        })
                        return;
                }
                const newList = find(e.target.value)
             
                listContainer.innerHTML = '';
     
                newList.forEach(function (item) {
                        addListItem(item)
                })
        })

        // Modal bootstrap elements
        const modalContainer = document.querySelector('.modal-content')
        const modalTitle = document.querySelector('.modal-title');
        const modalDetailHeight = document.querySelector('#height');
        const modalDetailType = document.querySelector('#type');
        const modalImage = document.querySelector('.img-thumbnail');

        // ****Utility functions****
        function upperCaseFirstLetter(str) {
                const arr = str.split('');
                arr[0] = arr[0].toUpperCase();
                return arr.join('');
        }
        // ****Utility functions****

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
                if(!name) return;
                const result = pokemonList.filter(function (item) {
                        // Check non case sensitive for item with the name input
                        if (item.name.includes(upperCaseFirstLetter(name))) {
                                return true;
                        }
                        return false;
                });
                return result;
        }

        // Shows a loading message on the page
        function showLoadingMessage(element) {
                const loadMessage = document.createElement('h2');
                loadMessage.classList.add('load-message');
                loadMessage.innerText = 'Loading...';
                element.appendChild(loadMessage);
        }

        // Removes the loading message from the page
        function hideLoadingMessage() {
                const loadMessage = document.querySelector('.load-message');
                loadMessage.remove();
        }

        // Gets more details for single pokemon from API
        function loadDetails(item) {
                showLoadingMessage(modalContainer);
                return fetch(item.detailsUrl)
                        .then(function (response) {
                                hideLoadingMessage()
                                return response.json();
                        })
                        .then(function (details) {
                                item.imageUrl = details.sprites.front_default;
                                item.height = details.height;
                                item.types = details.types;
                        })
                        .catch(function (e) {
                                console.error(e);
                        });
        }

        // ********MODAL**********

        function showModal(title, text, imgSrc) {
                // Clear modal content
                modalTitle.innerText = '';
                modalDetailHeight.innerText = '';
                modalDetailType.innerText = '';

                // Add content
                modalTitle.innerText = title || '';
                modalDetailHeight.innerText = text.height || '';
                modalDetailType.innerText = text.types || '';
                modalImage.setAttribute('src', imgSrc);
        }

        // ********MODAL**********

        // Loads in details for a pokemon and shows modal
        function showDetails(pokemon) {
                modalTitle.innerText = '';
                modalDetailHeight.innerText = '';
                modalDetailType.innerText = '';
                modalImage.setAttribute('src', '');
                
                loadDetails(pokemon).then(function () {
                       
                        const { name, imageUrl, types, height } = pokemon;
                        const typesList = types.map((item) => upperCaseFirstLetter(item.type.name)).join(', ');
                        const textContent = {
                                height: `Height - ${height}`,
                                types: `Type - ${typesList}`
                        }
                        showModal(name, textContent, imageUrl);
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
                button.setAttribute('data-toggle', 'modal');
                button.setAttribute('data-target', '#infoModal');
                listItem.classList.add('list-group-item', 'col-2');

                // Event listener on list buttons for show details
                addButtonEvent(button, pokemon);

                // Set button text and add class
                button.innerText = pokemon.name;
                button.classList.add('button', 'btn');

                // Append to list
                listItem.append(button);
                listContainer.append(listItem);
        }

        // Loads list of 150 pokemon
        function loadList() {
                return fetch(apiUrl)
                        .then(function (response) {
                                return response.json();
                        })
                        .then(function (json) {
                                json.results.forEach(function (item) {
                                        // Create pokemon object from data
                                        const pokemon = {
                                                name: upperCaseFirstLetter(item.name),
                                                detailsUrl: item.url,
                                        };
                                        add(pokemon);
                                });
                        })
                        .catch(function (e) {
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
