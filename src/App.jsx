import React, { useState, useEffect } from 'react'
import Search from "./components/Search.jsx";
import Loader from "./utils/utils.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce}  from "react-use";
import {getTrendingMovie, updateSearchCount} from "./appwrite.js";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY_AUTH = import.meta.env.VITE_TMDB_KEY_ACCESS;// now these both have no use here because both are shifted to .net backend
// the backend of tmdb api is in .net core api

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
       // Authorization: `Bearer ${API_KEY_AUTH}` this is if you are using tmdb
    }
};

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [trendingMovies, setTrendingMovies] = useState([]);

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500,[searchTerm]);
    //debounce search term is to prevent making excessive api calls when user
    // enter any thing in search field, instead it will check the typing gap of .5 sec

    const fetchMovies = async (query='') => {
        try {
            setIsLoading(true);

            setErrorMessage('');
            const endpoint=query?//f1
                `https://localhost:7168/api/Movies?query=${encodeURIComponent(query)}`
                :`https://localhost:7168/api/Movies`;
            const response = await fetch(
                endpoint,
                API_OPTIONS
            );

            if (!response.ok) {
                throw new Error(`Failed fetching movies: ${response.status}`);
            }

            const data = await response.json();
            if(data.Response=='False'){
                setErrorMessage(data.Error||"Failed to fatch movies");
                setMovieList([]);
                return;
            }
            console.log(data)
            setMovieList(data||[]);
if(query&&data.length>0){
    await updateSearchCount(query,data[0]);
}
        } catch (err) {
            console.error(err);
            setErrorMessage("Error fetching movies!");
        }finally {
            setIsLoading(false);
        }
    };


    const loadTrendingMovies = async()=>{
        try {
            const movies=await getTrendingMovie();
            setTrendingMovies(movies);
        }catch(e) {
            console.error(e);
        }
    }
    useEffect(() => {

        fetchMovies(debouncedSearchTerm);

    }, [debouncedSearchTerm]);

    useEffect(() => {
        loadTrendingMovies();
    },[])

    return (
        <main>
            <div className="pattern"></div>
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
                </header>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                {trendingMovies.length > 0&&(
                    <section className="trending">
                        <h2>Trending Movies</h2>
                        <ul>
                            {trendingMovies.map((movie,index)=>(
                                <li key={movie.$id}>
                                    <p>{index+1}</p>
                                    <img src={movie.poster_url.length>0?movie.poster_url:'/no-movie.png'} alt={movie.title}/>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
                <section className="all-movies">
                    <h2>All Movies</h2>
                    {isLoading ? (
                        <>
                            <Loader />
                        </>

                    ):errorMessage?(
                        <p className="text-red-500">{errorMessage}</p>
                    ):(
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )}
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </section>
            </div>
        </main>
    );
};

export default App;
