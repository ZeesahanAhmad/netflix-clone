import React, {useState, useEffect} from 'react';
import axios from './axios';
import './Row.css';


const Row=({title, fetchURL, isLargeRow})=>{
    const baseImgUrl = "https://image.tmdb.org/t/p/original";
    const [movies, setMovies]=useState([]);

    useEffect(() => {
            async function fetchData(){
            const request=await axios.get(fetchURL);
            console.log(request);
            setMovies(request.data.results);
            return request;
            
       }
       fetchData();

    }, [fetchURL])
    
    console.log(movies)

    return(
        <div className="row">

           <h2>{title}</h2>
           
           <div className="row_posters">
              {movies.map((movie=>{
                return(
                    <img key={movie.id} className={isLargeRow? "row_posterLarge" : "row_poster"}
                     src={`${baseImgUrl}${isLargeRow?movie.poster_path:movie.backdrop_path}`} 
                     alt={movie.name}/>
                )
              }))}
           </div>
           

        </div>
    )
}

export default Row;