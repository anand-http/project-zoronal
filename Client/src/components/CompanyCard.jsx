import { Link } from "react-router-dom";
import CompanyLogo from "./CompanyLogo";
import StarRating from "./StarRating";

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
      <CompanyLogo bg={company.logobg} />
 
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-gray-900 mb-1">{company.name}</h3>
        <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          {company.address}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-800">{company.averageRating}</span>
          <StarRating averageRating={company.averageRating} />
          {company.reviewCount && (
            <span className="text-xs text-gray-500">{company.reviewCount} Reviews</span>
          )}
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="text-xs text-gray-400 mb-4">Founded on {company.foundedDate?.split("T")[0]}</p>
        <Link to={`/companies/${company._id}`} className="bg-gray-900 hover:bg-gray-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
          Detail Review
        </Link>
      </div>
    </div>
  );
}
export default CompanyCard;