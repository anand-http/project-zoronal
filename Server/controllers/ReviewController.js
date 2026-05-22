import Review from "../models/Review.js";
import Company from "../models/Company.js";

// GET /api/companies/:id/reviews
const getReviewsByCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    const reviews = await Review.find({ company: req.params.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/companies/:id/reviews
const addReview = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }
    
    const { name, rating, body } = req.body;
    const imageUrl = "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png";

    const review = await Review.create({
      company: req.params.id,
      name,
      rating,
      body,
      imageUrl
    });

    // Recalculate averageRating and reviewCount on the company
    const allReviews = await Review.find({ company: req.params.id });
    const avg =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    company.averageRating = Math.round(avg * 10) / 10; // e.g. 4.5
    company.reviewCount = allReviews.length;
    await company.save();

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getReviewsByCompany, addReview };