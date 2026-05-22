import Company from "../models/company.js";

// GET /api/companies?city=Indore&sort=name
const getCompanies = async (req, res) => {
  try {
    const { city, sort } = req.query;

    const filter = {};
    if (city) {
      // case-insensitive partial match on city
      filter.city = { $regex: city, $options: "i" };
    }

    const sortMap = {
      name: { name: 1 },
      rating: { averageRating: -1 },
      date: { foundedDate: -1 },
    };
    const sortOption = sortMap[sort] || sortMap.name;

    const companies = await Company.find(filter).sort(sortOption);

    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/companies/:id
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/companies
const addCompany = async (req, res) => {
  try {
    const { name, address, city, foundedDate } = req.body;

    const imageUrl = req.file
    ? `/uploads/${req.file.filename}`
    : null;

    const existing = await Company.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
    if (existing) {
      return res.status(409).json({ success: false, message: "Company with this name already exists" });
    }

    const company = await Company.create({
      name,
      address,
      city,
      logobg: imageUrl ? imageUrl: "https://www.shutterstock.com/image-vector/colorful-color-royal-lotus-flower-260nw-1043607397.jpg",
      foundedDate,
    });

    res.status(201).json({ success: true, data: company });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getCompanies, getCompanyById, addCompany };