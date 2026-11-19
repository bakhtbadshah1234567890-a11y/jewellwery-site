import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ showLabel = false, className = '' }) {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full p-2 transition-all duration-300 hover:opacity-85 focus:outline-none ${
        showLabel
          ? 'px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-mono uppercase tracking-wider'
          : 'text-current hover:bg-black/5 dark:hover:bg-white/10'
      } ${className}`}
    >
      <div className="relative size-4 sm:size-4.5 flex items-center justify-center">
        {/* Sun Icon (shown in dark mode) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute inset-0 size-full text-amber-400 transition-all duration-300 transform ${
            isDark
              ? 'scale-100 rotate-0 opacity-100'
              : 'scale-0 -rotate-90 opacity-0 pointer-events-none'
          }`}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>

        {/* Moon Icon (shown in light mode) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute inset-0 size-full text-neutral-700 dark:text-neutral-300 transition-all duration-300 transform ${
            isDark
              ? 'scale-0 rotate-90 opacity-0 pointer-events-none'
              : 'scale-100 rotate-0 opacity-100'
          }`}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </div>

      {showLabel && (
        <span className="font-mono text-[11px] uppercase tracking-wider select-none">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  )
}
