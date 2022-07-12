import React from 'react';
import {useQuery} from "react-query";

const useGetPlanet = ({planetUrl}) => {
    return useQuery(['planet', planetUrl], async () => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        return fetch(planetUrl).then(res => res.json())
    }, {
        enabled: !!planetUrl,
        initialData: {
            name: 'Initial planet name'
        }
    })
}

const Planet = (planetUrl) => {
    const {data = {}, isLoading} = useGetPlanet(planetUrl);

    return (
        <div>
            <b>planet</b>: {isLoading ? 'Loading planet...' : data.name}
        </div>
    );
};

export default Planet;