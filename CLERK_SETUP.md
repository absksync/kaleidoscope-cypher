# Clerk Authentication Setup Guide

## 📋 Prerequisites

You need a Clerk account and API keys. If you don't have them yet:

1. Go to [https://clerk.com/](https://clerk.com/)
2. Sign up for a free account
3. Create a new application
4. Navigate to **API Keys** in your Clerk Dashboard

## 🔑 Setting Up Your API Keys

### Step 1: Get Your Publishable Key

1. Go to your Clerk Dashboard: [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
2. Select your application
3. Navigate to **API Keys** in the left sidebar
4. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)

### Step 2: Add Keys to `.env` File

1. Open the `.env` file in the root of your project
2. Replace `your_publishable_key_here` with your actual Clerk Publishable Key:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

**Important:** 
- For Vite projects, environment variables MUST start with `VITE_` to be accessible
- Never commit the `.env` file to Git (it's already in `.gitignore`)
- Use `.env.example` as a template for other developers

### Step 3: Restart Development Server

After adding your keys, restart the development server:

```bash
npm run dev
```

## 🚀 Integration in Your App

The Clerk provider is set up in `src/main.jsx`. Here's how it works:

```jsx
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)
```

## 🔐 Using Clerk Components

### Sign In Button

```jsx
import { SignInButton } from '@clerk/clerk-react'

<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>
```

### User Button (shows user profile)

```jsx
import { UserButton } from '@clerk/clerk-react'

<UserButton afterSignOutUrl="/" />
```

### Protect Routes

```jsx
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'

<SignedIn>
  {/* Content for signed-in users */}
</SignedIn>

<SignedOut>
  <RedirectToSignIn />
</SignedOut>
```

### Get User Information

```jsx
import { useUser } from '@clerk/clerk-react'

function MyComponent() {
  const { isLoaded, isSignedIn, user } = useUser()
  
  if (!isLoaded) return <div>Loading...</div>
  
  if (isSignedIn) {
    return <div>Hello, {user.firstName}!</div>
  }
  
  return <div>Not signed in</div>
}
```

## 🎨 Customization

### Customize Appearance

```jsx
<ClerkProvider 
  publishableKey={PUBLISHABLE_KEY}
  appearance={{
    baseTheme: 'dark',
    variables: { colorPrimary: '#3b82f6' }
  }}
>
  <App />
</ClerkProvider>
```

## 📚 Useful Links

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk React Quickstart](https://clerk.com/docs/quickstarts/react)
- [Clerk Dashboard](https://dashboard.clerk.com/)
- [Clerk Components](https://clerk.com/docs/components/overview)

## ⚠️ Troubleshooting

### "Clerk: Publishable key not found"
- Make sure you've added the key to `.env`
- Restart your dev server after adding the key
- Verify the key starts with `VITE_` in Vite projects

### "Invalid publishable key"
- Check that you copied the entire key
- Make sure you're using the Publishable Key (not Secret Key)
- Verify the key matches your environment (test vs production)

## 🔒 Security Notes

- **Never** commit your `.env` file
- **Never** use the Secret Key in frontend code
- Use environment-specific keys (test for development, live for production)
- The Publishable Key is safe to use in frontend code
