import React, { useState } from 'react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';

interface WaitlistFormProps {
  variant?: 'hero' | 'compact';
  darkMode?: boolean;
  id?: string;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ variant = 'hero', darkMode = false, id }) => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setState('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setState('submitting');
    // TODO: Replace with real API endpoint
    await new Promise((r) => setTimeout(r, 1000));
    setState('success');
  };

  if (state === 'success') {
    return (
      <div id={id} className={`flex items-center gap-3 py-4 ${darkMode ? 'text-white' : 'text-[#181411]'}`}>
        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
        <div>
          <p className="font-bold text-base">You're on the list!</p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>We'll email you when Snaglist launches.</p>
        </div>
      </div>
    );
  }

  const isHero = variant === 'hero';

  return (
    <form id={id} onSubmit={handleSubmit} className={`flex ${isHero ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'} gap-3 w-full ${isHero ? 'max-w-lg' : 'max-w-md'}`}>
      <div className="relative flex-1">
        <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
          placeholder="Enter your work email"
          className={`w-full pl-10 pr-4 h-12 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
            darkMode
              ? 'bg-white/10 border border-white/20 text-white placeholder-gray-500'
              : 'bg-white border border-gray-200 text-[#181411] placeholder-gray-400'
          } ${state === 'error' ? 'border-red-400 focus:ring-red-400' : ''}`}
        />
      </div>
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-primary hover:bg-orange-600 text-white text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 duration-200 disabled:opacity-70 disabled:hover:translate-y-0 whitespace-nowrap"
      >
        {state === 'submitting' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          'Join the Waitlist'
        )}
      </button>
      {state === 'error' && (
        <p className="text-red-400 text-xs sm:absolute sm:-bottom-5">{errorMsg}</p>
      )}
    </form>
  );
};
