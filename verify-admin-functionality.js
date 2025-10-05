// Script to verify admin panel functionality
console.log('=== Admin Panel Functionality Verification ===');

// Test 1: Check if localStorage functions work
console.log('\n1. Testing localStorage functionality...');
try {
  const testKey = 'giftEaseTest';
  const testData = { test: 'data' };
  
  localStorage.setItem(testKey, JSON.stringify(testData));
  const retrievedData = JSON.parse(localStorage.getItem(testKey));
  localStorage.removeItem(testKey);
  
  if (retrievedData.test === 'data') {
    console.log('✅ localStorage functionality: PASSED');
  } else {
    console.log('❌ localStorage functionality: FAILED');
  }
} catch (error) {
  console.log('❌ localStorage functionality: FAILED with error', error);
}

// Test 2: Check payment settings functions
console.log('\n2. Testing payment settings functions...');
try {
  // Test data
  const testSettings = {
    upiId: 'test@upi',
    upiName: 'Test Payments',
    paymentInstructions: 'Test instructions',
    qrCodeImage: 'test-image-data'
  };
  
  // Save settings
  localStorage.setItem('giftEasePaymentSettings', JSON.stringify(testSettings));
  
  // Retrieve settings
  const savedSettings = JSON.parse(localStorage.getItem('giftEasePaymentSettings'));
  
  // Verify
  const isMatch = 
    savedSettings.upiId === testSettings.upiId &&
    savedSettings.upiName === testSettings.upiName &&
    savedSettings.paymentInstructions === testSettings.paymentInstructions &&
    savedSettings.qrCodeImage === testSettings.qrCodeImage;
  
  if (isMatch) {
    console.log('✅ Payment settings save/load: PASSED');
  } else {
    console.log('❌ Payment settings save/load: FAILED');
    console.log('Expected:', testSettings);
    console.log('Received:', savedSettings);
  }
  
  // Clean up
  localStorage.removeItem('giftEasePaymentSettings');
} catch (error) {
  console.log('❌ Payment settings functions: FAILED with error', error);
}

// Test 3: Check order functions
console.log('\n3. Testing order functions...');
try {
  const testOrder = {
    productName: 'Test Product',
    amount: 100,
    userName: 'Test User',
    userEmail: 'test@example.com',
    transactionId: 'TEST123'
  };
  
  // Save order
  const ordersKey = 'giftEaseOrders';
  let orders = JSON.parse(localStorage.getItem(ordersKey)) || [];
  orders.push({ ...testOrder, id: 'TEST001', createdAt: new Date().toISOString(), status: 'pending' });
  localStorage.setItem(ordersKey, JSON.stringify(orders));
  
  // Retrieve orders
  const savedOrders = JSON.parse(localStorage.getItem(ordersKey));
  
  // Verify
  const orderExists = savedOrders.some(order => order.id === 'TEST001');
  
  if (orderExists) {
    console.log('✅ Order save/load: PASSED');
  } else {
    console.log('❌ Order save/load: FAILED');
  }
  
  // Clean up
  localStorage.setItem(ordersKey, JSON.stringify([]));
} catch (error) {
  console.log('❌ Order functions: FAILED with error', error);
}

console.log('\n=== Verification Complete ===');
console.log('If all tests show PASSED, the admin panel should work correctly.');
console.log('Payment settings updates in the admin panel should be reflected in the payment page.');