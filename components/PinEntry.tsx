import React, { useState, useRef, useEffect } from 'react';
import { Lock, AlertCircle, Loader2 } from 'lucide-react';

interface PinEntryProps {
  onSubmit: (pin: string) => Promise<void>;
  error?: string;
  attemptsRemaining?: number;
  projectName?: string;
}

export const PinEntry: React.FC<PinEntryProps> = ({
  onSubmit,
  error,
  attemptsRemaining,
  projectName,
}) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-advance to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when complete
    if (value && index === 3 && newPin.every(d => d !== '')) {
      handleSubmit(newPin.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pastedData.length === 4) {
      const newPin = pastedData.split('');
      setPin(newPin);
      handleSubmit(pastedData);
    }
  };

  const handleSubmit = async (pinValue: string) => {
    setIsLoading(true);
    try {
      await onSubmit(pinValue);
    } finally {
      setIsLoading(false);
      // Clear PIN on error
      setPin(['', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-6">
        <Lock className="w-8 h-8 text-primary" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter PIN</h2>
      <p className="text-gray-600 text-center mb-8 max-w-xs">
        {projectName ? (
          <>Enter the 4-digit PIN to access <span className="font-medium">{projectName}</span></>
        ) : (
          'Enter the 4-digit PIN to access this link'
        )}
      </p>

      <div className="flex gap-3 mb-6" onPaste={handlePaste}>
        {pin.map((digit, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            disabled={isLoading}
            className={`
              w-14 h-16 text-center text-2xl font-bold rounded-xl border-2
              transition-all duration-200 outline-none
              ${error
                ? 'border-red-300 bg-red-50'
                : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          />
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 mb-4">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {attemptsRemaining !== undefined && attemptsRemaining < 3 && (
        <p className="text-sm text-amber-600 mb-4">
          {attemptsRemaining} attempt{attemptsRemaining !== 1 ? 's' : ''} remaining
        </p>
      )}

      {isLoading && (
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Verifying...</span>
        </div>
      )}
    </div>
  );
};
