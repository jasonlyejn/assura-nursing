import { useState } from 'react';

export default function SosModal({ patient, caseId, onClose, me }) {
  const [copied, setCopied] = useState(false);
  const p = patient || {};

  const emergencyText = `🚨 *[EMERGENCY MEDICAL DISPATCH / 紧急呼救]* 🚨\n`
    + `👤 *Patient:* ${p.name || 'Patient'} (${p.age ? p.age + 'yo' : ''}, ${p.sex || ''})\n`
    + `📍 *Exact GPS Address:* ${p.address || 'Address on file'}\n`
    + `🩺 *Medical Diagnosis & Brief:* ${p.case_brief || p.notes || 'Home nursing care patient'}\n`
    + `⚠️ *Allergies & Cautions:* ${p.allergies || 'NIL KNOWN'}\n`
    + `🩻 *Active Tubes:* ${p.devices_tubes || 'None'}\n`
    + `📞 *Family NOK:* ${p.emergency_contacts || p.phone || 'Contact on file'}\n`
    + `👩‍⚕️ *Attending Nurse on Scene:* ${me?.name || 'Assura Nurse'} (${me?.phone || ''})\n`
    + `⏰ *Time of Incident:* ${new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' })}\n\n`
    + `_Immediate medical dispatch / ambulance response requested._`;

  function copyText() {
    navigator.clipboard.writeText(emergencyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  function openWhatsAppDispatcher() {
    window.open('https://wa.me/?text=' + encodeURIComponent(emergencyText), '_blank');
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(120,0,0,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 110,
        padding: '16px',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '14px',
          padding: '20px',
          width: 'min(480px, 96vw)',
          borderTop: '8px solid #dc2626',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h2 style={{ margin: 0, color: '#991b1b', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🚨</span> EMERGENCY SOS BEACON
          </h2>
          <button className="link" onClick={onClose} style={{ fontSize: '1.2rem' }}>✕</button>
        </div>

        <p style={{ fontSize: '0.84rem', color: '#475569', margin: '4px 0 14px' }}>
          Patient in acute distress or medical emergency. Use 1-tap dial buttons below:
        </p>

        {/* 1-TAP EMERGENCY DIAL BUTTONS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
          <a
            href="tel:999"
            style={{
              background: '#dc2626',
              color: '#fff',
              padding: '14px 10px',
              borderRadius: '10px',
              textAlign: 'center',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: '1.05rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 4px 12px rgba(220,38,38,0.35)',
            }}
          >
            <span>🚑 Call 999</span>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, opacity: 0.9 }}>Malaysia Emergency</span>
          </a>

          <a
            href="tel:999"
            style={{
              background: '#0d3a54',
              color: '#fff',
              padding: '14px 10px',
              borderRadius: '10px',
              textAlign: 'center',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: '1.05rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 4px 12px rgba(13,58,84,0.25)',
            }}
          >
            <span>📞 Call Supervisor</span>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, opacity: 0.9 }}>Assura On-Call Manager</span>
          </a>
        </div>

        {/* DISPATCH TEXT HELPER */}
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '0.8rem',
            color: '#7f1d1d',
            marginBottom: '14px',
          }}
        >
          <b>📍 Patient Address for Dispatcher:</b><br />
          <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{p.address || 'Address on file'}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="pri"
            onClick={copyText}
            style={{ flex: 1, padding: '10px', fontWeight: 700, fontSize: '0.85rem' }}
          >
            {copied ? '✓ Copied Dispatch Text!' : '📋 Copy Patient SOS Summary'}
          </button>
          <button
            className="ghost"
            onClick={openWhatsAppDispatcher}
            style={{ flex: 1, padding: '10px', fontWeight: 700, fontSize: '0.85rem' }}
          >
            💬 Send via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
