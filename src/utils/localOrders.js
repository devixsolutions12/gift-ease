// Local storage utility for orders
const LOCAL_ORDERS_KEY = 'giftEaseOrders';

// Generate a random order ID in the format GFT12345
const generateOrderID = () => {
  const prefix = 'GFT';
  const randomNum = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
  return `${prefix}${randomNum}`;
};

export const getLocalOrders = () => {
  try {
    const orders = localStorage.getItem(LOCAL_ORDERS_KEY);
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error('Error reading local orders:', error);
    return [];
  }
};

export const saveLocalOrder = (order) => {
  try {
    const orders = getLocalOrders();
    const newOrder = {
      ...order,
      id: generateOrderID(), // Generate user-friendly order ID
      createdAt: new Date().toISOString(),
      status: 'pending',
      giftCode: '',
      rejectionReason: ''
    };
    orders.push(newOrder);
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
    return newOrder;
  } catch (error) {
    console.error('Error saving local order:', error);
    return null;
  }
};

export const updateLocalOrder = (orderId, updates) => {
  try {
    const orders = getLocalOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
      orders[orderIndex] = { ...orders[orderIndex], ...updates };
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
      return orders[orderIndex];
    }
    return null;
  } catch (error) {
    console.error('Error updating local order:', error);
    return null;
  }
};

export const getLocalOrderById = (orderId) => {
  try {
    const orders = getLocalOrders();
    return orders.find(order => order.id === orderId) || null;
  } catch (error) {
    console.error('Error finding local order:', error);
    return null;
  }
};

export const getLocalPaymentSettings = () => {
  try {
    const settings = localStorage.getItem('giftEasePaymentSettings');
    return settings ? JSON.parse(settings) : {
      upiId: 'giftease@upi',
      upiName: 'GiftEase Payments',
      paymentInstructions: 'Please make the payment using UPI to the following details:\n1. Open your UPI app (Google Pay, PhonePe, Paytm, etc.)\n2. Scan the QR code or enter the UPI ID above\n3. Enter the exact amount\n4. Complete the payment and note the transaction ID',
      qrCodeImage: ''
    };
  } catch (error) {
    console.error('Error reading local payment settings:', error);
    return {
      upiId: 'giftease@upi',
      upiName: 'GiftEase Payments',
      paymentInstructions: 'Please make the payment using UPI to the following details:\n1. Open your UPI app (Google Pay, PhonePe, Paytm, etc.)\n2. Scan the QR code or enter the UPI ID above\n3. Enter the exact amount\n4. Complete the payment and note the transaction ID',
      qrCodeImage: ''
    };
  }
};

export const saveLocalPaymentSettings = (settings) => {
  try {
    localStorage.setItem('giftEasePaymentSettings', JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving local payment settings:', error);
    return false;
  }
};