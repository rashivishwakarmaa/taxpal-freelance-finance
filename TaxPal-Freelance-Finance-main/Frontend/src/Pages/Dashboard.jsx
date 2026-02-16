import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const stats = [
  { label: 'Total Income', value: '—', sub: 'Connect data to see' },
  { label: 'Total Expenses', value: '—', sub: 'Connect data to see' },
  { label: 'Estimated Tax', value: '—', sub: 'Connect data to see' },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Your financial overview at a glance</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((s) => (
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
