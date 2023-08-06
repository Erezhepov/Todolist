import React from 'react';

interface ICloseModal {closeModal: (isOpen: boolean) => void}

const CloseModalBtn = ({closeModal}: ICloseModal) => {
    const closeHandler = () => {
        closeModal(false)
    }

    return (
        <button onClick={closeHandler} className={'absolute right-4 top-4 btn !w-[40px] !h-[36px]'}>X</button>
    );
};

export default CloseModalBtn;