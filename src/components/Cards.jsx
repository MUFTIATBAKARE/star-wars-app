import { React, useState, useEffect } from "react";

const Cards = () => {
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
        setData(rawData.results);
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
    <div>
      {loading && <div>Data is loading. Please wait...</div>}
      {error && <div>{`There is a problem fetching your data - ${error}`}</div>}
      <ul>
        {data &&
          data.map((movie) => {
            return (
              <li key={movie.index}>
                <h4>{movie.starships.title}</h4>
                <p>{movie.planets.release_date}</p>
                <h6>{movie.characters.opening_crawl}</h6>
                <div className="divider"></div>
                <p>More info</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Cards;
