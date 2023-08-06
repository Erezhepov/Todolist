import React, {ChangeEvent, useState} from 'react';

interface IEditableDescription {
    value: string
    renameValue: (value: string) => void
}

const EditableDescription: React.FC<IEditableDescription> = (props) => {
    const [value, setValue] = useState(props.value)
    const [isChanged, setIsChanged] = useState(false)
    const updateValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }
    const changeValue = () => {
        setIsChanged(true)
    }
    const editHandler = (changedValue: string) => {
        if (changedValue.length > 0){
            setValue(changedValue)
            props.renameValue(changedValue)
        }
        setIsChanged(false)
    }
    const changeEditHandler = () => editHandler(value)
    const addEditHandler = (e:  React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && value.length){
            editHandler(value)
        }
    }
    return (
        <div>
            { isChanged ? <textarea onBlur={changeEditHandler} autoFocus onKeyPress={addEditHandler}
                                    className={' p-1.5 text-primary w-[100%] min-h-[50px] max-h-[200px]'} onChange={updateValue} value={value}></textarea>
                : <p className={'cursor-pointer h-[1.8em] flex items-center'} onClick={changeValue}>{ value }</p> }
        </div>
    );
};

export default EditableDescription;