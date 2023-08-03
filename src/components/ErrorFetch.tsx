import React from 'react';

interface IError{
    error: string
}

export const ErrorFetch: React.FC<IError> = ({error}) => {
    return (
        <div className={'text-[22px] text-center mt-[50px]'}>{error}</div>
    )
};
