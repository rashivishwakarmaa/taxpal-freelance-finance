import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { api } from '../utils/api';

const CATEGORIES = ['Software', 'Equipment', 'Office', 'Travel', 'Marketing', 'Education', 'Insurance', 'Other'];

function formatDate(d) {
  return new Date(d).toISOString().slice(0, 10);
}
function formatCurrency(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ amount: '', description: '', category: 'Other', date: formatDate(new Date()), isTaxDeductible: true });
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    api('GET', '/expenses')
      .then((data) => setExpenses(data.expenses || []))
      .catch(() => setExpenses([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api('POST', '/expenses', {
        amount: Number(form.amount),
        description: form.description,
        category: form.category,
        date: form.date,
        isTaxDeductible: form.isTaxDeductible,
      });
      setForm({ amount: '', description: '', category: 'Other', date: formatDate(new Date()), isTaxDeductible: true });
      setShowForm(false);
      load();
    } catch (err) {
      alert(err.message || 'Failed to add expense');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this expense?')) return;
    try {
      await api('DELETE', `/expenses/${id}`);
      load();
    } catch (err) {
      alert(err.message || 'Failed to delete');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Expenses</h1>
            <p className="text-slate-400 mt-1">Track business expenses and deductions</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Expense'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">Add Expense</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Amount ($)</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 custom-input rounded-lg"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Date</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2 custom-input rounded-lg"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Category</label>
                <select
                  className="w-full px-4 py-2 custom-input rounded-lg"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isTaxDeductible}
                    onChange={(e) => setForm({ ...form, isTaxDeductible: e.target.checked })}
                  />
                  Tax deductible
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Description (optional)</label>
              <input
                type="text"
                className="w-full px-4 py-2 custom-input rounded-lg"
                placeholder="Brief description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <button type="submit" disabled={submitting} className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium disabled:opacity-70">
              {submitting ? 'Adding...' : 'Add Expense'}
            </button>
          </form>
        )}

        <div className="glass-card rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading...</div>
          ) : expenses.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No expenses yet. Add one above.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Description</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Category</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">Amount</th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((e) => (
                    <tr key={e._id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4 text-white">{formatDate(e.date)}</td>
                      <td className="py-3 px-4 text-slate-300">{e.description || '—'}</td>
                      <td className="py-3 px-4 text-slate-400">{e.category}</td>
                      <td className="py-3 px-4 text-right text-amber-400 font-medium">{formatCurrency(e.amount)}</td>
                      <td className="py-3 px-4">
                        <button onClick={() => handleDelete(e._id)} className="text-red-400 hover:text-red-300 text-sm" title="Delete">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
