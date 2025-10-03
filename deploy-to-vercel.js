import { writeFileSync } from 'fs';
import { join } from 'path';

// Create a simple deployment guide for Vercel
const deployGuide = `
GIFT-EASE FRONTEND DEPLOYMENT TO VERCEL

1. Go to https://vercel.com/dashboard
2. Make sure you're logged into Vercel
3. Click "New Project"
4. Select repository: devixsolutions12/gift-ease-frontend
5. Click "Import"
6. Set these options:
   - Framework Preset: Vite
   - Root Directory: (leave empty)
   - Build Command: npm run build
   - Output Directory: dist
7. Click "Environment Variables" and add:

   REACT_APP_API_URL=your_backend_url_from_render
   VITE_API_URL=your_backend_url_from_render

   ^^^ BOTH variables should have the SAME URL from Render.com ^^^

8. Click "Deploy"
9. Wait 2-3 minutes for deployment to complete

Your frontend URL will be:
https://gift-ease-sand.vercel.app

`;

// Write the deployment guide to a file
writeFileSync(join(process.cwd(), 'VERCEL_DEPLOYMENT_GUIDE.txt'), deployGuide);

console.log('✅ Vercel deployment guide created!');
console.log('📁 File saved as: VERCEL_DEPLOYMENT_GUIDE.txt');
console.log('');
console.log('📋 NEXT STEPS:');
console.log('1. Open VERCEL_DEPLOYMENT_GUIDE.txt');
console.log('2. Follow the exact steps to deploy your frontend');
console.log('');
console.log('📝 REMEMBER: You need your backend URL from Render.com deployment');