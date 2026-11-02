const NavSearch = () => {
  return (
    <div className="flex-1 h-9 max-w-3xl min-w-sm bg-white rounded-md overflow-hidden flex items-center border border-gray-300">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 px-3 py-1.5 text-md text-gray-800 outline-none"
        />
        <button className="px-2.5 text-violet-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </div>
  )
}

export default NavSearch;