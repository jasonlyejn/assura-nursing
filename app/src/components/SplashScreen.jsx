import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onFinish, minDuration = 1200 }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      const finishTimer = setTimeout(() => {
        if (onFinish) onFinish();
      }, 400); // 400ms fade out transition
      return () => clearTimeout(finishTimer);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [onFinish, minDuration]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #07192d 0%, #0c2b48 50%, #082035 100%)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        opacity: fading ? 0 : 1,
        transform: fading ? 'scale(1.03)' : 'scale(1)',
        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(2, 132, 199, 0.08) 50%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Logo Container with floating & scaling animation */}
      <div
        style={{
          position: 'relative',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'splashPop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          filter: 'drop-shadow(0 10px 30px rgba(56, 189, 248, 0.25))',
        }}
      >
        <img
          src="/logo.png?v=9"
          alt="Assura Nursing Care"
          style={{
            height: '110px',
            width: 'auto',
            maxHeight: '120px',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      {/* Title & Tagline with staggered slide-in */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '22px',
          animation: 'splashTextIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards',
          opacity: 0,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: '1.28rem',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
          Assura Nursing Care
        </h1>
        <p
          style={{
            margin: '6px 0 0',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: '#7dd3fc',
            letterSpacing: '0.4px',
          }}
        >
          Private Home Healthcare &amp; Critical Nursing Platform
        </p>
      </div>

      {/* Sleek Cyan Progress Bar */}
      <div
        style={{
          width: '140px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.12)',
          borderRadius: '4px',
          marginTop: '28px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #38bdf8 0%, #0284c7 100%)',
            borderRadius: '4px',
            boxShadow: '0 0 10px #38bdf8',
            animation: 'splashProgress 1.1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        />
      </div>

      <style>{`
        @keyframes splashPop {
          0% {
            opacity: 0;
            transform: scale(0.82) translateY(12px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes splashTextIn {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes splashProgress {
          0% {
            width: 0%;
          }
          60% {
            width: 75%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}