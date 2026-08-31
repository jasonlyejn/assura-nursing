import { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function ConsumablesClockOutModal({ onConfirm, onSkip, onClose }) {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState({}); // { [itemId]: { item, qty } }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getItems().then((d) => {
      setItems(d.items || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  function setQty(it, delta) {
    const cur = selectedItems[it.id]?.qty || 0;
    const next = Math.max(0, cur + delta);
    if (next === 0) {
      const copy = { ...selectedItems };
      delete copy[it.id];
      setSelectedItems(copy);
    } else {
      setSelectedItems({
        ...selectedItems,
        [it.id]: { item: it, qty: next },
      });
    }
  }

  const filtered = items.filter((it) => {
    const q = query.toLowerCase();
    return (
      (it.name || '').toLowerCase().includes(q) ||
      (it.brand || '').toLowerCase().includes(q) ||
      (it.size || '').toLowerCase().includes(q) ||
      (it.category || '').toLowerCase().includes(q)
    );
  });

  const selectedList = Object.values(selectedItems);
  const totalCost = selectedList.reduce((sum, x) => sum + (x.qty * (Number(x.item.price) || 0)), 0);

  function handleComplete() {
    const formatted = selectedList.map((x) => ({
      item_id: x.item.id,
      name: `${x.item.name} (${x.item.brand || ''} ${x.item.size || ''})`.trim(),
      qty: x.qty,
      price: Number(x.item.price) || 0,
      total: x.qty * (Number(x.item.price) || 0),
    }));
    onConfirm(formatted);
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10,20,40,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 105,
        padding: '16px',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '14px',
          padding: '20px',
          width: 'min(580px, 96vw)',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <h3 style={{ margin: 0, color: '#0d3a54', fontSize: '1.15rem' }}>
              📦 Consumables Used in Visit (本次使用耗材)
            </h3>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
              Check off any dressings, tubes, or syringes used from your bag to automatically bill the patient.
            </div>
          </div>
          <button className="link" onClick={onClose} style={{ fontSize: '1.2rem' }}>✕</button>
        </div>

        {/* SEARCH BAR */}
        <input
          type="search"
          placeholder="🔍 Search consumable (e.g. Aquacel, Foley Fr16, Syringe, Duoderm)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ margin: '8px 0 12px', padding: '8px 12px' }}
          autoFocus
        />

        {/* ITEMS LIST */}
        <div style={{ flex: 1, overflowY: 'auto', maxHeight: '42vh', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '6px' }}>
          {loading ? (
            <p className="muted" style={{ padding: '12px', textAlign: 'center' }}>Loading catalog items…</p>
          ) : filtered.length === 0 ? (
            <p className="muted" style={{ padding: '12px', textAlign: 'center' }}>No matching items found.</p>
          ) : (
            filtered.map((it) => {
              const qty = selectedItems[it.id]?.qty || 0;
              return (
                <div
                  key={it.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 10px',
                    borderBottom: '1px solid #f1f5f9',
                    background: qty > 0 ? '#f0fdf4' : 'transparent',
                    borderRadius: '6px',
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '8px' }}>
                    <b style={{ color: '#0d3a54', fontSize: '0.86rem' }}>{it.name}</b>
                    <div style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>
                      {it.brand ? `${it.brand} · ` : ''}{it.size ? `${it.size} · ` : ''}RM {Number(it.price || 0).toFixed(2)} / {it.uom || 'EACH'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      className="ghost xs"
                      onClick={() => setQty(it, -1)}
                      disabled={qty === 0}
                      style={{ padding: '2px 8px', fontWeight: 800 }}
                    >
                      -
                    </button>
                    <b style={{ minWidth: '20px', textAlign: 'center', fontSize: '0.95rem', color: qty > 0 ? '#15803d' : '#94a3b8' }}>
                      {qty}
                    </b>
                    <button
                      type="button"
                      className="pri xs"
                      onClick={() => setQty(it, 1)}
                      style={{ padding: '2px 8px', fontWeight: 800 }}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* SUMMARY & ACTION BAR */}
        <div style={{ marginTop: '14px', borderTop: '1.5px solid #e2e8f0', paddingTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: '#475569' }}>
              Items Selected: <b>{selectedList.length}</b> ({selectedList.reduce((n, x) => n + x.qty, 0)} units)
            </span>
            <b style={{ fontSize: '1.1rem', color: '#15803d' }}>
              Total: RM {totalCost.toFixed(2)}
            </b>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button className="ghost sm" onClick={onSkip}>
              Skip (No Consumables Used)
            </button>
            <button className="pri sm" onClick={handleComplete} style={{ fontWeight: 800 }}>
              ✓ Complete Clock Out ({selectedList.length > 0 ? `+RM ${totalCost.toFixed(2)}` : '0 items'})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
