import React, { useState } from 'react';
import { X, Phone, ArrowLeft } from 'lucide-react';
import PhoneInput from './PhoneInput';
import OtpInput from './OtpInput';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export type LoginStep = 'phone' | 'otp';

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<LoginStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const[check, setCheck] = useState("")

  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone);
    setStep('otp');
  };

  const handleOtpVerify = (otp: string) => {
    localStorage.setItem("usernumber", phoneNumber.slice(3))
    console.log('OTP verified:', otp, 'for phone:', phoneNumber);
    // Here you would typically verify the OTP with your backend
    onClose();
  };

  const handleBack = () => {
    setStep('phone');
  };

  const handleClose = () => {
    setStep('phone');
    setPhoneNumber('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-[500000] w-[100vw] top-0 left-0 h-[100vh] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {step === 'otp' && (
              <button
                onClick={handleBack}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {step === 'phone' ? 'Login' : 'Verify OTP'}
              </h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="lg:p-6 p-3">
          {step === 'phone' ? (
            <PhoneInput onSubmit={handlePhoneSubmit} />
          ) : (
            <OtpInput 
              phoneNumber={phoneNumber} 
              onVerify={handleOtpVerify} 
              onResend={() => console.log('Resending OTP to:', phoneNumber)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;