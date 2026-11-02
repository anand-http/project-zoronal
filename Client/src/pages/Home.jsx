import { useState } from "react";
// import { COMPANIES } from "../data/companies";
import Toolbar from "../components/Toolbar";
import CompanyCard from "../components/CompanyCard";
import { useEffect } from "react";
import axios from "axios";
import AddCompanyModal from "../components/AddCompanyModal";
import Loading from "../components/Loading";

const Home = () => {
    const [city, setCity] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [companies, setCompanies] = useState([]);
    const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const baseUrl = "https://project-zoronal.onrender.com/api/v1";

    useEffect(() => {
      const getCompanies = async () => {
            try {
                const res = await axios.get(`${baseUrl}/companies/get-companies`);
                setCompanies(res.data.data);
                
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }
        getCompanies();
    }, []);

    const filtered = companies.filter(c => c.city.toLowerCase().includes(city))
    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "rating") return b.averageRating - a.averageRating;
        if (sortBy === "date") return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
    });
    if (isLoading) return <Loading />

    return (
        <>
            <main className="max-w-5xl mx-auto px-6 py-6">
                <Toolbar
                    city={city}
                    setCity={setCity}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    onAddCompany={() => setIsAddCompanyOpen(true)}
                />
                <p className="text-sm text-gray-400 mb-4">Result Found: {sorted.length}</p>
                <div className="flex flex-col gap-3">
                    {sorted.length > 0 ? (
                        sorted.map((company) => (
                            <CompanyCard key={company._id} company={company} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center gap-3 py-30">
                            <h1 className="text-2xl font-bold text-gray-700">
                               No companies found {city && `in ${city}`}
                            </h1>
                            </div>
                    )}
                </div>
            </main>
            {/* Add Company Modal */}
            <AddCompanyModal
                isOpen={isAddCompanyOpen}
                onClose={() => setIsAddCompanyOpen(false)}
            />
        </>
    )
}

export default Home;