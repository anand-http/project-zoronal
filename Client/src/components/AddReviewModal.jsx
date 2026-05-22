import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AddReviewModal({ isOpen, onClose, companyName }) {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        name: "",
        rating: 5,
        body: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.body.trim()) newErrors.body = "Review text is required";
        if (formData.body.trim().length < 10) newErrors.body = "Review must be at least 10 characters";
        return newErrors;
    };

    const baseUrl = "http://localhost:5000/api/v1";
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            // Create FormData
            const data = new FormData();

            data.append("name", formData.name);
            data.append("rating", formData.rating);
            data.append("body", formData.body);

            // API Call
            const response = await axios.post(
                `${baseUrl}/reviews/add-review/${id}`, data,{
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

            console.log(response.data);
            
            // Reset Form
            setFormData({
                name: "",
                rating: 5,
                body: "",
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
        };
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg max-w-lg w-full relative overflow-hidden">
                {/* Decorative purple circle background */}
                <div className="absolute -top-12 -left-8 w-32 h-32 bg-linear-to-br from-violet-500 to-pink-300 rounded-full opacity-20 pointer-events-none" />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-100 cursor-pointer"
                    aria-label="Close form"
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

                {/* Content */}
                <div className="p-8 relative z-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Add Review</h2>
                    {companyName && (
                        <p className="text-center text-sm text-gray-500 mb-6">For {companyName}</p>
                    )}

                    <form onSubmit={handleReviewSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className={`w-full px-3 py-2.5 border rounded-lg text-sm font-sans placeholder-gray-300 focus:outline-none transition-all ${errors.name
                                    ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                                    : "border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-violet-100"
                                    }`}
                            />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        {/* Review Text */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-2">
                                Enter your Review
                            </label>
                            <textarea
                                name="body"
                                value={formData.body}
                                onChange={handleChange}
                                placeholder="Share your experience..."
                                rows={3}
                                className={`w-full px-3 py-2.5 border rounded-lg text-sm font-sans placeholder-gray-300 focus:outline-none transition-all resize-none ${errors.body
                                    ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                                    : "border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-violet-100"
                                    }`}
                            />
                            <div className="flex justify-between items-center mt-1">
                                {errors.body && <p className="text-xs text-red-500">{errors.body}</p>}
                                <p className={`text-xs ${formData.body.length < 10 ? "text-gray-400" : "text-gray-400"}`}>
                                    {formData.body.length} characters
                                </p>
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-lg font-medium text-black mb-3">
                                Rating
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                                        className={`p-1 transition-all ${formData.rating >= star
                                            ? "text-amber-400 scale-110"
                                            : "text-gray-300"
                                            }`}
                                        aria-label={`Rate ${star} stars`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-12 h-12 fill-current"
                                            viewBox="0 0 24 24"
                                        >
                                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                            {/* <p className="text-xs text-gray-500 mt-2">{formData.rating} out of 5 stars</p> */}
                        </div>

                        {/* Submit error */}
                        {errors.submit && (
                            <p className="text-xs text-red-500 bg-red-50 p-2 rounded">{errors.submit}</p>
                        )}

                        {/* Buttons */}
                        <div className="flex items-center justify-center gap-3 mt-7">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-1/3 px-4 py-2.5 bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-70"
                            >
                                {loading ? "Submitting..." : "Submit Review"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}