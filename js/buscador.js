// hace un buscador de pokemons que extraiga la informacion de db.js y lo muestre en el html
function searchPokemon(name) {
  for (let i = 0; i < pokemon.length; i++) {
    if (pokemon[i].name.toLowerCase() === name.toLowerCase()) {
      return pokemon[i];
    }
  }
  return null;
}

const button = document.getElementById("button-addon2");
button.addEventListener("click", function () {
  const input = document.getElementById("buscar-pokemon");
  const resultado = document.getElementById("resultado");
  const pokemonEncontrado = searchPokemon(input.value);
  if (pokemonEncontrado) {
    resultado.innerHTML = `
        <div class="col">
          <div class="card">
            <img src="${pokemonEncontrado.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title" style='color: black'>${pokemonEncontrado.name}</h5>
              <p class="card-text">Tipo: ${pokemonEncontrado.type}</p>
            </div>
          </div>
        </div>
      `;
  } else {
    resultado.innerHTML = "Pokemon no encontrado";
  }
});
