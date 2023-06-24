Chart.defaults.font.size = 16;
Chart.defaults.color = 'white';


async function bars(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    clickedPokemon = await response.json();

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'],

            datasets: [{
                label: 'Basestats',
                backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                data: [clickedPokemon['stats']['0']['base_stat'], clickedPokemon['stats']['1']['base_stat'], clickedPokemon['stats']['2']['base_stat'], clickedPokemon['stats']['3']['base_stat'], clickedPokemon['stats']['4']['base_stat'], clickedPokemon['stats']['5']['base_stat']],
                borderColor: [
                    'white',
                ],
                borderWidth: 1.5
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
            },
            maintainAspectRatio: false,
            scales: {
              y: {
                stacked: true,
                grid: {
                  display: true,
                  color: "rgba(255,99,132,0.2)"
                }
              },
              x: {
                grid: {
                  display: false
                }
              }
            }
        }
    })
}