import './App.css';
import { useState, useEffect } from "react";
import io from 'socket.io-client';
// import {Button} from "@mui/material";

function App() {
    const [percentages, setPercentages] = useState({});
    const [movieInput, setMovieInput] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Create and establish a connection to the socketio server
        const newSocket = io(`http://${window.location.hostname}:3000`);

        setSocket(newSocket);

        socket.on("receive-respose", data => {
            setPercentages(data);
        })

        return (
            // close the connection when the component disappears from the DOM (aka clean up the effect)
            newSocket.close()
        )
    }, [setSocket]);

    function handleSubmit(event) {
        event.preventDefault();
        console.log("movieInput: " + movieInput);
        socket.emit('send-response', movieInput);
        setMovieInput('');  // make input box empty
    }

    return (
        <div className="App">
            {console.log("movies: " + JSON.stringify(percentages, null, 2))}
            {/* {console.log("socket: " + JSON.stringify(socket, null, 2))} */}
            <p>{socket!=null ? "Socket Connection Established" : "No connection"}</p>
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
                    {Object.keys(percentages).map((key, index) => (
                        <tr>
                            <td>{key}</td>
                            <td>{percentages[key]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
