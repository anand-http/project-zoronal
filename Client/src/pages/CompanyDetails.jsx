import { useEffect, useState } from "react";
import CompanyHeader from "../components/CompanyHeader";
import { ReviewList } from "../components/ReviewList";
import axios from "axios";
import AddReviewModal from "../components/AddReviewModal";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

export default function CompanyDetail() {
  const { id } = useParams();
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [company, setCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = "https://project-zoronal.onrender.com/api/v1";

  useEffect(() => {
    const getCompaniesById = async () => {
      try {
        const res = await axios.get(`${baseUrl}/companies/get-company/${id}`);
        setCompany(res.data.data);
      } catch (error) {
        console.log(error)
      }
    }
    getCompaniesById();
    const getReviews = async () => {
      try {
        const res = await axios.get(`${baseUrl}/reviews/get-reviews/${id}`);
        console.log("reviews", res.data.data);
        setReviews(res.data.data);
      } catch (error) {
        console.log(error)
      } finally{
        setIsLoading(false);
      }
    }
    getReviews();
  }, [id]);
 
  if(isLoading) return <Loading/>

  return (
    <>
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Company summary header */}
        <CompanyHeader companyData={company} onAddReviewOpen={()=>setIsAddReviewOpen(true)} />

        {/* All user reviews */}
        <ReviewList reviews={reviews} />
      </main>

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={isAddReviewOpen}
        onClose={() => setIsAddReviewOpen(false)}
        companyName={company?.name}
      />
    </>
  );
}
