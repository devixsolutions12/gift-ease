// Final Mobile Responsiveness Verification Test
// Run this in the browser console at http://localhost:3012/packages/play-store

console.log('=== FINAL MOBILE RESPONSIVENESS VERIFICATION ===');

// Test all responsive elements
console.log('\nTesting responsive elements...');

// Test 1: Viewport size
console.log('\n1. Current viewport size:');
console.log(`Width: ${window.innerWidth}px, Height: ${window.innerHeight}px`);

// Test 2: Checkout grid layout
console.log('\n2. Checkout grid layout:');
const checkoutGrid = document.querySelector('.checkout-grid');
if (checkoutGrid) {
  const computedStyle = window.getComputedStyle(checkoutGrid);
  const gridTemplate = computedStyle.gridTemplateColumns;
  console.log(`Grid template: ${gridTemplate}`);
  
  if (window.innerWidth <= 768) {
    if (gridTemplate.includes('1fr') && !gridTemplate.includes('minmax')) {
      console.log('✅ Checkout grid is single column on mobile');
    } else {
      console.log('ℹ️ Checkout grid may need adjustment for mobile');
    }
  } else {
    if (gridTemplate.includes('minmax')) {
      console.log('✅ Checkout grid is multi-column on desktop');
    } else {
      console.log('ℹ️ Checkout grid may need adjustment for desktop');
    }
  }
} else {
  console.log('❌ Checkout grid not found');
}

// Test 3: UPI ID display
console.log('\n3. UPI ID display:');
const upiDisplay = document.querySelector('.upi-id-display');
if (upiDisplay) {
  const computedStyle = window.getComputedStyle(upiDisplay);
  if (window.innerWidth <= 768) {
    if (computedStyle.flexDirection === 'column') {
      console.log('✅ UPI ID display is stacked on mobile');
    } else {
      console.log('ℹ️ UPI ID display should be stacked on mobile');
    }
  } else {
    if (computedStyle.flexDirection === 'row' || computedStyle.flexDirection === 'flex') {
      console.log('✅ UPI ID display is horizontal on desktop');
    } else {
      console.log('ℹ️ UPI ID display should be horizontal on desktop');
    }
  }
} else {
  console.log('❌ UPI ID display not found');
}

// Test 4: Trust badges layout
console.log('\n4. Trust badges layout:');
const trustBadges = document.querySelector('.trust-badges');
if (trustBadges) {
  const computedStyle = window.getComputedStyle(trustBadges);
  const gridTemplate = computedStyle.gridTemplateColumns;
  console.log(`Grid template: ${gridTemplate}`);
  
  if (window.innerWidth <= 480) {
    if (gridTemplate === '1fr') {
      console.log('✅ Trust badges are single column on small mobile');
    } else {
      console.log('ℹ️ Trust badges should be single column on small mobile');
    }
  } else if (window.innerWidth <= 768) {
    if (gridTemplate.includes('1fr') && gridTemplate.split('1fr').length-1 === 2) {
      console.log('✅ Trust badges are two columns on mobile');
    } else {
      console.log('ℹ️ Trust badges should be two columns on mobile');
    }
  } else {
    if (gridTemplate.includes('1fr') && gridTemplate.split('1fr').length-1 > 2) {
      console.log('✅ Trust badges are multi-column on desktop');
    } else {
      console.log('ℹ️ Trust badges should be multi-column on desktop');
    }
  }
} else {
  console.log('❌ Trust badges not found');
}

// Test 5: Form field touch targets
console.log('\n5. Form field touch targets:');
const formFields = document.querySelectorAll('.floating-label input');
if (formFields.length > 0) {
  let allGood = true;
  formFields.forEach((field, index) => {
    const rect = field.getBoundingClientRect();
    const height = rect.height;
    if (height < 44) {
      console.log(`❌ Form field ${index + 1} height is ${height}px (should be >= 44px)`);
      allGood = false;
    }
  });
  
  if (allGood) {
    console.log('✅ All form fields have proper touch targets');
  }
} else {
  console.log('❌ No form fields found');
}

// Test 6: Button touch targets
console.log('\n6. Button touch targets:');
const buttons = document.querySelectorAll('button');
let buttonIssues = 0;
buttons.forEach((button, index) => {
  const rect = button.getBoundingClientRect();
  const height = rect.height;
  const width = rect.width;
  
  // Skip very small decorative buttons
  if (height > 20 || width > 20) {
    if (height < 44 || width < 44) {
      console.log(`ℹ️ Button "${button.textContent || button.innerText || 'unnamed'}" size is ${width}x${height}px`);
      buttonIssues++;
    }
  }
});

if (buttonIssues === 0) {
  console.log('✅ All significant buttons have proper touch targets');
} else {
  console.log(`ℹ️ ${buttonIssues} buttons may need larger touch targets`);
}

// Test 7: Mobile navigation visibility
console.log('\n7. Mobile navigation:');
const mobileNav = document.querySelector('.mobile-navigation');
const desktopNav = document.querySelector('.header .nav');
if (window.innerWidth <= 768) {
  if (mobileNav && desktopNav) {
    const mobileStyle = window.getComputedStyle(mobileNav);
    const desktopStyle = window.getComputedStyle(desktopNav);
    
    if (mobileStyle.display !== 'none' && desktopStyle.display === 'none') {
      console.log('✅ Mobile navigation correctly visible, desktop navigation correctly hidden');
    } else {
      console.log('❌ Navigation visibility issue on mobile');
    }
  } else {
    console.log('❌ Navigation elements not found');
  }
} else {
  if (mobileNav && desktopNav) {
    const mobileStyle = window.getComputedStyle(mobileNav);
    const desktopStyle = window.getComputedStyle(desktopNav);
    
    if (mobileStyle.display === 'none' && desktopStyle.display !== 'none') {
      console.log('✅ Desktop navigation correctly visible, mobile navigation correctly hidden');
    } else {
      console.log('❌ Navigation visibility issue on desktop');
    }
  } else {
    console.log('❌ Navigation elements not found');
  }
}

console.log('\n=== VERIFICATION COMPLETE ===');
console.log('To manually test responsiveness:');
console.log('1. Resize browser window to different sizes');
console.log('2. Check that layout adapts correctly');
console.log('3. Test all interactive elements are easily tappable');
console.log('4. Verify no horizontal scrolling is needed');
console.log('5. Check text readability without zooming');
console.log('6. Test on actual mobile device if possible');