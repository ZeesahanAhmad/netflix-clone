import React,{useState, useEffect} from 'react'
import axios from './axios';
import requests from './requests';
import './Banner.css';

function Banner() {

   const baseImgUrl = "https://image.tmdb.org/t/p/original";
   const [movie, setMovie]=useState([]);
   
   useEffect(() => {
       async function fetchData(){
           const request=await axios.get(requests.fetchNetflixOriginals);
           setMovie(request.data.results[Math.floor(Math.random()*request.data.results.length-1)]);
           return request;
       }
       fetchData();
      
   }, [])

   console.log(movie);
//    function truncate(str, num) {
//     if (str.length > num) {
//       return str.slice(0, num-1) + "...";
//     } else {
//       return str;
//     }
//   }
 


    return (
        <header className="banner" style={{
            backgroundSize:"cover",
            backgroundImage:`url(${baseImgUrl}${movie.backdrop_path})`,
            backgroundPosition:"center center",
            
        }}>
          <div className="banner_contents">
            <h1 className="banner_title">{movie.name || movie.title || movie.original_name}</h1>
            <div className="banner_buttons">
              <button className="banner_button">Play</button>
              <button className="banner_button">My List</button>
            </div>

            <h1 className="banner_description">{movie.overview}</h1>

          </div>
        
        </header>
    )
}

export default Banner;
