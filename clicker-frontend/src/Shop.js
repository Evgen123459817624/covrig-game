import './Shop.css';
import React, { useEffect, useState } from "react";

function Shop({ onBuy, autoClickerCost, onClose, onBuyOven, ovenCost, onUpgrade, upgradeCost, upgradeLevel, fetchStatus, randomNumber, reRoll, timeLeft, onBuyFactory, factoryCost, onRebirth }) {

    const handleSell = (price) => {
        fetch("http://localhost:8080/api/sell", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price })
        })
            .then(res => res.text())
            .then(msg => {
                console.log(msg);
            });

        fetchStatus();
    };


  return (
    <div className="shop">
      <h2>Shop</h2>

      <button onClick={onBuy}>
        Buy auto-clicker &nbsp; - &nbsp; ${autoClickerCost}
      </button>

      { upgradeLevel > 1 && (
        <button onClick={onBuyOven} className="boughtUpgrade">
          Buy oven &nbsp; - &nbsp; ${ovenCost}
        </button>
      )}

      { upgradeLevel > 3 && (
        <button onClick={onBuyFactory} className="boughtUpgrade">
          Buy factory &nbsp; - &nbsp; ${factoryCost}
        </button>
      )}

      <button onClick={onUpgrade}>
        {upgradeLevel < 5 ? (
          <> ✨ Level Up &nbsp; - &nbsp; ${upgradeCost} ✨</>
        ) : (
          'Upgrade max'
        )}
      </button>

      { upgradeLevel === 5 && <button onClick={onRebirth} className="boughtUpgrade">✨✨✨ Rebirth ✨✨✨</button> }


      <br />

      <span>Refresh in: {timeLeft} sec</span>
      <span> Price / covrig: $ { Math.floor(randomNumber*100)/100 } </span>

      <br />

      { upgradeLevel > 2 && (
        <button onClick={reRoll} className="boughtUpgrade">
          Schimbă preț - 20%
        </button>
      )}

      <button onClick={() => handleSell(randomNumber)}>Sell all</button>

      <br />

      <button onClick={onClose}>Exit</button>
    </div>
  );
}

export default Shop;