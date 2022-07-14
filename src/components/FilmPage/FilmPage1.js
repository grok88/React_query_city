import React, {useReducer} from 'react';
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";

// const useGetFilm = (url) => {
//     return useQuery(['film', url], async () => {
//             await new Promise(resolve => setTimeout(resolve, 5000))
//             return fetch(url).then(data => data.json())
//         },
//         // {initialData: queryClient.getQueryData('films')?.results?.find(film => film?.url === url)}
//     )
// }

const FilmPage = () => {
    const {filmId} = useParams();
    const navigate = useNavigate();
    const [count, increment] = useReducer(c => c + 1, 0)

    let url = `https://swapi.dev/api/films/${filmId}`;

    const {data = {}, isLoading, isFetching} = useQuery(['film', url], async () => {
        await new Promise(resolve => setTimeout(resolve, 5000))
        return fetch(url).then(data => data.json())
    }, {
        onSuccess: data => {
            increment()
        },
        onError: err => {

        },
        onSettled: (data, error) => {

        }
    })
    return (
        isLoading
            ? <div>'Загрузка...'</div>
            : <div>
                {/*<Link to={'/'}>Back</Link>*/}
                <button onClick={() => navigate(-1)}>back</button>
                <h1>{data?.title}</h1>
                <div><b>Episode: </b> {data?.episode_id} </div>
                <div><b>Description: </b> {data?.opening_crawl} </div>
                {isFetching ? `Обновление ... ${count}` : null}
            </div>
    );
};

export default FilmPage;