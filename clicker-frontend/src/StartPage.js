import React from 'react';
import './StartGame.css';

function StartPage ({handleStartPage}) {
    return (
        <div className = "mainPage">
            <button onClick = {handleStartPage}> Start Game </button>
        </div>
    );
}

export default StartPage;