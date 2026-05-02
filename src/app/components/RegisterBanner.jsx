import { useState, useEffect } from 'react';
import clockIcon from '../assets/clock.png';
import './RegisterBanner.css';

export function RegisterBanner({ onClose }) {
  const INITIAL_TIME = 3599; // 0:59:59

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(true);

  // Подписка на таймер (useEffect)
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleRestart = () => {
    if (timeLeft === 0) {

      setIsRunning(true);
    }
    setTimeLeft(INITIAL_TIME);
  };

  const isExpired = timeLeft === 0;

  return (
    <div className="register-banner">

      <div className="banner-header">
        <div className="banner-title">
          <img src={clockIcon} alt="clock" className="clock-icon" />
          <h3>Special Deal!</h3>
        </div>
        <button className="close-btn" onClick={onClose} title="Закрыть">
          ✕
        </button>
      </div>

      <div className="banner-content">
        <p>Register now to unlock exclusive offers and discounts</p>
      </div>

      <div className="banner-footer">
        <span className="expires-text">Offer expires in:</span>
        <div className="timer-wrapper">
          <span className="timer-digits">
            {isExpired ? "таймер истёк" : formatTime(timeLeft)}
          </span>

          <div className="timer-controls">
            <button
              className="ctrl-btn"
              onClick={handleToggle}
              disabled={isExpired}
              title={isRunning ? "Пауза" : "Возобновить"}
            >
              {isRunning ? '⏸️' : '▶️'}
            </button>
            <button
              className={`ctrl-btn ${isExpired ? 'highlight' : ''}`}
              onClick={handleRestart}
              title="Рестарт"
            >
              🔄
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}