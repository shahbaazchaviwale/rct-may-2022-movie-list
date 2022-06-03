import React, { useEffect, useState } from "react";
import instance from "../API/axios";
import requestAPI from "../API/request";
import { truncate } from "../Helper/helper";
import "./Banner.css";
import Nav from "./Nav";

export default function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fecthData() {
      const request = await instance.get(requestAPI.fetchNetflixOriginal);
      const data =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ];
      setMovie(data);
      return request;
    }
    fecthData();
  }, []);

  console.log(movie);
  return (
    <header
      className="banner"
      style={{
        backgroudSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
        position: "relative",
      }}
    >
      <Nav />
      <div className="banner__contents">
        <h2 className="baner_title">
          {movie?.name || movie?.title || movie?.original_name}
        </h2>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner__fadeBottom" />
    </header>
  );
}
