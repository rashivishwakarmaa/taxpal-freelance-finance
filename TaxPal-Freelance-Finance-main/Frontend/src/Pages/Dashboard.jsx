import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { api } from '../utils/api';

function formatCurrency(n) {
  if (n == null || isNaN(n)) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('GET', '/dashboard/stats')
      .then((data) => setStats(data.stats))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const taxSub = stats?.taxBreakdown?.countryName
    ? `${stats.taxBreakdown.countryName} rules`
    : 'Based on income & expenses';
  const statCards = stats
    ? [
        { label: 'Total Income', value: formatCurrency(stats.totalIncome), sub: 'This year' },
        { label: 'Total Expenses', value: formatCurrency(stats.totalExpenses), sub: 'This year' },
        { label: 'Estimated Tax', value: formatCurrency(stats.estimatedTax), sub: taxSub },
      ]
    : [
        { label: 'Total Income', value: loading ? '...' : '—', sub: loading ? 'Loading...' : 'Add income to see' },
        { label: 'Total Expenses', value: loading ? '...' : '—', sub: loading ? 'Loading...' : 'Add expenses to see' },
        { label: 'Estimated Tax', value: loading ? '...' : '—', sub: loading ? 'Loading...' : 'Add data to see' },
      ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Your financial overview at a glance</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {statCards.map((s) => (
            <div
              key={s.label}
              className="glass-card rounded-2xl p-6 animate-fade-up"
            >
              <p className="text-slate-400 text-sm font-medium">{s.label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-white mt-2">{s.value}</p>
              <p className="text-slate-500 text-xs mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8 animate-fade-up animation-delay-100">
          <h2 className="text-lg font-semibold text-white mb-4">Quick actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/income" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="font-medium text-white">Add income</span>
            </Link>
            <Link to="/expenses" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </div>
              <span className="font-medium text-white">Add expense</span>
            </Link>
            <Link to="/tax" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium text-white">Tax estimate</span>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
