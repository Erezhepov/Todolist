import React, {useState} from 'react';

interface IInputCard {
    editHandler: (changedValue: string) => void
}

const InputCard = ({editHandler} : IInputCard) => {
    const [value, setValue] = useState('')
    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const changeEditHandler = () => {
        editHandler(value)
    }

    const addEditHandler = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'){
            editHandler(value)
        }
    }

    return (
        <input autoFocus onKeyPress={addEditHandler} onBlur={changeEditHandler} onChange={changeValue} value={value}
               className={'rounded-[.2em] p-[.25em] h-[1.8em] text-primary'} type="text"/>
    );
};

export default InputCard;