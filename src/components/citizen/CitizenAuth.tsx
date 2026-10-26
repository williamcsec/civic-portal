import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Smartphone, Lock, CheckCircle } from 'lucide-react';

interface CitizenAuthProps {
  onSuccess: () => void;
}

type AuthStep = 'phone' | 'otp' | 'register';

export function CitizenAuth({ onSuccess }: CitizenAuthProps) {
  const [step, setStep] = useState<AuthStep>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!phone) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (!otp) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // If user exists, login, otherwise register
      if (phone === '1234567890') {
        onSuccess();
      } else {
        setStep('register');
      }
    }, 1500);
  };

  const handleRegister = async () => {
    if (!name) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#1E293B] border-[#475569]">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            {step === 'phone' && <Smartphone className="h-8 w-8 text-white" />}
            {step === 'otp' && <Lock className="h-8 w-8 text-white" />}
            {step === 'register' && <CheckCircle className="h-8 w-8 text-white" />}
          </div>
          <CardTitle className="text-white">
            {step === 'phone' && 'Enter Mobile Number'}
            {step === 'otp' && 'Verify OTP'}
            {step === 'register' && 'Complete Registration'}
          </CardTitle>
          <CardDescription className="text-gray-300">
            {step === 'phone' && 'We\'ll send you a verification code'}
            {step === 'otp' && `Enter the 6-digit code sent to ${phone}`}
            {step === 'register' && 'Tell us your name to complete setup'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 'phone' && (
            <>
              <div className="space-y-2">
                <label className="text-white">Mobile Number</label>
                <Input
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-[#334155] border-[#475569] text-white placeholder:text-gray-400 focus:border-blue-500"
                />
              </div>
              <Button 
                onClick={handleSendOTP}
                disabled={!phone || isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>
            </>
          )}

          {step === 'otp' && (
            <>
              <div className="space-y-2">
                <label className="text-white">OTP Code</label>
                <Input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="bg-[#334155] border-[#475569] text-white placeholder:text-gray-400 focus:border-blue-500 text-center text-lg tracking-widest"
                />
              </div>
              <Button 
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6 || isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setStep('phone')}
                className="w-full text-gray-300 hover:text-white hover:bg-[#334155]"
              >
                Change Number
              </Button>
            </>
          )}

          {step === 'register' && (
            <>
              <div className="space-y-2">
                <label className="text-white">Full Name</label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#334155] border-[#475569] text-white placeholder:text-gray-400 focus:border-blue-500"
                />
              </div>
              <Button 
                onClick={handleRegister}
                disabled={!name || isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isLoading ? 'Creating Account...' : 'Complete Registration'}
              </Button>
            </>
          )}

          <div className="pt-4 text-center">
            <p className="text-gray-400 text-sm">
              By continuing, you agree to our Terms of Service
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}