
let allPokemonsData = [];
let showedPokemonlength = 52;

function initiate() {
    fetchDatas();
}

/*----------------------------closed PokemonCard-----------------------------------------------------*/

/**
 * Fetch every needed data from the API and push it into an array named allPokemonsData.
 */
async function fetchDatas() {
    let pokemonCardContainer = document.getElementById('pokemonCardContainer');
    pokemonCardContainer.innerHTML = ``;
    for (id = 1; id < showedPokemonlength; id++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemonsData.push(currentPokemon);
        renderPokemonCards(id, currentPokemon);
    }
}

/**
 * Render into the HTML-Element and display them.
 */
function renderPokemonCards(id, currentPokemon) {
    if (id < showedPokemonlength - 1) {
        pokemonCardContainer.innerHTML +=
            `${closedPokemonCardTemplate(id, currentPokemon)}`;
        pokemonTypeBackgroundColor(id);
    }
}

/**
 * After klick on a button, it will load and show 30 more pokemons. 
 */
function loadMorePokemons() {
    showedPokemonlength += 30;
    initiate();
}
/*----------------------------closed PokemonCard->Helpfunctions------------------------------*/

/**
 * Show on the right top from the card the pokemonId. Depens on the value it will add 0 before #.
 */
function pokemonIdNumberShow(currentPokemon) {
    let number = currentPokemon['id'];
    if (number < 10) {
        return `#00${number}`;
    } else if (number < 100) {
        return `#0${number}`;
    } else {
        return `#${number}`;
    }
}

/**
 * Change the background from the card in to the type of the pokemon.
 */
function pokemonTypeBackgroundColor(id) {
    let currentPokemonType = currentPokemon['types']['0']['type']['name'];
    let container = document.getElementById(`closedPokemonCard${id}`);
    if (currentPokemonType) {
        container.classList.add(currentPokemonType);
    }
}

function nameOfThePokemon() {
    return currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
}


/*----------------------------open PokemonCard-----------------------------------------------------*/

/**
 * Open an new card with more details from the selected pokemon. Which includes the evolution before, stats, skills and more.
 * @param {number} id -> Needed to load the right dataset for the selected pokemon.
 */
async function openPokemonCard(id) {
    let container = document.getElementById('openedPokemonCard');
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    clickedPokemon = await response.json();

    let details = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    let responsedetails = await fetch(details);
    detailsPokemon = await responsedetails.json();

    let evo = detailsPokemon['evolves_from_species'];

    container.innerHTML = `${openPokemonCardTemplate(clickedPokemon, detailsPokemon, evo)}`;

    checkTheEvolutions(evo, id);
    bars(id);
    showAndloadMoves(id);
    container.classList.remove('d-none');
}

function showAndloadMoves(id) {
    let container = document.getElementById('skills');

    for (let i = 0; i < allPokemonsData[id]['moves'].length; i++) {
        container.innerHTML += `<li class="skillsContainer">${allPokemonsData[id]['moves'][i]['move']['name'].charAt(0).toUpperCase() + allPokemonsData[id]['moves'][i]['move']['name'].slice(1)}</li>`;
    }
}

function checkTheEvolutions(evo, id) {
    newid = id - 2;
    if (evo == null) {
        document.getElementById('evolution').innerHTML = `Evolution from: There is no evolution before!`;

    } else {
        document.getElementById('evolution').innerHTML = `Evolution from: ` + evo['name'].charAt(0).toUpperCase() + evo['name'].slice(1);
    }
}


/*------------------Searchfunction---------------------------------*/

async function searchForPokemon() {
    let searchvalue = document.getElementById('searchfield').value;
    search = searchvalue.toLowerCase();

    let list = document.getElementById('pokemonCardContainer');
    list.innerHTML = ``;
    let foundPokemon = false; // Eine Variable, um festzuhalten, ob ein Pokémon gefunden wurde

    for (let index = 0; index < allPokemonsData.length; index++) {
        let id = index;
        let results = allPokemonsData[id];
        if (results.name.toLowerCase().includes(search)) {
            list.innerHTML += `
          ${searchFunctionTemplate(results, id)}`;
            document.getElementById(`closedPokemonCard${id}`).classList.add(`${results['types']['0']['type']['name']}`);
            foundPokemon = true; // Ein Pokémon wurde gefunden
        }
    }

    if (!foundPokemon) {
        list.innerHTML = "There is no Pokémon with the name " + searchvalue;
    }
}

/**
 * Get the searched data for the template which get initiated by the "searchFunctionTemplate()" function.
 * @param {string} results -> Displayed pokemon types (fire,poison,...)
 */
function pokemonTypesSearchfield(results) {
    if (results['types']['0'] && results['types']['1']) {
        return `<p class="pokemonType">${results['types']['0']['type']['name'].charAt(0).toUpperCase() + results['types']['0']['type']['name'].slice(1)}</p>
    <p class="pokemonType">${results['types']['1']['type']['name'].charAt(0).toUpperCase() + results['types']['1']['type']['name'].slice(1)}</p>`;
    } else {
        return `<p class="pokemonType">${results['types']['0']['type']['name'].charAt(0).toUpperCase() + results['types']['0']['type']['name'].slice(1)}</p>`;
    }

}

/**
 * Get the searched data for the template which get initiated by the "searchFunctionTemplate()" function.
 * @param {string} results -> Number from the selected pokemon.
 */
function pokemonIdNumberShowSearchfield(results) {
    let number = results['id'];
    if (number < 10) {
        return `#00${number}`;
    } else if (number < 100) {
        return `#0${number}`;
    } else {
        return `#${number}`;
    }
}

/*------------------------Change-Placeholdertext----------------------------------*/

window.addEventListener('resize', function () {
    let searchfield = document.getElementById('searchfield');
    if (window.innerWidth <= 450) {
        searchfield.setAttribute('placeholder', 'Pokemon name...');
    } else {
        searchfield.setAttribute('placeholder', 'Search Pokemon by name...');
    }
});


/*----------------------------Helpfunctions----------------------------------------------------------*/

function capitalizeFirstLetterOpenCard() {
    return clickedPokemon['name'].charAt(0).toUpperCase() + clickedPokemon['name'].slice(1);
}
function capitalizeFirstLetterOpenCardEvo(evo) {
    return evo.charAt(0).toUpperCase() + evo.slice(1);
}

function showAbout() {
    document.getElementById('about').classList.remove('d-none')
    document.getElementById('aboutText').classList.remove('d-none')
    document.getElementById('stats').classList.add('d-none')
    document.getElementById('skills').classList.add('d-none')
    document.getElementById('seperator').classList.remove('d-none')
}
function showStats() {
    document.getElementById('about').classList.add('d-none')
    document.getElementById('aboutText').classList.add('d-none')
    document.getElementById('stats').classList.remove('d-none')
    document.getElementById('skills').classList.add('d-none')
    document.getElementById('seperator').classList.add('d-none')
}
function showSkills() {
    document.getElementById('about').classList.add('d-none')
    document.getElementById('aboutText').classList.add('d-none')
    document.getElementById('stats').classList.add('d-none')
    document.getElementById('skills').classList.remove('d-none')
    document.getElementById('seperator').classList.add('d-none')
}


function closeOpenedPokemonCard() {
    let container = document.getElementById('openedPokemonCard');
    container.classList.add('d-none');
    document.getElementById('about').classList.remove('d-none');
    document.getElementById('aboutText').classList.remove('d-none');
    document.getElementById('stats').classList.add('d-none');
    document.getElementById('skills').classList.add('d-none')
}

function doNotCloseWhenClickedInsightContainer() {
    event.stopPropagation();
}
