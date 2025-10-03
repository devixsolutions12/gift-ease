import React from 'react';
import { useNavigate } from 'react-router-dom';

const HelpPage = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I purchase a gift card?",
      answer: "Browse our gift cards on the homepage, click 'Buy Now' on your preferred card, complete the payment using UPI, and submit your transaction ID. Your order will be processed and you'll receive your gift code once approved."
    },
    {
      question: "What is UPI payment?",
      answer: "UPI (Unified Payments Interface) is a real-time payment system developed by the National Payments Corporation of India. It allows you to transfer money instantly between bank accounts using a mobile app."
    },
    {
      question: "How do I make a UPI payment?",
      answer: "1. Open your UPI-enabled app (Google Pay, PhonePe, Paytm, etc.)\n2. Scan the QR code or enter our UPI ID: giftease@upi\n3. Enter the amount as shown on the payment page\n4. Confirm the payment with your UPI PIN"
    },
    {
      question: "Where do I find the transaction ID?",
      answer: "After completing a UPI payment, you'll receive a transaction ID (also called UTR - Unique Transaction Reference) in your payment app or SMS confirmation. It's usually a 12-digit number."
    },
    {
      question: "How long does it take to receive my gift code?",
      answer: "Orders are typically processed within 1-2 hours during business hours. You'll receive an email notification once your order is approved and your gift code is ready in the 'Your Orders' section."
    },
    {
      question: "What if my order is rejected?",
      answer: "If your order is rejected, you'll receive an email with the reason. Common reasons include invalid transaction ID or payment mismatch. You can contact support for assistance."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we don't store any of your payment information. We only collect the transaction ID for verification purposes. All data is encrypted and stored securely."
    },
    {
      question: "Can I get a refund?",
      answer: "All sales are final. However, if there's an issue with your gift code, please contact support within 24 hours of receiving it for assistance."
    }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Gamer",
      content: "GiftEase is the best platform for getting game credits. The process is super simple and I got my Free Fire diamonds within an hour!",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Tech Enthusiast",
      content: "I've purchased multiple Play Store codes from GiftEase. Always reliable and the customer support is excellent.",
      rating: 5
    },
    {
      name: "Amit Kumar",
      role: "Student",
      content: "As a student, GiftEase helps me get BGMI UC at great prices. The instant delivery is a game-changer!",
      rating: 4
    },
    {
      name: "Sneha Gupta",
      role: "Content Creator",
      content: "I recommend GiftEase to all my viewers. The platform is trustworthy and the gift codes always work.",
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="help-page">
      <header className="header">
        <div className="container">
          <h1 className="logo">GiftEase</h1>
          <nav className="nav">
            <button onClick={() => navigate('/')} className="nav-button">
              Home
            </button>
            <button onClick={() => navigate('/orders')} className="nav-button">
              Your Orders
            </button>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <h2 className="section-title">Help & Support</h2>
          
          {/* Testimonials Section */}
          <section className="testimonials-section">
            <h3>What Our Customers Say</h3>
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="testimonial-info">
                      <h4>{testimonial.name}</h4>
                      <p className="testimonial-role">{testimonial.role}</p>
                      <div className="testimonial-rating">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="testimonial-content">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Trust Badges */}
          <section className="trust-section">
            <h3>Why Trust GiftEase?</h3>
            <div className="trust-badges">
              <div className="trust-badge">
                <div className="trust-icon">🔒</div>
                <h4>100% Secure</h4>
                <p>Your payments and data are protected with industry-standard encryption</p>
              </div>
              <div className="trust-badge">
                <div className="trust-icon">⚡</div>
                <h4>Instant Delivery</h4>
                <p>Get your gift codes delivered within minutes after payment confirmation</p>
              </div>
              <div className="trust-badge">
                <div className="trust-icon">🏆</div>
                <h4>Trusted by 10K+</h4>
                <p>Join thousands of satisfied customers who trust us for their digital needs</p>
              </div>
            </div>
          </section>
          
          {/* Payment Guide */}
          <section className="payment-guide">
            <h3>Manual Payment Process Guide</h3>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Select a Gift Card</h4>
                  <p>Choose from our available gift cards on the homepage and click "Buy Now".</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Complete UPI Payment</h4>
                  <p>Use your UPI app to pay the exact amount to our UPI ID: <strong>giftease@upi</strong></p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Get Transaction ID</h4>
                  <p>Copy the transaction ID (12-digit UTR) from your payment confirmation.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Submit Order</h4>
                  <p>Enter the transaction ID on the payment page and submit your order.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h4>Wait for Approval</h4>
                  <p>We'll verify your payment and approve your order within 1-2 hours.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">6</div>
                <div className="step-content">
                  <h4>Get Your Gift Code</h4>
                  <p>Once approved, your gift code will appear in the "Your Orders" section.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="faq-section">
            <h3>Frequently Asked Questions</h3>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h4 className="faq-question">Q: {faq.question}</h4>
                  <p className="faq-answer">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Support Section */}
          <section className="support-section">
            <h3>Need More Help?</h3>
            <div className="support-content">
              <div className="support-info">
                <p>If you have any other questions or need assistance, please contact our support team:</p>
                <p><strong>Email:</strong> support@giftease.com</p>
                <p><strong>Hours:</strong> Monday-Friday, 9:00 AM - 6:00 PM IST</p>
              </div>
              <div className="support-guarantee">
                <div className="guarantee-badge">
                  <div className="guarantee-icon">💯</div>
                  <h4>100% Satisfaction Guarantee</h4>
                  <p>We're committed to your complete satisfaction</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>GiftEase</h3>
              <p>Your trusted partner for digital gift cards and in-game currency.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><button onClick={() => navigate('/')} className="footer-link">Home</button></li>
                <li><button onClick={() => navigate('/help')} className="footer-link">Help Center</button></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact Us</h4>
              <p>Email: support@giftease.com</p>
              <p>Hours: 24/7 Support</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 GiftEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpPage;