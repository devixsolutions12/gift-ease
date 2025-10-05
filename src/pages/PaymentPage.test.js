import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PaymentPage from './PaymentPage';

// Mock react-google-recaptcha
jest.mock('react-google-recaptcha', () => {
  return function MockReCAPTCHA() {
    return <div data-testid="recaptcha">ReCAPTCHA</div>;
  };
});

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    productType: 'play-store'
  })
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock saveLocalOrder
jest.mock('../utils/localOrders', () => ({
  saveLocalOrder: jest.fn().mockImplementation((orderData) => {
    return { id: 'test-order-id-123', ...orderData };
  })
}));

describe('PaymentPage', () => {
  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  test('renders order summary card', () => {
    renderWithRouter(<PaymentPage />);
    
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Play Store Redeem Code')).toBeInTheDocument();
    expect(screen.getByText('₹500')).toBeInTheDocument();
  });

  test('renders payment instructions card', () => {
    renderWithRouter(<PaymentPage />);
    
    expect(screen.getByText('Payment Instructions')).toBeInTheDocument();
    expect(screen.getByText('Follow these steps to complete your payment:')).toBeInTheDocument();
  });

  test('renders transaction form card', () => {
    renderWithRouter(<PaymentPage />);
    
    expect(screen.getByText('Transaction Details')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Transaction ID')).toBeInTheDocument();
  });

  test('renders trust badges', () => {
    renderWithRouter(<PaymentPage />);
    
    expect(screen.getByText('Secure Payment')).toBeInTheDocument();
    expect(screen.getByText('Fast Delivery')).toBeInTheDocument();
    expect(screen.getByText('Genuine Products')).toBeInTheDocument();
    expect(screen.getByText('24/7 Support')).toBeInTheDocument();
  });
});