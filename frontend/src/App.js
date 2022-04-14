import './App.css';
import { useState, useEffect } from "react";
import { io } from 'socket.io-client';
// import {Button} from "@mui/material";

function App() {
    const [responses, setResponses] = useState({});
    const [movieInput, setMovieInput] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Create and establish a connection to the socketio server
        const ENDPOINT = "http://localhost:8000";
        const socket = io(ENDPOINT);
        
        if (socket) {
            setSocket(socket);
            
            socket.on("connected", data => {
                console.log("connected")
                console.log(JSON.stringify(data))
                setResponses(data);
            });

            socket.on("receive-response", data => {
                console.log("receive-response")
                console.log(JSON.stringify(data))
                setResponses(data);
            });
        }
    }, [setResponses]);

    function handleSubmit(event) {
        event.preventDefault();
        socket.emit("send-response", movieInput);
        setMovieInput('');  // make input box empty
    }

    return (
        <div className="App">
            {/* {console.log("movies: " + JSON.stringify(responses, null, 2))} */}
            <h1>Favourite Movie Poll</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="colour">Enter your favourite movie:</label>
                <input
                    autoFocus
                    value={movieInput}
                    placeholder="Enter movie name"
                    type="text"
                    onChange={(e) => {
                        setMovieInput(e.currentTarget.value);
                    }}
                />
                <br></br>
                <button
                    type="submit" 
                    className="submit-button"
                >
                    Submit
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(responses).map((key, index) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{responses[key]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
