let allPokemonsData = [];
let currentPokemon;
let showedPokemonlength = 51;

function initiate() {
    renderPokemonCards();
}

/*----------------------------closed PokemonCard-----------------------------------------------------*/
async function renderPokemonCards() {
    let pokemonCardContainer = document.getElementById('pokemonCardContainer');
    pokemonCardContainer.innerHTML = ``;
    for (id = 1; id < showedPokemonlength; id++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemonsData.push(currentPokemon);
        pokemonCardContainer.innerHTML += `
        
    <div class="closedPokemonCard" id="closedPokemonCard${id}" onclick="openPokemonCard(${id})">
    <h1 id="pokemonName"> ${capitalizeFirstLetter()}</h1> 
    <p id="pokemonNumber">#${currentPokemon['id']}</p>
    <p id="pokemonType1">${currentPokemon['types']['0']['type']['name']}</p>
    <p id="pokemonType2">${currentPokemon['types']['0']['type']['name']}</p>
    <img id="pokemonAvatar" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
    </div>`;
        pokemonTypeBackgroundColor(id);
    }
}

function pokemonTypeBackgroundColor(id) {
    let currentPokemonType = currentPokemon['types']['0']['type']['name'];
    let container = document.getElementById(`closedPokemonCard${id}`);
    if (currentPokemonType) {
        container.classList.add(currentPokemonType);
    }
}

function loadMorePokemons() {
    showedPokemonlength += 50;
    initiate();
}

/*----------------------------open PokemonCard-----------------------------------------------------*/

async function openPokemonCard(id) {
    let container = document.getElementById('openedPokemonCard');
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    clickedPokemon = await response.json();

    let details = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    let responseevo = await fetch(details);
    detailsPokemon = await responseevo.json();

    
    let evo = detailsPokemon['evolves_from_species'];

    container.innerHTML = `<div class="backgroundColorOpenCard" onclick="closeOpenedPokemonCard()">
  
     <div class="openMainContainerPokemon" onclick="doNotCloseWhenClickedInsightContainer()">
      <div class="upperSection">
      <h1>${capitalizeFirstLetterOpenCard()}</h1>
      <h1>#${clickedPokemon['id']}</h1>
      <img src="${clickedPokemon['sprites']['other']['official-artwork']['front_default']}">
      </div>

       <div class="lowerSection">

        <div class="pokemonTags">
         <p onclick="showAbout()">About</p>
         <p onclick="showStats()">Stats</p>
         <p onclick="showSkills()">Skills</p>
         <p onclick="showEvolutions()" class="evolutions">Evolutions</p>
        </div>
        <div class="seperator"></div>

        <div class="about" id="about">
        <p>Genera: ${detailsPokemon['genera']['7']['genus']} </p>
        <p>Weight: ${clickedPokemon['weight']} kg (noch durch 10 dividieren)</p>
        <p>Height: ${clickedPokemon['height']} m(angaben noch in dm)</p>
        <p id="evolution">${evo} </p>
        </div>

        <div class="stats d-none" id="stats">
        <canvas id="myChart"></canvas>
        </div>

        <div class="skills d-none" id="skills"></div>

          
        <div class="seperator" id="seperator"></div>
        <div class="containerWithPokemonInfos">
        <p class="about" id="aboutText">${detailsPokemon['flavor_text_entries']['9']['flavor_text']}</p>
      </div></div>
     </div>
    </div>`;
   
    if(evo == null ){
      document.getElementById('evolution').innerHTML = `Evolution from: There is no evolution before!`;
    }else{
        document.getElementById('evolution').innerHTML = `Evolution from: ` + evo['name'].charAt(0).toUpperCase() + evo['name'].slice(1);
    }
    container.classList.remove('d-none');
    bars(id);
    loadMoves(id);
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
/*----------------------------Templates----------------------------------------------------------*/


/*----------------------------Helpfunctions----------------------------------------------------------*/
function capitalizeFirstLetter() {
    return currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
}
function capitalizeFirstLetterOpenCard() {
    return clickedPokemon['name'].charAt(0).toUpperCase() + clickedPokemon['name'].slice(1);
}
function capitalizeFirstLetterOpenCardEvo(evo) {
    return evo.charAt(0).toUpperCase() + evo.slice(1);
}

function showPreviousEvolution(id){
    let evo = detailsPokemon['evolves_from_species']['name'];
    if(evo < 1 ){
      document.getElementById('evolution').innerHTML = `There is no evolution before!`;
    }else{
        capitalizeFirstLetterOpenCardEvo(evo);
    }
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
function showEvolutions() {
    document.getElementById('stats,statsText').classList.remove('d-none')
    document.getElementById('about').classList.add('d-none')
}

function loadMoves(id){
 let container = document.getElementById('skills');

 for(let i = 0 ; i < allPokemonsData[id]['moves'].length; i++){
    container.innerHTML +=`<li class="skillsContainer">${allPokemonsData[id]['moves'][i]['move']['name'].charAt(0).toUpperCase() + allPokemonsData[id]['moves'][i]['move']['name'].slice(1)}</li>`;
 }

}
/*------------------Searchfunction---------------------------------*/

async function searchForPokemon() {
    let search = document.getElementById('searchfield').value;
    search = search.toLowerCase();

    let list = document.getElementById('pokemonCardContainer');
    list.innerHTML = ``;

    for (let index = 0; index < allPokemonsData.length; index++) {
        let id = index + 1;
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let response = await fetch(url);
        let pokemon = await response.json();

        if (pokemon.name.toLowerCase().includes(search) && search.value != 0) {
            list.innerHTML += `
          <div class="closedPokemonCard" id="closedPokemonCard${id}">
            <h1 id="pokemonName">${pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1)}</h1>
            <p id="pokemonNumber">#${pokemon['id']}</p>
            <p id="pokemonType1">${pokemon['types']['0']['type']['name']}</p>
            <p id="pokemonType2">${pokemon['types']['0']['type']['name']}</p>
            <img id="pokemonAvatar" src="${pokemon['sprites']['other']['official-artwork']['front_default']}">
          </div>`;

        }
    }
}



/*------------------Statsbar---------------------------------*/


