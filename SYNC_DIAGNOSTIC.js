// GiftEase Payment Settings Sync Diagnostic
// Run this in the browser console to check sync status

console.log('=== GiftEase Sync Diagnostic ===');

// Check localStorage values
console.log('\n1. Local Storage Values:');
const paymentSettings = localStorage.getItem('giftEasePaymentSettings');
if (paymentSettings) {
  const parsed = JSON.parse(paymentSettings);
  console.log('UPI ID:', parsed.upiId);
  console.log('UPI Name:', parsed.upiName);
  console.log('Last Updated:', new Date(localStorage.getItem('giftEaseLastSync') || Date.now()));
} else {
  console.log('No payment settings found in localStorage');
}

// Check cloud sync values
console.log('\n2. Cloud Sync Values:');
const cloudSettings = localStorage.getItem('giftEaseCloudSettings');
if (cloudSettings) {
  const parsed = JSON.parse(cloudSettings);
  console.log('Cloud UPI ID:', parsed.settings.upiId);
  console.log('Cloud UPI Name:', parsed.settings.upiName);
  console.log('Cloud Timestamp:', new Date(parsed.timestamp));
  console.log('Device ID:', parsed.deviceId);
} else {
  console.log('No cloud settings found');
}

// Check for sync differences
console.log('\n3. Sync Status:');
if (paymentSettings && cloudSettings) {
  const localParsed = JSON.parse(paymentSettings);
  const cloudParsed = JSON.parse(cloudSettings);
  
  if (localParsed.upiId === cloudParsed.settings.upiId && 
      localParsed.upiName === cloudParsed.settings.upiName) {
    console.log('✅ Local and cloud settings are in sync');
  } else {
    console.log('⚠️  Local and cloud settings differ');
    console.log('   Local UPI ID:', localParsed.upiId);
    console.log('   Cloud UPI ID:', cloudParsed.settings.upiId);
  }
} else {
  console.log('⚠️  Unable to compare settings (missing data)');
}

// Manual sync test
console.log('\n4. Manual Sync Test:');
console.log('Run this command to force a sync:');
console.log('cloudSync.syncSettings(getLocalPaymentSettings())');

console.log('\n5. Auto-sync Status:');
console.log('Auto-sync runs every 30 seconds automatically');
console.log('Check back in 30-60 seconds to see if settings update');

console.log('\n=== End Diagnostic ===');