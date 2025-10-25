import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'

// Import your Clerk Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file')
}

// Clerk appearance customization to match landing page theme
const clerkAppearance = {
  layout: {
    socialButtonsVariant: 'iconButton',
    socialButtonsPlacement: 'bottom'
  },
  variables: {
    colorPrimary: '#3b82f6', // blue-600
    colorBackground: '#000000', // black
    colorInputBackground: 'rgba(0, 0, 0, 0.5)',
    colorInputText: '#ffffff',
    colorText: '#ffffff',
    colorTextSecondary: '#9ca3af', // gray-400
    colorDanger: '#ef4444',
    borderRadius: '0.75rem', // rounded-xl
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  elements: {
    formButtonPrimary: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      border: '1px solid rgba(59, 130, 246, 0.5)',
      boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
      '&:hover': {
        backgroundColor: '#2563eb',
        boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.5)',
      }
    },
    card: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.2)',
      borderRadius: '1rem'
    },
    headerTitle: {
      color: '#ffffff',
      fontSize: '1.5rem',
      fontWeight: '700'
    },
    headerSubtitle: {
      color: '#9ca3af'
    },
    socialButtonsBlockButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgba(59, 130, 246, 0.5)'
      }
    },
    formFieldInput: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      color: '#ffffff',
      borderRadius: '0.75rem',
      transition: 'all 0.3s ease',
      '&:focus': {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.4)',
        outline: 'none'
      },
      '&:hover': {
        boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)'
      }
    },
    formFieldLabel: {
      color: '#9ca3af'
    },
    footerActionLink: {
      color: '#3b82f6',
      '&:hover': {
        color: '#60a5fa'
      }
    },
    identityPreviewText: {
      color: '#ffffff'
    },
    identityPreviewEditButton: {
      color: '#3b82f6'
    },
    dividerLine: {
      backgroundColor: 'rgba(59, 130, 246, 0.3)'
    },
    dividerText: {
      color: '#9ca3af'
    }
  }
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      appearance={clerkAppearance}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)
