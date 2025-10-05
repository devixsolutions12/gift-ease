// Responsiveness Fix Verification
// Run this in the browser console at http://localhost:3012/packages/play-store

console.log('=== RESPONSIVENESS FIX VERIFICATION ===');

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
  const display = computedStyle.display;
  const gridTemplate = computedStyle.gridTemplateColumns;
  
  console.log(`Display: ${display}`);
  console.log(`Grid template: ${gridTemplate}`);
  
  if (display === 'grid') {
    if (window.innerWidth <= 768) {
      if (gridTemplate === '1fr') {
        console.log('✅ Checkout grid is correctly single column on mobile');
      } else {
        console.log('❌ Checkout grid should be single column on mobile');
      }
    } else {
      if (gridTemplate.includes('minmax')) {
        console.log('✅ Checkout grid is correctly multi-column on desktop');
      } else {
        console.log('❌ Checkout grid should be multi-column on desktop');
      }
    }
  } else {
    console.log('❌ Checkout grid should use grid display');
  }
} else {
  console.log('❌ Checkout grid not found');
}

// Test 3: UPI ID display
console.log('\n3. UPI ID display:');
const upiDisplay = document.querySelector('.upi-id-display');
if (upiDisplay) {
  const computedStyle = window.getComputedStyle(upiDisplay);
  const flexDirection = computedStyle.flexDirection;
  
  if (window.innerWidth <= 768) {
    if (flexDirection === 'column') {
      console.log('✅ UPI ID display is correctly stacked on mobile');
    } else {
      console.log('❌ UPI ID display should be stacked on mobile');
    }
  } else {
    if (flexDirection === 'row') {
      console.log('✅ UPI ID display is correctly horizontal on desktop');
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
  const display = computedStyle.display;
  const gridTemplate = computedStyle.gridTemplateColumns;
  
  console.log(`Display: ${display}`);
  console.log(`Grid template: ${gridTemplate}`);
  
  if (display === 'grid') {
    if (window.innerWidth <= 480) {
      if (gridTemplate === '1fr') {
        console.log('✅ Trust badges are correctly single column on small mobile');
      } else {
        console.log('❌ Trust badges should be single column on small mobile');
      }
    } else if (window.innerWidth <= 768) {
      if (gridTemplate.includes('1fr') && gridTemplate.split('1fr').length-1 === 2) {
        console.log('✅ Trust badges are correctly two columns on mobile');
      } else {
        console.log('❌ Trust badges should be two columns on mobile');
      }
    } else {
      if (gridTemplate.includes('1fr') && gridTemplate.split('1fr').length-1 > 2) {
        console.log('✅ Trust badges are correctly multi-column on desktop');
      } else {
        console.log('❌ Trust badges should be multi-column on desktop');
      }
    }
  } else {
    console.log('❌ Trust badges should use grid display');
  }
} else {
  console.log('❌ Trust badges not found');
}

// Test 5: No horizontal overflow
console.log('\n5. Horizontal overflow check:');
const body = document.body;
const html = document.documentElement;
const pageWidth = Math.max(
  body.scrollWidth,
  body.offsetWidth,
  html.clientWidth,
  html.scrollWidth,
  html.offsetWidth
);

if (pageWidth <= window.innerWidth) {
  console.log('✅ No horizontal overflow detected');
} else {
  console.log(`❌ Horizontal overflow detected: page width ${pageWidth}px > viewport ${window.innerWidth}px`);
}

// Test 6: Mobile navigation visibility
console.log('\n6. Mobile navigation:');
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
console.log('3. Verify no horizontal scrolling is needed');
console.log('4. Test on actual mobile device if possible');
console.log('5. Check all elements are properly sized and spaced');