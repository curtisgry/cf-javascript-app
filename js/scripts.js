// Initialize pokemon repository
const pokemonRepository = (function () {
        const pokemonList = [];
        const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

        // Modal container div
        const modalContainer = document.querySelector('#modal-container');

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

        // ********MODAL**********
        function hideModal() {
                modalContainer.classList.remove('is-visible');
        }

        function showModal(title, text, imgSrc) {
                // Clear modal content
                modalContainer.innerHTML = '';

                // Create modal elements
                const modal = document.createElement('div');
                const modalTitle = document.createElement('h2');
                const modalText = document.createElement('p');
                const modalImage = document.createElement('img');
                const modalClose = document.createElement('button');

                // Set classes
                modal.classList.add('modal');
                modalTitle.classList.add('modal-title');
                modalText.classList.add('modal-text');
                modalImage.classList.add('modal-image');
                modalClose.classList.add('modal-close');

                // Add content
                modalTitle.innerText = title || '';
                modalText.innerText = text || '';
                modalClose.innerText = 'Close';
                modalImage.setAttribute('src', imgSrc);

                // Close event listener
                modalClose.addEventListener('click', hideModal);

                // Add elements t0 modal
                modal.appendChild(modalClose);
                modal.appendChild(modalTitle);
                modal.appendChild(modalText);
                modal.appendChild(modalImage);

                // Add modal to container
                modalContainer.appendChild(modal);

                modalContainer.classList.add('is-visible');
        }

        // Click outside to close
        modalContainer.addEventListener('click', function (e) {
                if (e.target === modalContainer) {
                        hideModal();
                }
        });

        // Esc key to close
        window.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                        hideModal();
                }
        });

        // ********MODAL**********

        // Loads in details for a pokemon and shows modal
        function showDetails(pokemon) {
                loadDetails(pokemon).then(function () {
                        const { name, imageUrl, types, height } = pokemon;
                        const typesList = types.map((item) => item.type.name).join(', ');
                        const textContent = `
                            Height - ${height}. Type - ${typesList}.
                        `;
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
                                        // Create pokemon object from data
                                        const pokemon = {
                                                name: upperCaseFirstLetter(item.name),
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
