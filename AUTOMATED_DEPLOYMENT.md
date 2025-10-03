# GiftEase Complete Automated Deployment

## 🚀 Step-by-Step Deployment Instructions

I'll guide you through each step with exact instructions. Just follow along!

### Step 1: Set Up MongoDB Atlas (Database)

1. **Open your web browser and go to**: https://cloud.mongodb.com/

2. **Create a free account**:
   - Click "Try Free"
   - Enter your email and create a password
   - Verify your email address

3. **Create a new project**:
   - Click "New Project"
   - Name it "GiftEase"
   - Click "Next"
   - Click "Create Project"

4. **Create a free cluster**:
   - Click "Build a Database"
   - Select "M0 FREE" tier
   - Choose any provider (AWS, Google Cloud, or Azure)
   - Choose any region near you
   - Keep cluster name as default
   - Click "Create Cluster" (this may take 1-3 minutes)

5. **Set up database access**:
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Username: `gifteaseuser`
   - Password: `gifteasepassword123` (or create your own secure password)
   - Click "Add Built-In Role" → Select "Read and write to any database"
   - Click "Add User"

6. **Set up network access**:
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

7. **Get your connection string**:
   - Click "Database" in left sidebar
   - Click "Connect" button on your cluster
   - Click "Connect your application"
   - Copy the connection string
   - Replace `<password>` with `gifteasepassword123`

### Step 2: Deploy Backend to Railway

1. **Open a new browser tab and go to**: https://railway.app/

2. **Create a free account**:
   - Click "Start a New Project"
   - Sign up with GitHub (recommended) or email

3. **Deploy your backend**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Connect your GitHub account if prompted
   - Select repository: `devixsolutions12/gift-ease-backend`
   - Click "Deploy Now"

### Step 3: Configure Railway Environment Variables

1. **In Railway dashboard**:
   - Click on your "gift-ease-backend" project
   - Click "Settings" tab
   - Click "Variables" section

2. **Add these environment variables** (replace values as needed):
   ```
   NODE_ENV=production
   PORT=8080
   MONGODB_URI=your-mongodb-connection-string-from-step-1
   JWT_SECRET=super-secret-jwt-key-change-this-to-something-random
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   FRONTEND_URL=https://gift-ease-sand.vercel.app
   ```

3. **Click "Save" after adding each variable**

### Step 4: Get Your Backend URL

1. **In Railway dashboard**:
   - Click "Deployments" tab
   - Wait for deployment to complete (may take 2-5 minutes)
   - Your backend URL will appear at the top (something like `https://gift-ease-backend-production.up.railway.app`)

### Step 5: Update Frontend Configuration in Vercel

1. **Go to**: https://vercel.com/dashboard

2. **Find your "gift-ease" project and click on it**

3. **Configure environment variables**:
   - Click "Settings" → "Environment Variables"
   - Add these two variables (replace with your actual Railway URL):
     ```
     REACT_APP_API_URL=https://your-railway-backend-url.up.railway.app
     VITE_API_URL=https://your-railway-backend-url.up.railway.app
     ```

### Step 6: Redeploy Frontend

1. **In Vercel dashboard**:
   - Click "Deployments" tab
   - Click the "Redeploy" button for the latest deployment
   - Wait for redeployment to complete

### Step 7: Test Your Application

1. **Visit your frontend URL**: https://gift-ease-sand.vercel.app/
2. **Try to register a new account**
3. **You should now be able to create accounts and log in!**

## 🛠️ Need Help with Specific Steps?

### Setting up Gmail for Email Notifications

1. **Go to your Google Account settings**: https://myaccount.google.com/
2. **Enable 2-Step Verification**:
   - Click "Security" in left sidebar
   - Click "2-Step Verification"
   - Follow the setup process
3. **Generate App Password**:
   - Still in "Security" section
   - Click "App passwords"
   - Select "Mail" and "Windows Computer" (or other)
   - Copy the 16-character password
   - Use this as your EMAIL_PASS in environment variables

## 📞 Support

If you encounter any issues:

1. **Check deployment logs** in Railway and Vercel
2. **Verify all environment variables** are set correctly
3. **Ensure MongoDB connection string** is correct
4. **Contact support** or share error messages for further assistance

Your GiftEase platform will be fully functional once both frontend and backend are properly deployed and connected!