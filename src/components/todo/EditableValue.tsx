import React, {useState} from 'react';
import InputCard from "../../UI/InputCard";

interface IEditableValue {
    value: string
}

const EditableValue: React.FC<IEditableValue> = (props) => {
    const [value, setValue] = useState(props.value)
    const [isChanged, setIsChanged] = useState(false)
    const changeValue = () => {
        setIsChanged(true)
    }
    const editHandler = (changedValue: string) => {
        if (changedValue.length > 0){
            setValue(changedValue)
        }
        setIsChanged(false)
    }
    return (
        <div>
            { isChanged ? <InputCard editHandler={editHandler} />
                : <p className={'cursor-pointer h-[1.8em] flex items-center'} onDoubleClick={changeValue}>{ value }</p> }
        </div>
    );
};

export default EditableValue;