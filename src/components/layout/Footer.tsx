export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">
              &copy; {currentYear} Pinochle Online. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="/about" className="text-gray-400 hover:text-blue-300 transition">
              About
            </a>
            <a href="/rules" className="text-gray-400 hover:text-blue-300 transition">
              Rules
            </a>
            <a href="/contact" className="text-gray-400 hover:text-blue-300 transition">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
