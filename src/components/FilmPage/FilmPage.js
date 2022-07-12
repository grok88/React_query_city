import React from 'react';
import {useQuery} from "react-query";

const useGetFilm = (url) => {
    return useQuery(['film', url], () =>  fetch(url).then(data => data.json()), {
    initialData:{
        episode_id:1,
        opening_crawl:'RAndom'
          }
        })
}

const FilmPage = ({url}) => {
const {data={}} =useGetFilm(url)
    return (
        <div>
            <h1>{data?.title}</h1>
             <div><b>Episode: </b> {data?.episode_id} </div>
             <div><b>Description: </b> {data?.opening_crawl} </div>
        </div>
    );
};

export default FilmPage;