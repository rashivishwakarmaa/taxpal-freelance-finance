import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../config/api';

function SignUp() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(result.message || "Signup Failed");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-[#0B1120] animate-fade-in">
      <div className="bg-grain"></div>
      <div className="glow-orb"></div>

      <div className="relative z-10 w-full max-w-[440px]">
        <div className="glass-card rounded-[20px] p-8 sm:p-10 w-full">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 border border-blue-400/20 flex items-center justify-center shadow-lg shadow-blue-500/10">
                <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
            </div>
            <h1 className="font-display text-[26px] font-bold text-white mb-2">Create your TaxPal account</h1>
            <p className="text-slate-400 text-[14px] font-normal">Start managing your freelance finances today.</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-shake" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-400 ml-0.5" htmlFor="fullname">Full Name</label>
              <input className="w-full px-4 py-3 custom-input rounded-lg text-[14px] placeholder-slate-600 focus:ring-0" id="fullname" name="name" placeholder="John Doe" required type="text" value={signupInfo.name} onChange={handleChange} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-400 ml-0.5" htmlFor="email">Email address</label>
              <input className="w-full px-4 py-3 custom-input rounded-lg text-[14px] placeholder-slate-600 focus:ring-0" id="email" name="email" placeholder="name@company.com" required type="email" value={signupInfo.email} onChange={handleChange} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-400 ml-0.5" htmlFor="password">Password</label>
              <input className="w-full px-4 py-3 custom-input rounded-lg text-[14px] placeholder-slate-600 focus:ring-0" id="password" name="password" placeholder="Min. 8 characters" required minLength={6} type="password" value={signupInfo.password} onChange={handleChange} />
            </div>
            <div className="pt-2">
              <button className="w-full shimmer-btn font-bold py-3.5 rounded-lg text-[14px] text-slate-900 shadow-lg tracking-tight hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition-transform" type="submit" disabled={loading}>
                {loading ? 'Creating account...' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full separator-line"></div>
            </div>
            <div className="relative flex justify-center text-[12px]">
              <span className="bg-[#131926] px-3 text-slate-500 font-medium">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2.5 bg-slate-800/40 hover:bg-slate-700/50 text-slate-200 border border-slate-700/50 hover:border-slate-600/50 rounded-lg py-2.5 transition-all duration-200 text-[13px] font-medium group" type="button" disabled>
              <svg className="w-4 h-4 opacity-90 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2.5 bg-slate-800/40 hover:bg-slate-700/50 text-slate-200 border border-slate-700/50 hover:border-slate-600/50 rounded-lg py-2.5 transition-all duration-200 text-[13px] font-medium group" type="button">
              <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span>GitHub</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-[13px]">
              Already have an account?
              <Link to="/login" className="text-blue-400 font-medium hover:text-blue-300 transition-colors ml-1">Sign in</Link>
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8 text-[12px] font-medium text-slate-600">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;