import './App.css';
import { useState, useEffect } from "react";
import { io } from 'socket.io-client';
import Bar from './components/Bar';
import ResponseCard from './components/ResponseCard';

function App() {
    const [responses, setResponses] = useState({});
    const [movieInput, setMovieInput] = useState('');

    /** ⚡ Connecting to Backend */
    const [socket, setSocket] = useState(null);
    /** useEffect is called after render */
    useEffect(() => {
        console.log("useEffect called")
        // Create and establish a connection to the socketio server
        const ENDPOINT = "http://localhost:8000";
        const socket = io(ENDPOINT);
        
        if (socket) {
            setSocket(socket);

            socket.on("receive-response", data => {
                console.log("receive-response")
                console.log(JSON.stringify(data))
                setResponses(data);
            });
        }
    }, []);

    /** Called when the 'Submit' button is clicked */
    function handleSubmit(event) {
        event.preventDefault(); // skip default behaviour

        /** If we don't have a backend
        let newResponses = {...responses}; // make a copy of the responses

        // similar to how we increment in a Python dictionary
        if (movieInput in responses) { 
            newResponses[movieInput] += 1;
        } else {
            newResponses[movieInput] = 1;
        }
        setResponses(newResponses);
         */

        socket.emit("send-response", movieInput);    // ⚡ trigger the `send-response` event
        setMovieInput('');  // make input box empty
    }

    /** The HTML that we want to be shown on screen */
    return (
        <div className="App">
            <h1>Favourite Movie Poll</h1>
            <form onSubmit={handleSubmit}>
                <label
                    className="movie-label"
                >
                    Enter your favourite movie:
                </label>
                <input
                    className="movie-input"
                    autoFocus
                    type="text"
                    placeholder="Enter movie name"
                    value={movieInput}
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
            
            <hr></hr>

            <h2>Cards</h2>
            <div className="cards-container">
                {/* Draw a card for every entry in the dictionary */}
                {Object.keys(responses).map((response, index) => (
                    <ResponseCard
                        key={index}
                        response={response}
                        count={responses[response]}
                    />
                ))}
            </div>

            <hr></hr>
            
            <h2>Table</h2>
            <table className="responses-table">
                <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Draw a row for every entry in the dictionary */}
                    {Object.keys(responses).map((key, index) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{responses[key]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <hr></hr>

            <h2>Bar Chart</h2>
            <div className='barchart-container'>
                {/* Draw a card for every entry in the dictionary */}
                {Object.keys(responses).map((response, index) => (
                    <Bar
                        key={index}
                        response={response}
                        count={responses[response]}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
