// Razorpay Payment Integration
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
  try {
    // In a real implementation, this would call your backend API
    // For demo purposes, we'll simulate the order creation
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id: orderId,
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      status: 'created'
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

export const initiateRazorpayPayment = async (
  amount: number,
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  },
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  try {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      throw new Error('Failed to load Razorpay script');
    }

    const order = await createRazorpayOrder(amount);

    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_1234567890', // Replace with your actual key
      amount: order.amount,
      currency: order.currency,
      name: 'Kerala Tour Guide',
      description: 'Tour Package Booking',
      order_id: order.id,
      handler: (response) => {
        // Verify payment on backend in real implementation
        onSuccess(response);
      },
      prefill: {
        name: customerDetails.name,
        email: customerDetails.email,
        contact: customerDetails.phone,
      },
      theme: {
        color: '#059669', // Emerald-600
      },
      modal: {
        ondismiss: () => {
          onError(new Error('Payment cancelled by user'));
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    onError(error);
  }
};
