import React, { useState } from "react";
import { useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListPage from './list/holidayList'; 
function App() {
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [holidays, setHolidays] = useState([]);

  const navigate = useNavigate(); 

  const handleSearch = async () => {
    if (country && year) {
      // Redirect to /holidaylist page and pass country and year as query parameters
      navigate(`/holidaylist?country=${country}&year=${year}`);
    } else {
      alert("Please select both country and year");
    }
  };

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Generate a list of years from the current year to 5 years in the future
  const yearOptions = Array.from({ length: 20 }, (_, index) => currentYear + index);

  return (
    <div className="p-4" style={{ maxWidth: "700px", margin: "0 auto", marginTop: '120px' }}>
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-center mb-4" style={{marginBottom:'50px'}}>
          Holiday Finder: Explore Holidays by Country and Year
        </h1>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="p-2 border"
          required
        >
          <option value="" disabled>Select a Country</option>
          <option value="US">United States</option>
          <option value="IN">India</option>
          <option value="GB">United Kingdom</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border"
          required
        >
          <option value="" disabled>Select a Year</option>
          {yearOptions.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>

        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
          Fetch Holidays
        </button>
      </div>
    </div>
  );
}

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/holidayList" element={<ListPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
