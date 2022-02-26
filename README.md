# Pokedex

A web application to see information about Pokemon.

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

This application was made using the fetch API to get the necessary information from https://pokeapi.co into the list displayed on the page. It is a list of buttons that when clicked will show you some details about that Pokemon. The list can be filtered with the search box to find specific Pokemon.

### What it does

Users are able to:

- See a list of 150 Pokemon in one page on all screen sizes.
- Click on a Pokemon to see some basic information and a picture of that Pokemon.
- Filter the list with the search box in the nav bar to find specific Pokemon.

### Screenshots

![](screenshots/screenshot1.jpg)
![](screenshots/screenshot2.jpg)

### Links

-GitHub Repo [Here](https://github.com/curtisgry/cf-javascript-app)

- Live Site URL: [Here](https://curtisgry.github.io/cf-javascript-app/)

### Built with

- Semantic HTML5 markup
- CSS
- Bootstrap
- Javascript
- ES6
- Fetch API

### What I learned

During this project I learned a method for filtering an array with any letters a user types into an input using a regular expression and the .match method.

```js
// Finds item in pokemon list
function find(name) {
  // Get new array with pokemon name that matches string input
  if (!name) return;
  const regex = new RegExp(name, "gi");
  const result = pokemonList.filter(function (item) {
    // Check for match with regex for search
    if (item.name.match(regex)) {
      return true;
    }
    return false;
  });
  return result;
}
```

### Continued development

In future projects I hope to focus on and learn more about the array methods in ES6 to be able to better access their usefulness when making applications.

## Author

- Website - [Curtis Gray](https://curtisgry.github.io/portfolio-website/)
