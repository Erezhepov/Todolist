import React from 'react';

const Loading = () => {
    return (
        <div className={'z-1000 transition-all absolute w-[140px] h-[140px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] '}>
            <img className={'w-[100%] h-[100%] bg-contain'} src="https://www.kznl.kz/img/loader.gif" alt="" />
        </div>
    )
}
export default Loading;