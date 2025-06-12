import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface PhoneInputProps {
  onSubmit: (phoneNumber: string) => void;
}

const countries = [
  { code: '+1', name: 'US', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+91', name: 'IN', flag: '🇮🇳' },
  { code: '+86', name: 'CN', flag: '🇨🇳' },
  { code: '+81', name: 'JP', flag: '🇯🇵' },
  { code: '+49', name: 'DE', flag: '🇩🇪' },
  { code: '+33', name: 'FR', flag: '🇫🇷' },
];

const PhoneInput: React.FC<PhoneInputProps> = ({ onSubmit }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const fullPhoneNumber = `${selectedCountry.code}${phoneNumber}`;
    onSubmit(fullPhoneNumber);
    setIsLoading(false);
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Format based on country (simplified for demo)
    if (selectedCountry.code === '+1') {
      // US format: (123) 456-7890
      const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        return [match[1], match[2], match[3]]
          .filter(Boolean)
          .join('')
          .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
          .replace(/(\d{3})(\d{1,3})/, '($1) $2')
          .replace(/(\d{1,3})/, '($1');
      }
    }
    
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhoneNumber(value);
    setPhoneNumber(formatted);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600">
          Enter your mobile number to receive a verification code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <div className="flex">
            {/* Country Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="text-sm font-medium">{selectedCountry.code}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span className="text-sm">{country.name}</span>
                      <span className="text-sm text-gray-500 ml-auto">{country.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Input */}
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Enter your number"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!phoneNumber.trim() || isLoading}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Sending OTP...
            </div>
          ) : (
            'Send OTP'
          )}
        </button>
      </form>

      <div className="text-center text-xs text-gray-500">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </div>
    </div>
  );
};

export default PhoneInput;