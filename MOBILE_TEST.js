// Mobile Responsiveness Test
// Run this in the browser console at http://localhost:3012/packages/play-store

console.log('=== MOBILE RESPONSIVENESS TEST ===');

// Test 1: Check current viewport size
console.log('\n1. Current viewport size:');
console.log(`Width: ${window.innerWidth}px, Height: ${window.innerHeight}px`);

// Test 2: Check if mobile navigation is visible
console.log('\n2. Mobile navigation visibility:');
const mobileNav = document.querySelector('.mobile-navigation');
if (mobileNav) {
  const computedStyle = window.getComputedStyle(mobileNav);
  if (computedStyle.display !== 'none') {
    console.log('✅ Mobile navigation is visible');
  } else {
    console.log('ℹ️ Mobile navigation is hidden (may be correct based on screen size)');
  }
} else {
  console.log('❌ Mobile navigation not found');
}

// Test 3: Check if desktop navigation is hidden on mobile
console.log('\n3. Desktop navigation status:');
const desktopNav = document.querySelector('.header .nav');
if (desktopNav) {
  const computedStyle = window.getComputedStyle(desktopNav);
  if (window.innerWidth <= 768) {
    if (computedStyle.display === 'none') {
      console.log('✅ Desktop navigation is correctly hidden on mobile');
    } else {
      console.log('❌ Desktop navigation should be hidden on mobile');
    }
  } else {
    if (computedStyle.display !== 'none') {
      console.log('✅ Desktop navigation is visible on desktop');
    } else {
      console.log('❌ Desktop navigation should be visible on desktop');
    }
  }
} else {
  console.log('❌ Desktop navigation not found');
}

// Test 4: Check payment page layout
console.log('\n4. Payment page layout:');
const checkoutGrid = document.querySelector('.checkout-grid');
if (checkoutGrid) {
  const computedStyle = window.getComputedStyle(checkoutGrid);
  if (window.innerWidth <= 768) {
    // On mobile, should be single column
    console.log('ℹ️ On mobile, checkout grid should be single column');
  } else {
    // On desktop, should be multi-column
    console.log('ℹ️ On desktop, checkout grid should be multi-column');
  }
} else {
  console.log('❌ Checkout grid not found');
}

// Test 5: Check UPI ID display on mobile
console.log('\n5. UPI ID display:');
const upiDisplay = document.querySelector('.upi-id-display');
if (upiDisplay) {
  if (window.innerWidth <= 768) {
    // On mobile, should be column layout
    const computedStyle = window.getComputedStyle(upiDisplay);
    if (computedStyle.flexDirection === 'column') {
      console.log('✅ UPI ID display is correctly stacked on mobile');
    } else {
      console.log('ℹ️ UPI ID display should be stacked on mobile');
    }
  } else {
    // On desktop, should be row layout
    console.log('ℹ️ On desktop, UPI ID display should be in a row');
  }
} else {
  console.log('❌ UPI ID display not found');
}

console.log('\n=== TEST COMPLETE ===');
console.log('To test responsiveness:');
console.log('1. Resize your browser window to different sizes');
console.log('2. Check that layout adapts correctly');
console.log('3. On mobile sizes (<768px):');
console.log('   - Desktop nav should hide');
console.log('   - Mobile nav should appear');
console.log('   - Grid should become single column');
console.log('   - UPI ID display should stack vertically');
console.log('4. On desktop sizes (>768px):');
console.log('   - Desktop nav should show');
console.log('   - Mobile nav should hide');
console.log('   - Grid should be multi-column');
console.log('   - UPI ID display should be horizontal');