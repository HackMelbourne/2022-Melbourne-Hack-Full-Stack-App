import './App.css';
import {useEffect, useState} from "react";
import {Button} from "@mui/material";

function App() {
    const [message, setMessage] = useState();
    useEffect(() => {

        fetch('http://localhost:3001')
            .then(res => res.text())
            .then(res => {
                console.log(res);
                setMessage(res);
            })
            .catch(err => setMessage(err.message));
    }, []);


    return (<div className="App">
        <header className="App-header">
            <p>
                <Button variant={"contained"} disabled={!message}>{message || 'Loading...'}</Button>
            </p>
        </header>

    </div>);
}

export default App;
