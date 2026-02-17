import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const COUNTRY_OPTIONS = [
  { code: 'US', name: 'United States' },
  { code: 'IN', name: 'India' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
];

export default function Settings() {
  const { user, updateUser } = useAuth();
  const [country, setCountry] = useState(user?.country || 'US');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setCountry(user?.country || 'US');
  }, [user?.country]);

  const handleSaveCountry = async (e) => {
    e.preventDefault();
    setMessage('');
    setSaving(true);
    try {
      const data = await api('PATCH', '/auth/me', { country });
      updateUser(data.user);
      setMessage('Country saved. Tax estimates will use this country\'s rules.');
    } catch (err) {
      setMessage(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 mt-1">Manage your account and tax preferences</p>
        </div>
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Tax country</h2>
            <p className="text-slate-400 text-sm mb-4">Choose your country for tax estimation. Calculations use simplified rules for that jurisdiction.</p>
            <form onSubmit={handleSaveCountry} className="flex flex-wrap items-end gap-4">
              <div className="min-w-[200px]">
                <label className="block text-sm text-slate-400 mb-1">Country</label>
                <select
                  className="w-full px-4 py-2.5 custom-input rounded-lg text-white"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {COUNTRY_OPTIONS.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium disabled:opacity-70"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </form>
            {message && (
              <p className={`mt-2 text-sm ${message.startsWith('Country saved') ? 'text-emerald-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Profile</h2>
            <p className="text-slate-400 text-sm">Name and email are set at signup. More options coming soon.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
