import React, {useState} from 'react';

const Component: React.FC<any> = () => {
    const [isActive, setIsActive] = useState(false)
    const [value, setValue] = useState('')
    return (
        <div>
            {isActive && <h2 style={{color: 'red'}}>Title</h2>}
            <p data-testid={'input-value'}>{value}</p>
            <div data-testid={'element'}>Element</div>
            <button onClick={() => setIsActive(prevState => !prevState)}>click</button>
            <input placeholder={'enter'} type="text" onChange={(e) => setValue(e.target.value)} value={value}/>
        </div>
    );
};

export default Component;