import { useState } from "react";
import "./Counter.css";

function Counter() {
    const [counter, setCounter] = useState(0);

    const handleClickPlus = () => {
        setCounter(prv => prv + 1);
    }

    const handleClickMinus = () => {
        setCounter(prv => prv - 1);
    }

    return (
        <div className="bg-container">
            <div className="sm-container">
                {counter}
                <div className="btn-container">
                    <button onClick={handleClickPlus}>+</button>
                    <button onClick={handleClickMinus}>-</button>
                </div>
            </div>
        </div>
    );
}

export default Counter;