const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#e7e2da] bg-[#faf8f5] py-8 sm:py-10 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Copyright notice */}
        <p className="text-xs text-[#78716c] tracking-wide">
          &copy; {CURRENT_YEAR} Sharma Group Realty. All rights reserved.
        </p>

        {/* Official Domain Link */}
        <a
          href="https://www.sharmagrouprealty.in/"
          className="text-xs font-medium tracking-[0.16em] text-[#57534e] hover:text-[#9b7a3e] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#b89758]"
        >
          sharmagrouprealty.in
        </a>
      </div>
    </footer>
  )
}
