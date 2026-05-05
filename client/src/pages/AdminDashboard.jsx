import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── PALETTE ─────────────────────────────────────────── */
const C = {
  accent: '#00adee',
  accentDark: '#0090c8',
  bg: '#f8f9fa',
  white: '#ffffff',
  text: '#111827',
  muted: '#6b7280',
  border: '#e5e7eb',
  borderFocus: '#00adee',
};

/* ─── SHARED STYLES ────────────────────────────────────── */
const inputStyle = (focused) => ({
  width: '100%', padding: '10px 13px', border: `1.5px solid ${focused ? C.borderFocus : C.border}`,
  fontSize: 13, color: C.text, outline: 'none', boxSizing: 'border-box',
  background: C.white, transition: 'border-color 0.2s', borderRadius: 0,
});

const labelStyle = {
  display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
  textTransform: 'uppercase', color: C.muted, marginBottom: 6,
};

const btnPrimary = {
  background: C.accent, color: '#fff', border: 'none', padding: '11px 22px',
  fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
  cursor: 'pointer', transition: 'background 0.2s',
};

const btnDanger = {
  background: '#fff', color: '#e53e3e', border: '1.5px solid #fed7d7',
  padding: '7px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer',
  letterSpacing: '0.06em', textTransform: 'uppercase',
};

const btnGhost = {
  background: '#fff', color: C.muted, border: `1.5px solid ${C.border}`,
  padding: '11px 22px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
};

