import React from 'react';

interface IErrorFetch {
    error: string
}

export const ErrorFetch: React.FC<IErrorFetch> = ({error}) => {
    return (
        <div className={'text-[22px] text-center mt-[50px]'}>{error}</div>
    )
};
