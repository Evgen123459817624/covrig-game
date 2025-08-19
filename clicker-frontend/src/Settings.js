import React from 'react';
import './Settings.css'

function Settings({onClose, onReset, onAudioRef, isMuted, onStartPage }) {
    return (
        <div className="settingsContainer">
            <h2> Settings </h2>

            <button onClick = { onAudioRef } >
                Music: { isMuted ? "off" : "on"}
            </button>

            <button
              onClick={() => {
                const confirmReset = window.confirm("Ești sigur că vrei să resetezi jocul?");
                if (confirmReset) {
                  onReset();
                }
              }}
            >
              Reset
            </button>

            <button
              onClick={() => {
                const confirmReset = window.confirm("Ești sigur că vrei să inchizi jocul?");
                if (confirmReset) {
                  onStartPage();
                }
              }}
            >
              Quit game
            </button>


            <br />
            <button onClick={onClose}>Exit</button>
        </div>
    );
}

export default Settings;