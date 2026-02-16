import { Link } from 'react-router-dom';

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Income & Expense Tracking',
    desc: 'Log all your freelance income and business expenses in one place.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Tax Estimation',
    desc: 'Get smart tax estimates so you're never surprised at year-end.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Data Visualization',
    desc: 'Charts and insights to understand your financial health at a glance.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0F111A] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" aria-hidden />
      <div className="glow-orb pointer-events-none" aria-hidden />

      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/30 to-indigo-500/20 border border-blue-400/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-semibold text-lg text-white">TaxPal</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/login" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg bg-white text-slate-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 animate-fade-up">
            Freelance finances,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">simplified.</span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 animate-fade-up animation-delay-100">
            Track income, expenses, and taxes in one place. Built for gig workers who want clarity without the complexity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-200">
            <Link
              to="/signup"
              className="px-6 py-3.5 rounded-xl bg-white text-slate-900 font-semibold hover:bg-gray-100 transition-all shadow-lg shadow-white/10 hover:shadow-xl"
            >
              Start free
            </Link>
            <Link
              to="/login"
              className="px-6 py-3.5 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-20 sm:mt-28 grid sm:grid-cols-3 gap-6 sm:gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-4 animate-fade-up"
              style={{ animationDelay: `${150 + i * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 py-8 px-4 text-center text-slate-500 text-sm">
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
