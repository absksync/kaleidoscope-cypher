import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center gap-8 mb-8">
          <a href="https://vite.dev" target="_blank" className="transition-transform hover:scale-110">
            <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="transition-transform hover:scale-110">
            <img src={reactLogo} className="h-24 w-24 animate-spin-slow" alt="React logo" />
          </a>
        </div>
        
        <h1 className="text-5xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          Kaleidoscope Cypher
        </h1>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition hover:scale-105 active:scale-95"
          >
            Count is {count}
          </button>
          <p className="text-gray-300 mt-6">
            Edit <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">src/App.jsx</code> and save to test HMR
          </p>
        </div>
        
        <p className="text-gray-400 mt-8">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App

