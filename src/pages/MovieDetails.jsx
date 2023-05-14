import { useState, useEffect } from "react";
import {
  getCharacters,
  getPlanets,
  getSpecies,
  getStarships,
  getVehicles,
} from "../components/ApiCalls";
import { Link, useParams } from "react-router-dom";

const MovieDetails = () => {
  const { episode_id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/films/${episode_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Status is ${response.status}`);
        }
        return response.json();
      })
      .then((rawData) => {
        console.log(rawData);
        console.log(typeof rawData);

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
        } = rawData;
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
            characterNames,
            planetNames,
            specieNames,
            starshipNames,
            vehicleNames,
          })
        );
      })
      .then((movieData) => {
        setError(null);
        setData([movieData]);
        console.log(movieData);
      })
      .catch((error) => {
        setData([]);
        setError(error);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [episode_id]);

  return (
    <>
      <div>
        <Link to="/">Back to list</Link>
        {loading && <div>Data is loading. Please wait...</div>}
        {error && (
          <div>{`There is a problem fetching your data - ${error}`}</div>
        )}
        {console.log(data)}
        {data &&
          data.map((movieDetail) => {
            return (
              <div key={movieDetail.episode_id}>
                <h2>{movieDetail.title}</h2>
                <p>Director: {movieDetail.director}</p>
                <p>Producer: {movieDetail.producer}</p>
                <p>Description </p>
                {movieDetail.opening_crawl}
                <p>Characters</p>
                <ul>
                  {movieDetail.characterNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
                <p>Planets </p>
                <ul>
                  {movieDetail.planetNames.map((name) => (
                    <li key={name}> {name}</li>
                  ))}
                </ul>
                <p>Species </p>
                <ul>
                  {movieDetail.specieNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
                <p>Starships</p>
                <ul>
                  {movieDetail.starshipNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
                <p>Vehicles </p>
                <ul>
                  {movieDetail.vehicleNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MovieDetails;
