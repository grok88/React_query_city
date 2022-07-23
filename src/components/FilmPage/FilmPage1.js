import React, {useReducer} from 'react';
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import {queryClient} from "../../index";

// const useGetFilm = (url) => {
//     return useQuery(['film', url], async () => {
//             await new Promise(resolve => setTimeout(resolve, 5000))
//             return fetch(url).then(data => data.json())
//         },
//         // {initialData: queryClient.getQueryData('films')?.results?.find(film => film?.url === url)}
//     )
// }

export const fetchFilm = async (url) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return fetch(url).then(data => data.json())
}

const FilmPageWrapper = () => {

    const {filmId} = useParams();
    // let url = `https://swapi.dev/api/films/${filmId}/`;

    const [isActive, toggle] = useReducer(isActive => !isActive, true);

    // useEffect(() => {
    //     queryClient.prefetchQuery(['film', url], () => fetchFilm(url))
    // }, [])

    return (
        <>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum delectus eveniet facere incidunt,
                molestias nobis quam qui quibusdam quidem temporibus?
            </div>
            <div>
                <button onClick={toggle}> {isActive ? 'Скрыть' : 'Показать детально'}</button>
            </div>
            {/*<div>*/}
            {/*    <button onClick={() => queryClient.invalidateQueries(['film', url], {*/}
            {/*        refetchActive: false*/}
            {/*    })}> Сделать данные старыми*/}
            {/*    </button>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <button onClick={() => queryClient.invalidateQueries(['film', url], {*/}
            {/*        refetchInactive: true*/}
            {/*    })}> Обновить данные в inactive*/}
            {/*    </button>*/}
            {/*</div>*/}
            {isActive ? <FilmPage/> : null}
        </>
    )
}
const FilmPage = () => {
    const {filmId} = useParams();
    const navigate = useNavigate();
    const [count, increment] = useReducer(c => c + 1, 0)

    let url = `https://swapi.dev/api/films/${filmId}/`;

    const {data = {}, isLoading, isFetching} = useQuery(['film', url], async () => fetchFilm(url), {
        staleTime: Infinity,
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
                <div>
                    <button onClick={() => queryClient.invalidateQueries(['film', url])}>Invalidate</button>
                </div>
                <div>
                    <button onClick={() => queryClient.invalidateQueries(['film', url], {
                        refetchActive: false
                    })}>Сделать наши данные старыми
                    </button>
                </div>
                {isFetching ? `Обновление ... ${count}` : null}
            </div>
    );
};

export default FilmPageWrapper;