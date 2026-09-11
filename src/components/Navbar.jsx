export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-[70px] max-w-4xl items-center justify-between px-4 sm:px-6">

        {/* Logo / Title */}
        <div>
          <h1 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
            Expense Tracker
          </h1>

          <p className="hidden text-xs text-gray-400 sm:block">
            Manage your money simply
          </p>
        </div>

        {/* GitHub */}
        <a
          href="https://github.com/ayush28-eng/expense_tracker"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
        >
          GitHub
        </a>

      </div>
    </nav>
  );
}