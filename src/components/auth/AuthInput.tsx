import React from 'react';
import {TInputs} from "../../pages/AuthPage";
import {FieldErrors, UseFormRegister} from "react-hook-form";


interface IAuthInput {
    label: string
    value: string
    errors: FieldErrors<TInputs> | any
    register: UseFormRegister<TInputs> | any
    type: string
    required: boolean
}

const AuthInput: React.FC<IAuthInput> = ({label, value, errors, register, type, required}) => {
    return (
        <div className={type === 'checkbox' ? 'flex gap-5 items-center' : ''}>
            <div><label>{label}</label></div>
            <input className={type === 'checkbox' ? 'cursor-pointer w-[20px] h-[20px] mr-[7px] '
                : 'text-primary rounded-[.2em] p-[.25em] h-[1.8em]'}  type={type}
                   {...register(value, { required: required })} />
            {required && errors[value] && <div className={'text-[red] mt-0.5'}>This field is required</div>}
        </div>
    );
};

export default AuthInput;