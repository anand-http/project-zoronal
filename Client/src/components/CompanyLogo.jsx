const CompanyLogo = ({ bg }) => {

  return (
    <div className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 overflow-hidden bg-gray-100">
      <img
        src={bg}
        alt="Company Logo"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default CompanyLogo;