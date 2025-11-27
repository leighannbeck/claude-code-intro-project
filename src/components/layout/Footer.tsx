export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white mt-auto border-t-4 border-red-700 shadow-2xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white font-bold text-lg">
              ♠ ♥ &copy; {currentYear} Pinochle Online. All rights reserved. ♦ ♣
            </p>
          </div>
          <div className="flex space-x-8">
            <a href="/about" className="text-white hover:text-blue-300 transition font-bold text-lg border-b-2 border-transparent hover:border-blue-300">
              About
            </a>
            <a href="/rules" className="text-white hover:text-red-300 transition font-bold text-lg border-b-2 border-transparent hover:border-red-300">
              Rules
            </a>
            <a href="/contact" className="text-white hover:text-yellow-300 transition font-bold text-lg border-b-2 border-transparent hover:border-yellow-300">
              Contact
            </a>
            <a href="/how-to-play" className="text-white hover:text-green-300 transition font-bold text-lg border-b-2 border-transparent hover:border-green-300">
              How to Play
            </a>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-white font-medium text-sm">
            Play responsibly. Enjoy the classic game of Pinochle online with friends and family.
          </p>
        </div>
      </div>
    </footer>
  )
}
