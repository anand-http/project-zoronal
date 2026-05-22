import express from "express";
import { getCompanies, getCompanyById, addCompany } from "../controllers/CompanyController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get('/get-companies',getCompanies);
router.get('/get-company/:id',getCompanyById);
router.post('/add-company',upload.single("logobg"), addCompany);



export default router;