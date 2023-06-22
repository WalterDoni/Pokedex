let allPokemonsData = [];
let showedPokemonlength = 52;

function initiate() {
    fetchDatas();
}


/*----------------------------closed PokemonCard-----------------------------------------------------*/

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

function renderPokemonCards(id, currentPokemon){
    if( id < showedPokemonlength-1){
        pokemonCardContainer.innerHTML +=
        `${closedPokemonCardTemplate(id, currentPokemon,)}`;
    pokemonTypeBackgroundColor(id);
    }
}
/*----------------------------closed PokemonCard->Templates and Helpfunctions------------------------------*/
function closedPokemonCardTemplate(id, currentPokemon) {
    return `<div class="closedPokemonCard " id="closedPokemonCard${id}" onclick="openPokemonCard(${id})">
    <h1 id="pokemonName" class="pokemonName"> ${capitalizeFirstLetter()}</h1> 
    <p id="pokemonNumber">${pokemonIdNumberShow(currentPokemon)}</p>
    <p id="pokemonType">${pokemonTypes(currentPokemon)}</p>
    <img id="pokemonAvatar" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
    </div>`
  
}

function pokemonTypes(currentPokemon){
    let types  = currentPokemon['types'];
   if (types['0'] && types['1'] ){
    return `<p class="pokemonType">${types['0']['type']['name'].charAt(0).toUpperCase() + types['0']['type']['name'].slice(1)}</p>
    <p class="pokemonType">${types['1']['type']['name'].charAt(0).toUpperCase() + types['1']['type']['name'].slice(1)}</p>`;
   }else {
    return `<p class="pokemonType">${types['0']['type']['name'].charAt(0).toUpperCase() + types['0']['type']['name'].slice(1)}</p>`;
   }
}

function pokemonIdNumberShow(currentPokemon){
    let number = currentPokemon['id'];
    if (number < 10) {
        return `#00${number}`;
      } else if (number < 100) {
        return `#0${number}`;
      } else {
        return `#${number}`;
      }
}

function pokemonTypeBackgroundColor(id) {
    let currentPokemonType = currentPokemon['types']['0']['type']['name'];
    let container = document.getElementById(`closedPokemonCard${id}`);
    if (currentPokemonType) {
        container.classList.add(currentPokemonType);
    }
}

function capitalizeFirstLetter() {
    return currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
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
    let responsedetails = await fetch(details);
    detailsPokemon = await responsedetails.json();

    let evo = detailsPokemon['evolves_from_species'];

    container.innerHTML = `<div class="backgroundColorOpenCard" onclick="closeOpenedPokemonCard()">
     <div class="openMainContainerPokemon" onclick="doNotCloseWhenClickedInsightContainer()">
      <div class="upperSection">
      ${loadUpperSectionFromOpenedCard(clickedPokemon)}
      </div>
      <div class="lowerSection">
      ${loadTagsInLowerSectionOpenedCard()}
      <div class="seperator"></div>
      <div class="about" id="about">
     ${showAboutThePokemon(detailsPokemon, clickedPokemon, evo)}
      </div>
      ${showStatsOpenCard()}

        <div class="skills d-none" id="skills"></div>

          
        <div class="seperator" id="seperator"></div>
        <div class="containerWithPokemonInfos">
        <p class="about" id="aboutText">${detailsPokemon['flavor_text_entries']['9']['flavor_text']}</p>
        
      </div></div>
     </div>
    </div>`;
    
    checkTheEvolutions(evo, id);
    bars(id);
    showAndloadMoves(id);
    container.classList.remove('d-none');
}


/*--clickedPokemon['sprites']['versions']['generation-v']['black-white']['animated'].front_default--*/ 
/*----------------------------Templates----------------------------------------------------------*/

function loadUpperSectionFromOpenedCard(clickedPokemon){
    return ` <h1>${capitalizeFirstLetterOpenCard()}</h1>
    <h1 class="pokemonName">#${clickedPokemon['id']}</h1>
    <img src="${clickedPokemon['sprites']['other']['official-artwork']['front_default']}">
    `
}
function loadTagsInLowerSectionOpenedCard(){
    return ` <div class="pokemonTags">
    <p onclick="showAbout()">About</p>
    <p onclick="showStats()">Stats</p>
    <p onclick="showSkills()">Skills</p>
   </div>`
}
function showStatsOpenCard(){
return `<div class="stats d-none" id="stats">
<canvas id="myChart"></canvas>
</div>`
}

function showAboutThePokemon(detailsPokemon, clickedPokemon, evo, id) {
    return `<p>Genera: ${detailsPokemon['genera']['7']['genus']} </p>
    <p>Weight: ${clickedPokemon['weight'] / 10} kg</p>
    <p>Height: ${clickedPokemon['height'] / 10} m</p>
    <p id="evolution">${evo} </p>`
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


/*------------------Searchfunction---------------------------------*/

async function searchForPokemon() {
    let search = document.getElementById('searchfield').value;
    search = search.toLowerCase();

    let list = document.getElementById('pokemonCardContainer');
    list.innerHTML = ``;

    for (let index = 0; index < allPokemonsData.length; index++) {
        let id = index  ;
        let results = allPokemonsData[id];
      

        if (results.name.toLowerCase().includes(search) && search.value != 0) {
            list.innerHTML += `
          <div class="closedPokemonCard " id="closedPokemonCard${id}" onclick="openPokemonCard(${id}+1)">
            <h1 id="pokemonName" class="pokemonName"> ${results['name'].charAt(0).toUpperCase() + results['name'].slice(1)}</h1>
            <p id="pokemonNumber">${pokemonIdNumberShow(results)}</p>
            <p class="pokemonTypes">${pokemonTypesSearchfield(results)}</p>
            <img id="pokemonAvatar" src="${results['sprites']['other']['official-artwork']['front_default']}">
          </div>`;
          
          document.getElementById(`closedPokemonCard${id}`).classList.add(`${results['types']['0']['type']['name']}`)
        } 
    }
}



function pokemonTypesSearchfield(results){
   if (results['types']['0'] && results['types']['1'] ){
    return `<p class="pokemonType">${results['types']['0']['type']['name'].charAt(0).toUpperCase()+ results['types']['0']['type']['name'].slice(1)}</p>
    <p class="pokemonType">${results['types']['1']['type']['name'].charAt(0).toUpperCase()+ results['types']['1']['type']['name'].slice(1)}</p>`;
   }else {
    return `<p class="pokemonType">${results['types']['0']['type']['name'].charAt(0).toUpperCase() + results['types']['0']['type']['name'].slice(1)}</p>`;
   }
   
}

function pokemonIdNumberShowSearchfield(results){
    let number = results['id'];
    if (number < 10) {
        return `#00${number}`;
      } else if (number < 100) {
        return `#0${number}`;
      } else {
        return `#${number}`;
      }
}




