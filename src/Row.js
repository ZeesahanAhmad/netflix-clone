import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';



const Row = ({ title, fetchURL, isLargeRow }) => {
    const baseImgUrl = "https://image.tmdb.org/t/p/original";
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            // console.log(request);
            setMovies(request.data.results);
            return request;

        }
        fetchData();

    }, [fetchURL]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        }
        else {
            //code to play trailer from youtube
            movieTrailer(movie.name || movie.title || movie.original_name)
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));

                })
                .catch(err => console.log(err));
        }

    }


    // console.log(movies)

    return (
        <div className="row">

            <h2>{title}</h2>

            <div className="row_posters">
                {movies.map((movie => {
                    return (
                        <img
                            key={movie.id}
                            onClick={()=>handleClick(movie)}
                            className={isLargeRow ? "row_posterLarge" : "row_poster"}
                            src={`${baseImgUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name} />
                    )
                }))}
            </div>
            {trailerUrl &&<YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;