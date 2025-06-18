import { useState, useEffect } from 'react';
import { CheckCircle, Download, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Confetti from '@/components/Confetti';
import AnimatedCheckmark from '@/components/AnimatedCheckmark';

const PaymentSuccessful = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const orderDetails = {
    orderNumber: "ORD-2024-001234",
    amount: "$99.99",
    date: new Date().toLocaleDateString(),
    items: [
      { name: "Premium Plan", quantity: 1, price: "$99.99" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {showConfetti && <Confetti />}
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        {/* Main Success Card */}
        <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm border-0 shadow-2xl animate-scale-in">
          <CardContent className="p-8 text-center">
            {/* Animated Checkmark */}
            <div className="mb-6">
              <AnimatedCheckmark />
            </div>

            {/* Success Message */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-600 mb-8 animate-fade-in">
              Thank you for your purchase. Your payment has been processed successfully.
            </p>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left animate-fade-in">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium">{orderDetails.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{orderDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold text-green-600 text-lg">{orderDetails.amount}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Receipt
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-300 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Receipt
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps Card */}
        <Card className="w-full max-w-2xl mt-6 bg-white/60 backdrop-blur-sm border-0 shadow-lg animate-fade-in">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-white/50">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Check your email</p>
                <p className="text-xs text-gray-500 mt-1">Confirmation sent</p>
              </div>
              <div className="p-4 rounded-lg bg-white/50">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Access your account</p>
                <p className="text-xs text-gray-500 mt-1">Features unlocked</p>
              </div>
              <div className="p-4 rounded-lg bg-white/50">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Get support</p>
                <p className="text-xs text-gray-500 mt-1">24/7 assistance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button 
          size="lg"
          className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-4 rounded-full font-medium transition-all duration-200 hover:scale-105 animate-fade-in"
        >
          Continue to Dashboard
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
