import StarRating from "./StarRating";
import CompanyLogo from "./CompanyLogo";

// Sub-component: Address line with pin icon
function CompanyAddress({ address }) {
  return (
    <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      {address}
    </p>
  );
}

// Sub-component: Add Review button
function AddReviewButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
    >
      + Add Review
    </button>
  );
}

// Main export: full company header card
export default function CompanyHeader({ companyData,onAddReviewOpen }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm mb-4">
      <CompanyLogo bg={companyData.logobg} />

      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">{companyData.name}</h2>
        <CompanyAddress address={companyData.address} />
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-800">{companyData.averageRating}</span>
          <StarRating averageRating={companyData.averageRating} size="md" />
          <span className="text-xs text-gray-500">{companyData.reviewCount} Reviews</span>
        </div>
      </div>

      <div className="text-right shrink-0 self-start">
        <p className="text-xs text-gray-400 mb-2">{companyData.foundedDate?.split("T")[0]}</p>
        <AddReviewButton onClick={onAddReviewOpen} />
      </div>
    </div>
  );
}
