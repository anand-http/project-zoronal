import { Link } from "react-router-dom";
import NavSearch from "./Search";

const Navbar = () => {
  return (
    <nav className="px-28 h-20 flex items-center justify-between gap-4 shadow-md">
      <Link to="/" className="flex items-center justify-center gap-2 shrink-0">
      <div className="flex items-center justify-center gap-2 shrink-0">
        <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <span className="text-black text-xl font-medium">
          Review<span className="font-bold">&amp;RATE</span>
        </span>
      </div>  
      </Link>

      <div className="flex items-center gap-16">
       <NavSearch/>
      <div className="flex items-center gap-2 shrink-0">
        <button className="cursor-pointer text-black text-xl border border-white/40 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors">
          SignUp
        </button>
        <button className="cursor-pointer text-black text-xl border border-white/40 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors">
          Login
        </button>
      </div>
      </div>
    </nav>
  );
}

export default Navbar;