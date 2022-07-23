import React, {useState} from 'react';
import FilmPage, {fetchFilm} from '../FilmPage/FilmPage1'
import {useQuery} from "react-query";
import {queryClient} from "../../index";
import {Link} from "react-router-dom";

// const useGetFilms = () => useQuery('films', async () => {
//     await new Promise(resolve => setTimeout(resolve, 2000))
//     // throw new Error('Something went wrong');
//     return fetch('https://swapi.dev/api/films').then(res => res.json())
// }, {
//     // Припотере фокуса и возврате звапрос идет
//     // refetchOnWindowFocus: true,
//     // staleTime: 6000,
//     // cacheTime: 5000
// });

// const useGetFilm = (film) => useQuery(['films', film], async () => {
//     await new Promise(resolve => setTimeout(resolve, 2000))
//     return fetch(`https://swapi.dev/api/films?search=${film}`).then(res => res.json())
//     // return fetch(`https://pokeapi.co/api/v2/pokemon/${film}`).then(res => res.json())
// }, {enabled: !!film, retry: 5});
//
// const SearchFilms = ({film}) => {
//     const {data: {results: films = []} = {}, isLoading, isError, error, isFetching} = useGetFilm(film);
//     return <div>
//         {isLoading
//             ? <h1>Loading...</h1>
//             : isError ? error.message
//                 : films.map(film => <div key={film.title}>
//                     <h1>  {film.title}</h1>
//                     {film.planets.map(planet =>
//                         <Planet planetUrl={planet}/>
//                     )}
//                 </div>)
//         }
//         <br/>
//         {isFetching ? 'Идет обновлениие данных...' : null}
//         <br/>
//     </div>
// }

// const FilmsLength = () => {
//     const {data: {results: films = []} = {}, isLoading, isError, error, isFetching} = useGetFilms();
//
//     return isLoading
//         ? 'Loading...'
//         : <p>Количество фильмов - {films?.length}</p>
// }

// const Films = () => {
//     // const {data: {results: films = []} = {}, isLoading, isError, error, isFetching} = useGetFilms();
//
//     const [film, setFilm] = useState('');
//
//     return (
//         <div>
//             <input type="text" value={film} onChange={e => setFilm(e.target.value)}/>
//             <SearchFilms film={film}/>
//         </div>
//     );
// };

// const useGetPlanets = () => useQuery('planets', async () => {
//     await new Promise(resolve => setTimeout(resolve, 2000))
//     return fetch('https://swapi.dev/api/planets').then(res => res.json())
// });

// const Planets = () => {
//     const {data: {results: planets = []} = {}, isLoading, isError, error, isFetching} = useGetPlanets();
//
//     return (
//         <div>
//             {isLoading
//                 ? <h1>Loading...</h1>
//                 : isError ? error.message
//                     : planets.map(planet => <div key={planet.name}>
//                         {planet.name}</div>)
//             }
//             <br/>
//             {isFetching ? 'Идет обновлениие данных...' : null}
//         </div>
//     );
// };


//lesson 20


const useGetFilms = () => useQuery('films', () => {
    return fetch('https://swapi.dev/api/films').then(res => res.json())
        .then(({results}) => {
            //     results.forEach(film => queryClient.setQueryData(['film', film.url], film))
            return results;
        })
}, {cacheTime: 10000})

const Films = () => {
    const [filmsUrl, setFilmUrl] = useState('');
    const {data, isLoading} = useGetFilms();

    return isLoading ? <div>Loading...</div> : filmsUrl
        ? <>
            <button onClick={() => setFilmUrl('')}>Back</button>
            <FilmPage url={filmsUrl}/>
        </>
        : <>
            <div>
                <button onClick={() => queryClient.invalidateQueries('film', {refetchInactive: true})}>Обновить все
                </button>
            </div>
            <ul>{data.map(planet => {
                return <li key={planet.title} onMouseEnter={() => {
                    queryClient.prefetchQuery(['film', planet.url], () => fetchFilm(planet.url), {staleTime: Infinity})
                }}><b>Planet : </b><Link
                    to={planet.url.replace(/https:\/\/swapi.dev\/api\/films/g, '')}>{planet.title}</Link>
                </li>
            })}</ul>
        </>
};
export default Films;