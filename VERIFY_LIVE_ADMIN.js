// Browser console script to verify admin panel functionality on the live site
console.log('=== Live Admin Panel Verification ===');

// Test 1: Check if localStorage is working
console.log('\n1. Testing localStorage functionality...');
try {
  const testKey = 'giftEaseLiveTest';
  const testData = { timestamp: new Date().toISOString(), test: true };
  
  localStorage.setItem(testKey, JSON.stringify(testData));
  const retrieved = JSON.parse(localStorage.getItem(testKey));
  localStorage.removeItem(testKey);
  
  if (retrieved.timestamp && retrieved.test) {
    console.log('✅ localStorage: WORKING');
  } else {
    console.log('❌ localStorage: ISSUE');
  }
} catch (error) {
  console.log('❌ localStorage: ERROR', error);
}

// Test 2: Check for payment settings
console.log('\n2. Checking payment settings...');
try {
  const settings = localStorage.getItem('giftEasePaymentSettings');
  if (settings) {
    const parsed = JSON.parse(settings);
    console.log('✅ Payment settings found:', {
      upiId: parsed.upiId,
      upiName: parsed.upiName,
      hasInstructions: !!parsed.paymentInstructions,
      hasQrCode: !!parsed.qrCodeImage
    });
  } else {
    console.log('ℹ️ No payment settings found (will use defaults)');
  }
} catch (error) {
  console.log('❌ Payment settings error:', error);
}

// Test 3: Check for admin token
console.log('\n3. Checking admin authentication...');
try {
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) {
    console.log('✅ Admin session active');
  } else {
    console.log('ℹ️ No active admin session (login required)');
  }
} catch (error) {
  console.log('❌ Admin auth error:', error);
}

// Test 4: Check for orders
console.log('\n4. Checking orders system...');
try {
  const orders = localStorage.getItem('giftEaseOrders');
  if (orders) {
    const parsed = JSON.parse(orders);
    console.log(`✅ Orders system active (${parsed.length} orders)`);
  } else {
    console.log('✅ Orders system active (no orders yet)');
  }
} catch (error) {
  console.log('❌ Orders system error:', error);
}

console.log('\n=== Verification Complete ===');
console.log('If you see mostly ✅ marks, the admin panel should work correctly.');
console.log('To test full functionality:');
console.log('1. Go to /admin/dashboard and login');
console.log('2. Update payment settings');
console.log('3. Visit any product payment page to verify settings updated');
console.log('4. Create a test order and process it through the admin panel');