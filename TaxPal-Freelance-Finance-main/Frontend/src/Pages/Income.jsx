import DashboardLayout from '../components/DashboardLayout';

export default function Income() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Income</h1>
          <p className="text-slate-400 mt-1">Track your freelance income and invoices</p>
        </div>
        <div className="glass-card rounded-2xl p-8 text-center text-slate-400">
          <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Income tracking will be available once the backend is connected.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
