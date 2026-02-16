import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder - backend will implement later
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-[#0F111A] animate-fade-in">
      <div className="bg-grain opacity-40" aria-hidden />
      <div className="glow-orb" aria-hidden />
      <div className="relative z-10 w-full max-w-[420px]">
        <div className="glass-card rounded-[20px] p-8 sm:p-10 w-full">
          <div className="text-center mb-6">
            <h1 className="text-[28px] font-bold text-white mb-2">Reset password</h1>
            <p className="text-slate-400 text-[15px]">Enter your email and we’ll send a reset link.</p>
          </div>
          {sent ? (
            <p className="text-slate-400 text-center py-4">Check your email for the reset link. (Backend not implemented yet.)</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[13px] font-medium text-slate-400 ml-1 block mb-2" htmlFor="email">Email</label>
                <input
                  className="w-full px-4 py-3 custom-input rounded-lg text-[15px] placeholder-slate-600 focus:ring-0"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button className="w-full bg-white hover:bg-gray-50 text-slate-900 font-bold py-3.5 rounded-lg text-[15px] shadow-lg shadow-white/10 transition-all" type="submit">
                Send reset link
              </button>
            </form>
          )}
          <div className="mt-6 text-center">
            <Link to="/login" className="text-blue-400 text-sm font-medium hover:text-blue-300">Back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
