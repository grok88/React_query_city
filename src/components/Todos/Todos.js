import React from 'react';
import fetchMock from "fetch-mock";
import {useQuery} from "react-query";
import TodosForm from "./TodosForm";

const todosMock = ['почитать', 'обновить'];

fetchMock.get('api/todos', todosMock);
fetchMock.post('api/todos', (_, res) => {
    todosMock.push(res.body);
    return 200;
});

const Todos = () => {
    const {data: todos, isLoading, isFetching} = useQuery('todos', async () => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        return fetch('api/todos').then(res => res.json())
    })

    console.log(todos);

    return (
        isLoading ? 'loading' :
            <div>
                <ul>
                    {
                        todos.map(todo => (
                            <ul>{todo}</ul>
                        ))
                    }
                </ul>
                {isFetching ? 'Обновление' : null}
                <TodosForm/>
            </div>
    );
};

export default Todos;