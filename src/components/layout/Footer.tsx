export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-[#243CBF] via-[#BF1736] to-[#243CBF] text-white mt-auto border-t-4 border-[#A67D4B] shadow-2xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white font-bold text-lg">
              ♠ ♥ &copy; {currentYear} Pinochle Online. All rights reserved. ♦ ♣
            </p>
          </div>
          <div className="flex space-x-8">
            <a href="/about" className="text-white hover:text-[#A67D4B] transition font-bold text-lg border-b-2 border-transparent hover:border-[#A67D4B]">
              About
            </a>
            <a href="/rules" className="text-white hover:text-[#A67D4B] transition font-bold text-lg border-b-2 border-transparent hover:border-[#A67D4B]">
              Rules
            </a>
            <a href="/contact" className="text-white hover:text-[#A67D4B] transition font-bold text-lg border-b-2 border-transparent hover:border-[#A67D4B]">
              Contact
            </a>
            <a href="/how-to-play" className="text-white hover:text-[#A67D4B] transition font-bold text-lg border-b-2 border-transparent hover:border-[#A67D4B]">
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
