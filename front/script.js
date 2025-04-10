const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const loadingImage = document.querySelector('.loading');


const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';
    
    loadingImage.style.display = 'block';
    pokemonImage.style.display = 'none';
  
    const data = await fetchPokemon(pokemon);

    await new Promise(resolve => setTimeout(resolve, 1500));
  
    if (data) {
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
  
      pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id;
  
      searchPokemon = data.id;
    } else {
      pokemonName.innerHTML = 'Não encontrado';
      pokemonNumber.innerHTML = '';
    }
  
    loadingImage.style.display = 'none';
    
    if (data) {
      pokemonImage.style.display = 'block';
    }
    
    input.value = '';
  }
  

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);