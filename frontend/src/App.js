import './App.css';
import {useState} from "react";
// import {Button} from "@mui/material";

function App() {
    // const [message, setMessage] = useState();
    // useEffect(() => {
    //     fetch('http://localhost:3001')
    //         .then(res => res.text())
    //         .then(res => {
    //             console.log(res);
    //             setMessage(res);
    //         })
    //         .catch(err => setMessage(err.message));
    // }, []);
    const [colours, setColours] = useState([])

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.value);
        // TODO make a  post request
        setColours([
            {
                movie: "The Avengers",
                count: 5
            },
            {
                movie: "The Bee Movie",
                count: 10
            },
            {
                movie: "Iron Man",
                count: 1
            }
        ]);
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <label for="colour">Enter your favourite movie:</label>
                <input type="text" id="colour" name="colour"></input>
                <br></br>
                <button type="submit" className="submit-button">Submit</button>
            </form>

            <table>
                <tr>
                    <th>Colour</th>
                    <th>Count</th>
                </tr>
                {colours.map((obj) => (
                    <tr index={obj}>
                        <td>{obj.movie}</td>
                        <td>{obj.count}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default App;
