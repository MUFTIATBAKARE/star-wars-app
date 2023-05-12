const getCharacters = (characters) => {
  return Promise.all(
    characters.map((characterUrl) =>
      fetch(characterUrl).then((response) => {
        if (!response.ok) {
          throw new Error(`Status is ${response.status}`);
        }
        return response.json();
      })
    )
  )
    .then((characters) => {
      const characterNames = characters.map((character) => character.name);
      return characterNames;
    })

    .catch((error) => console.log(error));
};
const getPlanets = (planets) => {
  return Promise.all(
    planets.map((planetUrl) =>
      fetch(planetUrl).then((response) => {
        if (!response.ok) {
          throw new Error(`Status is ${response.status}`);
        }
        return response.json();
      })
    )
  )
    .then((planets) => {
      const planetNames = planets.map((planet) => planet.name);
      return planetNames;
    })

    .catch((error) => console.log(error));
};
const getSpecies = (species) => {
  return Promise.all(
    species.map((specieUrl) =>
      fetch(specieUrl).then((response) => {
        if (!response.ok) {
          throw new Error(`Status is ${response.status}`);
        }
        return response.json();
      })
    )
  )
    .then((species) => {
      const specieNames = species.map((specie) => specie.name);
      return specieNames;
    })

    .catch((error) => console.log(error));
};
const getStarships = (starships) => {
  return Promise.all(
    starships.map((starshipUrl) =>
      fetch(starshipUrl).then((response) => {
        if (!response.ok) {
          throw new Error(`Status is ${response.status}`);
        }
        return response.json();
      })
    )
  )
    .then((starships) => {
      const starshipNames = starships.map((starship) => starship.name);
      return starshipNames;
    })

    .catch((error) => console.log(error));
};
const getVehicles = (vehicles) => {
  return Promise.all(
    vehicles.map((vehicleUrl) =>
      fetch(vehicleUrl).then((response) => {
        if (!response.ok) {
          throw new Error(`Status is ${response.status}`);
        }
        return response.json();
      })
    )
  )
    .then((vehicles) => {
      const vehicleNames = vehicles.map((vehicle) => vehicle.name);
      return vehicleNames;
    })

    .catch((error) => console.log(error));
};

export { getCharacters, getPlanets, getSpecies, getStarships, getVehicles };
