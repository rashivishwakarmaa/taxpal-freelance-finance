import DashboardLayout from '../components/DashboardLayout';

export default function Tax() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Tax Estimate</h1>
          <p className="text-slate-400 mt-1">Get an estimate of your freelance tax liability</p>
        </div>
        <div className="glass-card rounded-2xl p-8 text-center text-slate-400">
          <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <p>Tax estimation will be available once the backend is connected.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