/* ─── AUTH HEADER HELPER ───────────────────────────────── */
// FIX: Always attach the admin token to mutating requests so the
// backend doesn't reject them with 401/403 silently.
const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('admin_token') || ''}`,
});

/* ─── FIELD COMPONENT ──────────────────────────────────── */
const Field = ({ label, children, half }) => (
  <div style={{ flex: half ? '0 0 calc(50% - 8px)' : '1 1 100%' }}>
    <label style={labelStyle}>{label}</label>
    {children}
  </div>
);

/* ─── IMAGE UPLOAD ─────────────────────────────────────── */
const ImageUpload = ({ label, value, onChange }) => {
  const ref = useRef();
  const [focused, setFocused] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div
        onClick={() => ref.current.click()}
        style={{
          border: `2px dashed ${focused ? C.accent : C.border}`, background: '#fafafa',
          padding: 20, cursor: 'pointer', textAlign: 'center', transition: 'border-color 0.2s',
        }}
        onMouseEnter={() => setFocused(true)}
        onMouseLeave={() => setFocused(false)}
      >
        {value ? (
          <div style={{ position: 'relative' }}>
            <img src={value} alt="" style={{ maxHeight: 120, maxWidth: '100%', objectFit: 'cover' }} />
            <div style={{ fontSize: 11, color: C.accent, marginTop: 8 }}>Click to change</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📁</div>
            <div style={{ fontSize: 12, color: C.muted }}>Click to upload image</div>
            <div style={{ fontSize: 11, color: '#bbb', marginTop: 4 }}>PNG, JPG, WEBP</div>
          </div>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
    </div>
  );
};

/* ─── INPUT WITH FOCUS STATE ───────────────────────────── */
const Input = ({ value, onChange, placeholder, type = 'text', as }) => {
  const [focused, setFocused] = useState(false);
  const props = {
    value, onChange, placeholder,
    style: inputStyle(focused),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };
  if (as === 'textarea') return <textarea {...props} rows={3} style={{ ...inputStyle(focused), resize: 'vertical' }} />;
  return <input type={type} {...props} />;
};

const Select = ({ value, onChange, options, placeholder }) => {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={onChange}
      style={{ ...inputStyle(focused), appearance: 'none', cursor: 'pointer' }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
    </select>
  );
};

/* ─── SECTION HEADER ───────────────────────────────────── */
const SectionHeader = ({ title, subtitle, action }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
    <div>
      <div style={{ width: 28, height: 3, background: C.accent, marginBottom: 10 }} />
      <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: 0 }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{subtitle}</p>}
    </div>
    {action}
  </div>
);

/* ─── TOAST ────────────────────────────────────────────── */
const Toast = ({ msg, type }) => msg ? (
  <div style={{
    position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
    background: type === 'error' ? '#e53e3e' : C.accent,
    color: '#fff', padding: '12px 20px', fontSize: 13, fontWeight: 600,
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    animation: 'slideUp 0.3s ease',
  }}>
    {msg}
  </div>
) : null;

/* ─── MODAL WRAPPER ────────────────────────────────────── */
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: C.white, width: '100%', maxWidth: 680, maxHeight: '90vh',
        overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 28px', borderBottom: `1px solid ${C.border}`,
          position: 'sticky', top: 0, background: C.white, zIndex: 10,
        }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: C.text }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: C.muted, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: 28 }}>{children}</div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────── */
/*  WORKS SECTION                                           */
/* ──────────────────────────────────────────────────────── */
const EMPTY_PROJECT = {
  title: '', city: '', category: 'Residential', year: '',
  beforeImg: '', afterImg: '', description: '',
};

const WorksSection = ({ toast }) => {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_PROJECT);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const loadProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/projects');
      const data = await res.json();
      setProjects(data.data || []);
    } catch {
      setProjects([]);
    }
  };

  useEffect(() => { loadProjects(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY_PROJECT);
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p._id);
    setForm({
      title: p.title || '',
      city: p.city || '',
      category: p.category || 'Residential',
      year: p.year || '',
      description: p.description || '',
      beforeImg: p.images?.before || '',
      afterImg: p.images?.after || '',
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.city) return toast('Title and City are required', 'error');
    setSaving(true);

    const payload = {
      title: form.title,
      city: form.city,
      category: form.category,
      year: form.year,
      description: form.description,
      images: { before: form.beforeImg, after: form.afterImg },
    };

    try {
      let res;
      if (editing) {
        // FIX: was missing authHeaders() — backend was rejecting with 401/403
        res = await fetch(`http://localhost:5000/api/projects/${editing}`, {
          method: 'PUT',
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });
      } else {
        // FIX: was missing authHeaders() — backend was rejecting with 401/403
        res = await fetch('http://localhost:5000/api/projects', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });
      }

      // FIX: fetch() does NOT throw on HTTP errors (4xx/5xx).
      // Without this check the code was showing "Project added!" even when
      // the server returned 401/500 and nothing was saved to the DB.
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        toast(errData.message || `Save failed (${res.status})`, 'error');
        setSaving(false);
        return;
      }

      toast(editing ? 'Project updated!' : 'Project added!');
      setModalOpen(false);
      // Re-fetch so the dashboard grid reflects the new/edited project
      loadProjects();
    } catch {
      toast('Save failed — check your connection', 'error');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    try {
      // FIX: was missing authHeaders()
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });

      // FIX: check response status before assuming success
      if (!res.ok) {
        toast(`Delete failed (${res.status})`, 'error');
        return;
      }

      toast('Project deleted');
      setDeleteConfirm(null);
      loadProjects();
    } catch {
      toast('Delete failed', 'error');
    }
  };

  // FIX: Separate setter for plain string values (images) vs event-based inputs.
  // The original unified set() was brittle — ImageUpload passes a raw string,
  // not a synthetic event, so checking e.target was an accident waiting to happen.
  const setField = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));
  const setImage = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div>
      <SectionHeader
        title="Our Works"
        subtitle="Manage before & after project transformations"
        action={
          <button onClick={openNew} style={btnPrimary}>
            + Add Project
          </button>
        }
      />

      {/* GRID */}
      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: C.muted, border: `2px dashed ${C.border}` }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🏗️</div>
          <div style={{ fontSize: 14 }}>No projects yet. Click "Add Project" to get started.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {projects.map(p => (
            <div key={p._id} style={{ background: C.white, border: `1px solid ${C.border}`, overflow: 'hidden' }}>

              {/* IMAGES */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: 120 }}>
                {[p.images?.before, p.images?.after].map((img, i) => (
                  <div key={i} style={{ position: 'relative', overflow: 'hidden' }}>
                    {img
                      ? <img src={img} alt={i === 0 ? 'Before' : 'After'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div style={{ width: '100%', height: '100%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#bbb' }}>No image</div>
                    }
                    <div style={{
                      position: 'absolute', bottom: 4, left: 4, fontSize: 9, fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(0,0,0,0.6)',
                      color: '#fff', padding: '2px 6px',
                    }}>
                      {i === 0 ? 'Before' : 'After'}
                    </div>
                  </div>
                ))}
              </div>

              {/* INFO */}
              <div style={{ padding: '14px 16px' }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.title}
                </div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                  {[p.city, p.category].filter(Boolean).map(tag => (
                    <span key={tag} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', background: '#f0faff', color: C.accent, padding: '2px 8px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => openEdit(p)} style={{ ...btnPrimary, padding: '7px 14px', fontSize: 11, flex: 1 }}>
                    Edit
                  </button>
                  {deleteConfirm === p._id ? (
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button onClick={() => handleDelete(p._id)} style={{ ...btnDanger, background: '#e53e3e', color: '#fff', border: 'none' }}>
                        Confirm
                      </button>
                      <button onClick={() => setDeleteConfirm(null)} style={btnGhost}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(p._id)} style={btnDanger}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Project' : 'Add New Project'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Field label="Project Title" half={false}>
              {/* FIX: use setField() for event-based inputs */}
              <Input value={form.title} onChange={setField('title')} placeholder="e.g. Luxury Villa Renovation" />
            </Field>

            <Field label="City" half>
              <Select
                value={form.city}
                onChange={setField('city')}
                options={['Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore']}
                placeholder="Select city"
              />
            </Field>

            <Field label="Category" half>
              <Select
                value={form.category}
                onChange={setField('category')}
                options={['Residential', 'Commercial', 'Interior']}
              />
            </Field>

            <Field label="Year" half>
              <Input value={form.year} onChange={setField('year')} placeholder="e.g. 2024" type="number" />
            </Field>

            <Field label="Description">
              <Input value={form.description} onChange={setField('description')} placeholder="Short description of the project..." as="textarea" />
            </Field>
          </div>

          {/* IMAGE UPLOADS */}
          {/* FIX: use setImage() — ImageUpload calls onChange(base64string), not an event */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <ImageUpload label="Before Image" value={form.beforeImg} onChange={setImage('beforeImg')} />
            <ImageUpload label="After Image" value={form.afterImg} onChange={setImage('afterImg')} />
          </div>

          {/* ACTIONS */}
          <div style={{ display: 'flex', gap: 12, paddingTop: 8, borderTop: `1px solid ${C.border}`, marginTop: 4 }}>
            <button onClick={handleSave} disabled={saving} style={{ ...btnPrimary, flex: 1, opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving...' : editing ? 'Update Project' : 'Add Project'}
            </button>
            <button onClick={() => setModalOpen(false)} style={btnGhost}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ──────────────────────────────────────────────────────── */
/*  PRICING SECTION                                         */
/* ──────────────────────────────────────────────────────── */
const EMPTY_PACKAGE = {
  name: '', tagline: '', price: '', badge: '', featured: false,
  features: [''],
};

const PricingSection = ({ toast }) => {
  const [packages, setPackages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_PACKAGE);
  const [saving, setSaving] = useState(false);

  const loadPackages = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/packages');
      const data = await res.json();
      setPackages(data.data || []);
    } catch {
      setPackages([]);
    }
  };

  useEffect(() => { loadPackages(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY_PACKAGE);
    setModalOpen(true);
  };

  const openEdit = (pkg) => {
    setEditing(pkg.id);
    setForm({
      name: pkg.name || '',
      tagline: pkg.tagline || '',
      price: pkg.price || '',
      badge: pkg.badge || '',
      featured: pkg.featured || false,
      features: pkg.features?.length ? pkg.features : [''],
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) return toast('Name and Price are required', 'error');
    setSaving(true);

    const payload = {
      ...form,
      features: form.features.filter(f => f.trim()),
    };

    try {
      let res;
      if (editing) {
        // FIX: added authHeaders()
        res = await fetch(`http://localhost:5000/api/packages/${editing}`, {
          method: 'PUT',
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });
      } else {
        // FIX: added authHeaders()
        res = await fetch('http://localhost:5000/api/packages', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });
      }

      // FIX: check response status
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        toast(errData.message || `Save failed (${res.status})`, 'error');
        setSaving(false);
        return;
      }

      toast(editing ? 'Package updated!' : 'Package added!');
      setModalOpen(false);
      loadPackages();
    } catch {
      toast('Save failed', 'error');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    try {
      // FIX: added authHeaders()
      const res = await fetch(`http://localhost:5000/api/packages/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });

      if (!res.ok) {
        toast(`Delete failed (${res.status})`, 'error');
        return;
      }

      toast('Package deleted');
      loadPackages();
    } catch {
      toast('Delete failed', 'error');
    }
  };

  const setFeature = (i, val) => {
    setForm(f => {
      const features = [...f.features];
      features[i] = val;
      return { ...f, features };
    });
  };

  const addFeature = () => setForm(f => ({ ...f, features: [...f.features, ''] }));
  const removeFeature = (i) => setForm(f => ({ ...f, features: f.features.filter((_, j) => j !== i) }));

  return (
    <div>
      <SectionHeader
        title="Pricing Packages"
        subtitle="Add, edit or remove pricing tiers"
        action={
          <button onClick={openNew} style={btnPrimary}>
            + Add Package
          </button>
        }
      />

      {packages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: C.muted, border: `2px dashed ${C.border}` }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>💰</div>
          <div style={{ fontSize: 14 }}>No packages yet. Click "Add Package" to get started.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {packages.map(pkg => (
            <div key={pkg.id} style={{
              background: C.white, border: `1.5px solid ${pkg.featured ? C.accent : C.border}`,
              padding: 24, position: 'relative',
            }}>
              {pkg.badge && (
                <div style={{
                  position: 'absolute', top: -1, right: 20, background: C.accent, color: '#fff',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '3px 12px',
                }}>
                  {pkg.badge}
                </div>
              )}

              <div style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 4 }}>{pkg.name}</div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>{pkg.tagline}</div>

              <div style={{ fontSize: 28, fontWeight: 800, color: C.accent, marginBottom: 16 }}>
                ₹{pkg.price}<span style={{ fontSize: 12, fontWeight: 400, color: C.muted }}>/sq.ft</span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(pkg.features || []).slice(0, 4).map((f, i) => (
                  <li key={i} style={{ fontSize: 12, color: C.muted, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: C.accent, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
                {pkg.features?.length > 4 && (
                  <li style={{ fontSize: 11, color: C.accent }}>+{pkg.features.length - 4} more features</li>
                )}
              </ul>

              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => openEdit(pkg)} style={{ ...btnPrimary, padding: '8px 14px', fontSize: 11, flex: 1 }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(pkg.id)} style={btnDanger}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Package' : 'Add Pricing Package'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          <div style={{ display: 'flex', gap: 16 }}>
            <Field label="Package Name" half>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Royale" />
            </Field>
            <Field label="Price (₹ per sq.ft)" half>
              <Input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="e.g. 2,250" />
            </Field>
          </div>

          <Field label="Tagline">
            <Input value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} placeholder="Short description of this tier" />
          </Field>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Field label="Badge Label (optional)" half>
              <Input value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} placeholder="e.g. Most Popular" />
            </Field>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 18 }}>
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                style={{ width: 16, height: 16, accentColor: C.accent }}
              />
              <label htmlFor="featured" style={{ fontSize: 13, color: C.text, cursor: 'pointer' }}>
                Featured / Highlighted
              </label>
            </div>
          </div>

          {/* FEATURES */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <label style={labelStyle}>Features / Inclusions</label>
              <button onClick={addFeature} style={{
                background: 'none', border: `1px solid ${C.accent}`, color: C.accent,
                fontSize: 11, fontWeight: 700, cursor: 'pointer', padding: '4px 10px', letterSpacing: '0.05em',
              }}>
                + Add Feature
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {form.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <Input value={f} onChange={e => setFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`} />
                  </div>
                  {form.features.length > 1 && (
                    <button onClick={() => removeFeature(i)} style={{
                      background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: 18, lineHeight: 1, flexShrink: 0,
                    }}>
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, paddingTop: 8, borderTop: `1px solid ${C.border}`, marginTop: 4 }}>
            <button onClick={handleSave} disabled={saving} style={{ ...btnPrimary, flex: 1, opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving...' : editing ? 'Update Package' : 'Add Package'}
            </button>
            <button onClick={() => setModalOpen(false)} style={btnGhost}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ──────────────────────────────────────────────────────── */
/*  MAIN DASHBOARD                                          */
/* ──────────────────────────────────────────────────────── */
const AdminDashboard = () => {
  const [tab, setTab] = useState('works');
  const [toast, setToast_] = useState({ msg: '', type: 'success' });
  const navigate = useNavigate();

  const showToast = (msg, type = 'success') => {
    setToast_({ msg, type });
    setTimeout(() => setToast_({ msg: '', type: 'success' }), 3000);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const TABS = [
    { id: 'works', label: '🏗️  Our Works' },
    { id: 'pricing', label: '💰  Pricing' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        * { box-sizing: border-box; }
      `}</style>

      {/* TOPBAR */}
      <div style={{
        background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60,
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          ACE<span style={{ color: C.accent }}>CONSTRUCT</span>
          <span style={{ fontWeight: 400, fontSize: 11, color: C.muted, marginLeft: 12, letterSpacing: 0, textTransform: 'none' }}>
            Admin Panel
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="/" target="_blank" style={{ fontSize: 12, color: C.muted, textDecoration: 'none' }}>
            ↗ View Site
          </a>
          <button onClick={logout} style={{ ...btnGhost, padding: '7px 16px', fontSize: 12 }}>
            Log Out
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>

        {/* SIDEBAR */}
        <div style={{ width: 200, background: C.white, borderRight: `1px solid ${C.border}`, padding: '24px 0', flexShrink: 0 }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '12px 24px',
                background: tab === t.id ? '#f0faff' : 'none', border: 'none',
                borderLeft: `3px solid ${tab === t.id ? C.accent : 'transparent'}`,
                color: tab === t.id ? C.accent : C.muted,
                fontSize: 13, fontWeight: tab === t.id ? 700 : 400, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, padding: '36px 40px', maxWidth: 1100 }}>
          {tab === 'works' && <WorksSection toast={showToast} />}
          {tab === 'pricing' && <PricingSection toast={showToast} />}
        </div>
      </div>

      <Toast msg={toast.msg} type={toast.type} />
    </div>
  );
};

export default AdminDashboard;