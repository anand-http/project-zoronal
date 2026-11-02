const Toolbar = ({ city, setCity, sortBy, setSortBy, onAddCompany }) => {
  return (
    <div className="flex flex-wrap items-end gap-10 mb-5">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Select City</label>
        <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden w-88">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-3 py-2 text-md text-gray-700 outline-none"
            placeholder="Search companies using city name"
          />
          <span className="px-2.5 text-violet-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </span>
        </div>
      </div>
 
      <button className="cursor-pointer bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors">
        Find Company
      </button>
      <button onClick={onAddCompany} className="cursor-pointer bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors">
        + Add Company
      </button>
 
      <div className="ml-auto flex flex-col gap-1">
        <label className="text-sm text-gray-600">Sort:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-md bg-white font-bold text-gray-700 outline-none cursor-pointer"
        >
          <option value="name">Name</option>
          <option value="rating">Rating</option>
          <option value="date">Date</option>
        </select>
      </div>
    </div>
  );
}

export default Toolbar;