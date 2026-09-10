export function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex min-h-[70px] w-full max-w-4xl items-center justify-between px-4 sm:px-6">
        
        <h1 className="text-lg font-semibold text-gray-900">
          Expense Tracker
        </h1>

        <a
          href="#"
          className="text-sm text-gray-600 transition hover:text-gray-900"
        >
          Github
        </a>

      </div>
    </nav>
  );
}