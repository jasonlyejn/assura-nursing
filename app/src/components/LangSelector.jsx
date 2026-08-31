import React from 'react';
import { useI18n, LANGUAGES } from '../i18n.js';

export default function LangSelector({ compact = false, style = {} }) {
  const { lang, setLang } = useI18n();

  if (compact) {
    return (
      <div className="lang-selector-compact-wrap" style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0, ...style }}>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          aria-label="Select Language"
          className="lang-select-compact"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code} style={{ background: '#0d1f33', color: '#fff' }}>
              {l.flag} {l.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', margin: '10px 0', ...style }}>
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          style={{
            background: lang === l.code ? 'var(--blue)' : 'rgba(255, 255, 255, 0.9)',
            color: lang === l.code ? '#fff' : 'var(--ink)',
            border: lang === l.code ? '1.5px solid var(--blue)' : '1px solid var(--line)',
            borderRadius: '999px',
            padding: '6px 12px',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.15s ease',
            boxShadow: lang === l.code ? '0 2px 8px rgba(24, 96, 132, 0.35)' : 'none',
          }}
        >
          <span>{l.flag}</span>
          <span>{l.label}</span>
        </button>
      ))}
    </div>
  );
}
