import { React, useState, useEffect } from "react";
import BackgroundUrls from "../BackgroundUrls";
import { Link } from "react-router-dom";
import { getId } from "../ApiCalls";
import Logo from "../components/Logo";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
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
        let updatedData = [...rawData.results];
        updatedData.map(
          (movie, index) => (movie.imageUrl = BackgroundUrls[index])
        );
        setData(updatedData);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <header>
        <Logo/>
      </header>
      {loading && <div className="loader"></div>}
      {error && <div>{`There is a problem fetching your data - ${error}`}</div>}
      <ul className="card_list">
        {data &&
          data.map((movie) => {
            return (
              <li
                key={movie.episode_id}
                style={{
                  backgroundImage: `url(${movie.imageUrl})`,
                }}
              >
                <h3 className="movie_title">{movie.title}</h3>
                <span>{movie.release_date}</span>
                <p>{movie.opening_crawl.slice(0, 260)}</p>
                <Link to={`/movie/${getId(movie.url)}`} className="movie-text">
                  More Info
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Home;
