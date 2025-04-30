import { useState } from 'react'
import FileManager from './components/FileManager'
import Header from './components/Header'
import { FileProvider } from './context/FileContext'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <FileProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-1 container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <FileManager isMenuOpen={isMenuOpen} />
        </main>
        <footer className="bg-white shadow-inner py-4">
          <div className="container mx-auto px-4 text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Yash Bisht File Manager • All rights reserved
          </div>
        </footer>
      </div>
    </FileProvider>
  )
}

export default App