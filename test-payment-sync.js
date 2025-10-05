// Test script to verify admin panel payment settings synchronization
console.log('Testing admin panel payment settings synchronization...');

// Test data
const testPaymentSettings = {
  upiId: 'test@upi',
  upiName: 'Test Payments',
  paymentInstructions: 'Test payment instructions',
  qrCodeImage: 'data:image/png;base64,test'
};

console.log('1. Saving test payment settings to localStorage...');
localStorage.setItem('giftEasePaymentSettings', JSON.stringify(testPaymentSettings));

console.log('2. Retrieving payment settings from localStorage...');
const retrievedSettings = JSON.parse(localStorage.getItem('giftEasePaymentSettings'));

console.log('3. Verifying settings match...');
const settingsMatch = 
  retrievedSettings.upiId === testPaymentSettings.upiId &&
  retrievedSettings.upiName === testPaymentSettings.upiName &&
  retrievedSettings.paymentInstructions === testPaymentSettings.paymentInstructions &&
  retrievedSettings.qrCodeImage === testPaymentSettings.qrCodeImage;

if (settingsMatch) {
  console.log('✅ Payment settings synchronization test PASSED');
} else {
  console.log('❌ Payment settings synchronization test FAILED');
  console.log('Expected:', testPaymentSettings);
  console.log('Received:', retrievedSettings);
}

console.log('4. Testing saveLocalPaymentSettings function...');
// Import and test the utility function
const { saveLocalPaymentSettings, getLocalPaymentSettings } = await import('./src/utils/localOrders.js');

const newSettings = {
  upiId: 'new@test',
  upiName: 'New Test Payments',
  paymentInstructions: 'New test payment instructions',
  qrCodeImage: 'data:image/png;base64,newtest'
};

const saveResult = saveLocalPaymentSettings(newSettings);
console.log('Save result:', saveResult);

const loadedSettings = getLocalPaymentSettings();
const functionTestPassed = 
  loadedSettings.upiId === newSettings.upiId &&
  loadedSettings.upiName === newSettings.upiName &&
  loadedSettings.paymentInstructions === newSettings.paymentInstructions &&
  loadedSettings.qrCodeImage === newSettings.qrCodeImage;

if (functionTestPassed) {
  console.log('✅ saveLocalPaymentSettings function test PASSED');
} else {
  console.log('❌ saveLocalPaymentSettings function test FAILED');
  console.log('Expected:', newSettings);
  console.log('Received:', loadedSettings);
}

console.log('Test completed.');