import { useState, useEffect } from "react";
import {
  getCharacters,
  getPlanets,
  getSpecies,
  getStarships,
  getVehicles,
} from "../components/ApiCalls";
import { Link } from "react-router-dom";

const MovieDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`https://swapi.dev/api/films`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Status is ${response.status}`);
        }
        return response.json();
      })
      .then((rawData) => {
        const promises = rawData.results.map((movie) => {
          const {
            episode_id,
            title,
            director,
            producer,
            opening_crawl,
            characters,
            planets,
            species,
            starships,
            vehicles,
          } = movie;
          return Promise.all([
            getCharacters(characters),
            getPlanets(planets),
            getSpecies(species),
            getStarships(starships),
            getVehicles(vehicles),
          ]).then(
            ([
              characterNames,
              planetNames,
              specieNames,
              starshipNames,
              vehicleNames,
            ]) => ({
              title,
              episode_id,
              director,
              producer,
              opening_crawl,
              characters,
              planets,
              species,
              starships,
              vehicles,
              characterNames,
              planetNames,
              specieNames,
              starshipNames,
              vehicleNames,
            })
          );
        });
        return Promise.all(promises);
      })
      .then((movieData) => {
        setError(null);
        setData(movieData);
      })
      .catch((error) => {
        setData(null);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        <Link to="/">Back to list</Link>
        {loading && <div>Data is loading. Please wait...</div>}
        {error && (
          <div>{`There is a problem fetching your data - ${error}`}</div>
        )}
        {data &&
          data.map((movieDetail) => {
            return (
              <div key={movieDetail.episode_id}>
                <h2>{movieDetail.title}</h2>
                <p>Director: {movieDetail.director}</p>
                <p>Producer: {movieDetail.producer}</p>
                <p>Description {movieDetail.opening_crawl}</p>
                <p>Characters {movieDetail.characterNames}</p>
                <p>Planets {movieDetail.planetNames}</p>
                <p>Species {movieDetail.specieNames}</p>
                <p>Starships {movieDetail.starshipNames}</p>
                <p>Vehicles {movieDetail.vehicleNames}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MovieDetails;
