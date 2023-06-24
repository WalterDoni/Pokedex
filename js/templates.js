/*----------------------------closed PokemonCard ------------------------------*/
function closedPokemonCardTemplate(id, currentPokemon) {
    return `<div class="closedPokemonCard " id="closedPokemonCard${id}" onclick="openPokemonCard(${id})">
    <h1 id="pokemonName" class="pokemonName"> ${nameOfThePokemon()}</h1> 
    <p id="pokemonNumber">${pokemonIdNumberShow(currentPokemon)}</p>
    <div id="pokemonType">${pokemonTypes(currentPokemon)}</div>
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

/*----------------------------open PokemonCard-----------------------------------------------------*/

function openPokemonCardTemplate(clickedPokemon,detailsPokemon,evo){
    return  `<div class="backgroundColorOpenCard" onclick="closeOpenedPokemonCard()">
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
}

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

/*----------------------------Searchfunction-----------------------------------------------------*/

function searchFunctionTemplate(results, id){
    return `<div class="closedPokemonCard " id="closedPokemonCard${id}" onclick="openPokemonCard(${id}+1)">
    <h1 id="pokemonName" class="pokemonName"> ${results['name'].charAt(0).toUpperCase() + results['name'].slice(1)}</h1>
    <p id="pokemonNumber">${pokemonIdNumberShow(results)}</p>
    <div id="pokemonType">${pokemonTypesSearchfield(results)}</div>
    <img id="pokemonAvatar" src="${results['sprites']['other']['official-artwork']['front_default']}">
  </div>`;
}

