import axios from "axios";
import { useState } from "react";

export default function AddCompanyModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    logobg: "",
    name: "",
    address: "",
    foundedDate: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Company name is required";
    if (!formData.address.trim()) newErrors.address = "Location is required";
    if (!formData.foundedDate) newErrors.foundedDate = "Founded date is required";
    if (!formData.city) newErrors.city = "City is required";
    return newErrors;
  };

  const baseUrl = "http://localhost:5000/api/v1";
  const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = validateForm();

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setLoading(true);

  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("foundedDate", formData.foundedDate);

    if (formData.logobg) {
      data.append("logobg", formData.logobg);
    }
  
    const response = await axios.post(
      `${baseUrl}/companies/add-company`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);
    setFormData({
      logobg: "",
      name: "",
      address: "",
      foundedDate: "",
      city: "",
    });

    setErrors({});
    onClose();
    window.location.reload();

  } catch (error) {
    setErrors({
      submit:
        error.response?.data?.message ||
        "Something went wrong",
    });
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg max-w-lg w-full relative overflow-hidden">
        {/* Decorative purple circle background */}
        <div className="absolute -top-12 -left-8 w-32 h-32 bg-linear-to-br from-violet-500 to-pink-300 rounded-full opacity-70 pointer-events-none" />

        <div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-100 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-8 relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Add Company</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Company logo */}
            <div className="flex justify-center">
              <label className="relative cursor-pointer">

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      logobg: e.target.files[0],
                    })
                  }
                />

                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center overflow-hidden bg-gray-50 hover:border-violet-400 transition-all">

                  {formData.logobg ? (
                    <img
                      src={URL.createObjectURL(formData.logobg)}
                      alt="Logo Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16V4m0 0l-4 4m4-4l4 4m5 8v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1"
                      />
                    </svg>
                  )}
                </div>
              </label>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Company name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter..."
                className={`w-full px-3 py-2.5 border rounded-lg text-sm font-sans placeholder-gray-300 focus:outline-none transition-all ${errors.name
                  ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-violet-100"
                  }`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Select location"
                  className={`w-full px-3 py-2.5 border rounded-lg text-sm font-sans placeholder-gray-300 focus:outline-none transition-all pr-10 ${errors.address
                    ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-violet-100"
                    }`}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
            </div>

            {/* Founded Date */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Founded on
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="foundedDate"
                  value={formData.foundedDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 border rounded-lg text-sm font-sans focus:outline-none transition-all pr-10 ${errors.foundedDate
                    ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-violet-100"
                    }`}
                />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg> */}
              </div>
              {errors.foundedDate && <p className="text-xs text-red-500 mt-1">{errors.foundedDate}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm font-sans focus:outline-none transition-all ${errors.city
                  ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-violet-100"
                  }`}
              >
                <option value="">Select city</option>
                <option value="Indore">Indore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Lucknow">Lucknow</option>
              </select>
              {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
            </div>

            {errors.submit && (
              <p className="text-xs text-red-500 bg-red-50 p-2 rounded">{errors.submit}</p>
            )}

            <div className="flex items-center justify-center gap-3 mt-7">
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-1/3 px-4 py-2.5 bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-70"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}