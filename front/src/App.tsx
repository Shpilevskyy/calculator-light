import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
    const [expression, setExpression] = useState('1');

    useEffect(() => {
        fetch('/test', {
            method: 'post',
            body: JSON.stringify({expression})
        }).finally(console.log)
    }, [expression])

    return (
        <div className="App">
            <header className="App-header">
                <input type="text" value={expression} onChange={(e) => setExpression(e.target.value)}/>
            </header>
        </div>
    );
}

export default App;
