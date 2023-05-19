import { useState, useEffect } from "react";
import {
  getCharacters,
  getPlanets,
  getSpecies,
  getStarships,
  getVehicles,
  getId,
} from "../ApiCalls";
import { Link, useParams } from "react-router-dom";
import Logo from "../components/Logo";

const MovieDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/films/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Status is ${response.status}`);
        }
        return response.json();
      })
      .then((rawData) => {
        const {
          title,
          episode_id,
          director,
          producer,
          opening_crawl,
          url,
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
          getId(url),
        ]).then(
          ([
            characterNames,
            planetNames,
            specieNames,
            starshipNames,
            vehicleNames,
            id,
          ]) => ({
            title,
            episode_id,
            director,
            producer,
            opening_crawl,
            id,
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
      })
      .catch((error) => {
        setData([]);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <header>
        <Logo />
      </header>
      {loading && <div className="loader"></div>}
      {error && <div>{`There is a problem fetching your data - ${error}`}</div>}

      {data &&
        data.map((movieDetail) => {
          return (
            <div className="movie-detail-container">
              <Link to="/" className="previous">
                🔙 Back to list
              </Link>
              <div className="movie-detail-content" key={movieDetail.id}>
                <div className="movie-detail-top-content">
                  <h2>{movieDetail.title}</h2>
                  <p>Director: {movieDetail.director}</p>
                  <span className="movie-detail-top-content-text">
                    <p>Producer:</p> <p>{movieDetail.producer}</p>
                  </span>
                </div>
                <p className="movie-detail-bottom-content-text">Description </p>
                <p className="movie-detail-bottom-content-list">
                  {movieDetail.opening_crawl}{" "}
                </p>
                <p className="movie-detail-bottom-content">Characters</p>
                <ul className="movie-detail-bottom-content-list">
                  {movieDetail.characterNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
                <p className="movie-detail-bottom-content">Planets </p>
                <ul className="movie-detail-bottom-content-list">
                  {movieDetail.planetNames.map((name) => (
                    <li key={name}> {name}</li>
                  ))}
                </ul>
                <p className="movie-detail-bottom-content">Species </p>
                <ul className="movie-detail-bottom-content-list">
                  {movieDetail.specieNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
                <p className="movie-detail-bottom-content">Starships</p>
                <ul className="movie-detail-bottom-content-list">
                  {movieDetail.starshipNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
                <p className="movie-detail-bottom-content">Vehicles </p>
                <ul className="movie-detail-bottom-content-list">
                  {movieDetail.vehicleNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default MovieDetails;
