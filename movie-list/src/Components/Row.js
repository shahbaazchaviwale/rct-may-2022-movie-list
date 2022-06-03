import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import instance from "../API/axios";
import "./Row.css";

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [noTrailer, setNoTrailer] = useState(false);
  const baseURL = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    /**NOTE
     * if [], then run once when loads, and dont run again
     */
    async function fetchData() {
      const response = await instance.get(fetchUrl);
      // console.log("response >>", response.data.results);
      setMovies(response.data.results);
      return response.data.results;
    }
    fetchData();
  }, [fetchUrl]);

  const options = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  // get video from youtube based id
  const playtrailer = (movie) => {
    // https://www.youtube.com/watch?v=PmvsAi89BDM
    movieTrailer(null, { tmdbId: movie.id })
      .then((response) => {
        if (response) {
          const urlParams = new URLSearchParams(new URL(response).search);
          setTrailerUrl(urlParams.get("v"));
        } else {
          setNoTrailer(true);
          setTrailerUrl(true);
        }
      })
      .catch((err) => {
        console.log("err >>", err);
      });
  };

  const closePlayer = () => {
    setTrailerUrl("");
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => playtrailer(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${baseURL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
          />
        ))}
      </div>

      {trailerUrl && (
        <>
          <div onClick={() => closePlayer()} className="close_youtube_player">
            close
          </div>
          {noTrailer ? (
            <div className="no_trailer">***No Trailer found***</div>
          ) : (
            <YouTube videoId={trailerUrl} opts={options} />
          )}
        </>
      )}
    </div>
  );
}
