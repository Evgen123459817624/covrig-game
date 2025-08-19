import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Shop from './Shop';
import Settings from './Settings';
import shopImage from './assets/shop-button-background.png';
import backgroundMusic from './assets/wingless-backgroundMusic.mp3';
import StartPage from './StartPage.js';

import frame1 from './assets/covrig/covrig_level1.png';
import frame2 from './assets/covrig/covrig_level2.png';
import frame3 from './assets/covrig/covrig_level3.png';
import frame4 from './assets/covrig/covrig_level4.png';
import frame5 from './assets/covrig/covrig_level5.png';
import covrig from './assets/covrig/covrig_level1.png';

function App() {
  const [score, setScore] = useState(0);
  const [money, setMoney] = useState(0);
  const [autoClickers, setAutoClickers] = useState(0);
  const [autoClickerCost, setAutoClickerCost] = useState(50);
  const [nrOfOvens, setNrOfOvens] = useState(0);
  const [ovenCost, setOvenCost] = useState(100);
  const [upgradeCost, setUpgradeCost] = useState(100);
  const [upgradeLevel, setUpgradeLevel] = useState(1);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStartPageOpen, setIsStartPageOpen] = useState(true);
  const [randomNumber, setRandomNumber] = useState(null);
  const [moneyAsString, setMoneyAsString] = useState("0");
  const [scoreAsString, setScoreAsString] = useState("0");
  const [timeLeft, setTimeLeft] = useState(60 - new Date().getSeconds()); // secunde rămase
  const [factoryCost, setFactoryCost] = useState(0);
  const [nrOfFactories, setNrOfFactories] = useState(0);
  const [rebirths, setRebirths] = useState(0);

  const audioRef = useRef();

  const levels = [
    { nr: 1, image: frame1 },
    { nr: 2, image: frame2 },
    { nr: 3, image: frame3 },
    { nr: 4, image: frame4 },
    { nr: 5, image: frame5 }
  ];

    // 🔹 Change the string for money
    useEffect(() => {
        if (money / 1000000 > 1) {
            setMoneyAsString(Math.floor(money / 1000000 * 100) / 100 + " m");
        }
        else if (money / 1000 > 1) {
            setMoneyAsString(Math.floor(money / 1000 * 100) / 100 + " k");
        }
        else {
            setMoneyAsString(Math.floor(money * 100) / 100);
        }
    }, [money]);

    // 🔹 Change the string for score
    useEffect(() => {
        if (score / 1000000 > 1) {
            setScoreAsString(Math.floor(score / 1000000 * 100) / 100 + " m");
        }
        else if (score / 1000 > 1) {
            setScoreAsString(Math.floor(score / 1000 * 100) / 100 + " k");
        }
        else {
            setScoreAsString(Math.floor(score * 100) / 100);
        }
    }, [score]);

  // 🔹 Random number în funcție de nivel
  const updateNumber = (currentLevel) => {
    switch (currentLevel) {
      case 1: setRandomNumber(getRandomNr(1, 3)); break;
      case 2: setRandomNumber(getRandomNr(2, 5)); break;
      case 3: setRandomNumber(getRandomNr(4, 7)); break;
      case 4: setRandomNumber(getRandomNr(6, 9)); break;
      case 5: setRandomNumber(getRandomNr(8, 11)); break;
      default: setRandomNumber(getRandomNr(0, 1));
    }
  };

  // 🔹 Fetch status din backend
  const fetchStatus = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/status");
      const data = await res.json();
      setScore(data.score);
      setMoney(data.money);
      setAutoClickers(data.autoClickers);
      setAutoClickerCost(data.autoClickerCost);
      setNrOfOvens(data.nrOfOvens);
      setOvenCost(data.ovenCost);
      setUpgradeLevel(data.level);
      setUpgradeCost(data.upgradeCost);
      setFactoryCost(data.factoryCost);
      setNrOfFactories(data.nrOfFactories);
      setRebirths(data.rebirths);
      return data;
    } catch (err) {
      console.error("Eroare fetchStatus:", err);
    }
  };

  // 🔹 Tick automat pentru timpul ramas pina la reroll
    useEffect(() => {
      // timer pentru scăderea secundelor
      const countdown = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 59));
      }, 1000);

      return () => clearInterval(countdown);
    }, []);

  // 🔹 Tick automat
  useEffect(() => {
    fetchStatus();
    const interval = setInterval(() => {
      if (!isPaused) {
        fetch("http://localhost:8080/api/tick", { method: "POST" })
          .then(() => fetchStatus());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // 🔹 Ieșire din settings => resume
  useEffect(() => {
    if (!isSettingsOpen) {
      setIsPaused(false);
    }
  }, [isSettingsOpen]);

  // 🔹 Actualizare randomNumber când upgradeLevel se schimbă
  useEffect(() => {
    updateNumber(upgradeLevel);
  }, [upgradeLevel]);

  // 🔹 Actualizare la fiecare minut fix
  useEffect(() => {
    if (timeLeft < 1)
      updateNumber(upgradeLevel);
  }, [timeLeft]);

  // ---- Funcții acțiuni ----
  const handleClick = () => {
    fetch("http://localhost:8080/api/click", { method: "POST" })
      .then(() => fetchStatus());
  };

  const handleBuy = () => {
    fetch("http://localhost:8080/api/buy-upgrade", { method: "POST" })
      .then(() => fetchStatus());
  };

  const handleBuyOven = () => {
    fetch("http://localhost:8080/api/buy-oven", { method: "POST" })
      .then(() => fetchStatus());
  };

  const handleUpgrade = async () => {
    await fetch("http://localhost:8080/api/upgrade", { method: "POST" });
    await fetchStatus(); // upgradeLevel nou => updateNumber se apelează automat din useEffect
    setIsShopOpen(false);
  };

  const handleReset = async () => {
    try {
      await fetch("http://localhost:8080/api/total-reset", { method: "POST" });
      await fetchStatus();
      setIsSettingsOpen(false);
      setMoneyAsString("0");
    } catch (error) {
      console.error("Reset failed:", error);
      alert("Resetarea a eșuat. Încearcă din nou.");
    }
  };

  const handleVolume = () => {
    if (audioRef.current.volume === 0) {
      audioRef.current.volume = 0.15;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

const handleStartPage = () => {
  // Pornește muzica pe click
  if (audioRef.current) {
    console.log("audio here");
    audioRef.current.volume = 0.15;
    audioRef.current.play().catch(err => {
      console.log("Eroare la redare:", err);
    });
  }

  fetchStatus();
  setIsSettingsOpen(false);
  setIsStartPageOpen(true);
};

const handleReroll = () => {
    fetch("http://localhost:8080/api/reroll", { method: "POST" });
    fetchStatus();
    updateNumber(upgradeLevel);
}

  const getRandomNr = (min, max) => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  };

  const onBuyFactory = () => {
    fetch("http://localhost:8080/api/buy-factory", { method: "POST"});
    fetchStatus();
  }

  const onRebirth = () => {
    fetch("http://localhost:8080/api/rebirth", { method: "POST"});
    fetchStatus();
  }

  return (
    <div className="App">
      <audio ref={audioRef} src={backgroundMusic} loop />

      <div className="statsContainer">
        <i className="fa-solid fa-gear settingsButton" onClick={() => { setIsPaused(!isPaused); setIsSettingsOpen(!isSettingsOpen) }} ></i>
        <span>Auto-clickers: {autoClickers}</span>
        { upgradeLevel > 1 && <span>Ovens: {nrOfOvens}</span> }
        { upgradeLevel > 3 && <span>Factories: {nrOfFactories}</span> }
        <span>Level: {upgradeLevel}</span>
        { rebirths > 0 && <span>Rebirths: {rebirths}</span> }
      </div>

      <div className="scoreLabel">
        <div className="scoreText">
          <img src={covrig} alt="covrig" />
          {scoreAsString}
        </div>
        <div className="moneyText">
          $ {moneyAsString}
        </div>
      </div>

      <div className="hitbox" onClick={handleClick}></div>
      <img src={levels[upgradeLevel - 1].image} alt="Clicker" className="logoImage" />

      <div className="shopHitbox" onClick={() => setIsShopOpen(true)}></div>
      <img src={shopImage} alt="" className="shopImage" />

      {(isShopOpen || isSettingsOpen) && <div className="overlay" onClick={() => { setIsShopOpen(false); setIsSettingsOpen(false) }}></div>}

      {isShopOpen && (
        <Shop
          onBuy={handleBuy}
          autoClickerCost={autoClickerCost}
          onClose={() => setIsShopOpen(false)}
          onBuyOven={handleBuyOven}
          ovenCost={ovenCost}
          onUpgrade={handleUpgrade}
          upgradeCost={upgradeCost}
          upgradeLevel={upgradeLevel}
          fetchStatus={fetchStatus}
          randomNumber={randomNumber}
          reRoll = {handleReroll}
          timeLeft={timeLeft}
          onBuyFactory={onBuyFactory}
          factoryCost = {factoryCost}
          onRebirth = {onRebirth}
        />
      )}

      {isSettingsOpen && (
        <Settings
          onClose={() => setIsSettingsOpen(false)}
          onReset={handleReset}
          onAudioRef={handleVolume}
          isMuted={isMuted}
          onStartPage={handleStartPage}
        />
      )}

      {isStartPageOpen && (
        <StartPage handleStartPage={() => setIsStartPageOpen(false)} />
      )}
    </div>
  );
}

export default App;
