# Kaleidoscope Cypher

A dynamic React website built with Vite and Tailwind CSS.

## 🚀 Tech Stack

- **React** - UI library for building interactive user interfaces
- **Vite** - Fast, modern build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Clerk** - Authentication and user management

## 🔐 Quick Start with Clerk Authentication

This project is integrated with Clerk for authentication. To get started:

1. **Get your Clerk API keys:**
   - Sign up at [https://clerk.com](https://clerk.com)
   - Create a new application
   - Get your Publishable Key from the [API Keys page](https://dashboard.clerk.com/)

2. **Add your keys to `.env`:**
   ```bash
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

3. **Restart the dev server:**
   ```bash
   npm run dev
   ```

📚 **For detailed Clerk setup instructions, see [CLERK_SETUP.md](./CLERK_SETUP.md)**

## 📦 Installed Dependencies

### Main Dependencies
- `react` - ^19.1.1
- `react-dom` - ^19.1.1
- `react-router-dom` - ^7.9.4
- `axios` - ^1.12.2
- `@clerk/clerk-react` - Authentication SDK

### Dev Dependencies
- `vite` - ^7.1.12
- `@vitejs/plugin-react` - ^4.3.4
- `tailwindcss` - ^4.0.20
- `@tailwindcss/postcss` - ^4.0.20
- `postcss` - ^8.4.49
- `autoprefixer` - ^10.4.20

## 🛠️ Available Scripts

### Development Server
```bash
npm run dev
```
Starts the development server at `http://localhost:5173/`

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist` folder

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally

### Lint Code
```bash
npm run lint
```
Run ESLint to check code quality

## 🌐 Development Server

The development server is currently running at:
- **Local**: http://localhost:5173/
- **Network**: Use `npm run dev -- --host` to expose on network

## 📁 Project Structure

```
Kaleidoscope_Cypher/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── App.jsx         # Main App component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles with Tailwind
├── index.html          # HTML template
├── package.json        # Project dependencies
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
└── postcss.config.js   # PostCSS configuration

```

## 🎨 Tailwind CSS

Tailwind CSS is configured and ready to use. The main configuration is in `tailwind.config.js`. You can customize:
- Colors
- Spacing
- Typography
- Breakpoints
- And much more!

## 🔧 Configuration Files

- **vite.config.js** - Vite build configuration
- **tailwind.config.js** - Tailwind CSS customization
- **postcss.config.js** - PostCSS plugins configuration
- **package.json** - Project metadata and dependencies

## 📝 Next Steps

1. Start building your components in the `src` folder
2. Add routing with React Router DOM
3. Create API calls using Axios
4. Customize Tailwind theme in `tailwind.config.js`
5. Add more dependencies as needed with `npm install <package-name>`

## 🚀 Deployment

When ready to deploy, build the project:
```bash
npm run build
```

The optimized files will be in the `dist` folder, ready to deploy to:
- Vercel
- Netlify
- GitHub Pages
- Or any static hosting service

---

Happy coding! 🎉
