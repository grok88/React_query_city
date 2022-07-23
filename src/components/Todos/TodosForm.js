import React, {useState} from 'react';

const TodosForm = () => {
    const [value, setValue] = useState('');

    const onTodoChange = ({target: {value = ''} = {}}) => {
        setValue(value)
    }
    const onSave = () => {
        fetch('api/todos', {
            method: 'POST',
            body: value
        })
    }

    return (
        <div>
            <input type="text" value={value} onChange={onTodoChange}/>
            <button onClick={onSave}>сохранить</button>
        </div>
    );
};

export default TodosForm;