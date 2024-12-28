import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function ListPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const country = searchParams.get("country");
  const year = searchParams.get("year");

  const [holidays, setHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHoliday, setSelectedHoliday] = useState(null); 
  const [holidayType, setHolidayType] = useState(""); 
  const [holidayTypes, setHolidayTypes] = useState([]); 
  const holidaysPerPage = 10; 

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/holidays/?country=${country}&year=${year}`
        );
        const data = await response.json();

        // Remove duplicates by name
        const uniqueHolidays = Array.from(
          new Map(data.map((holiday) => [holiday.name, holiday])).values()
        );

        setHolidays(uniqueHolidays);
        setFilteredHolidays(uniqueHolidays); 

        // Extract unique holiday types
        const types = Array.from(new Set(uniqueHolidays.map((holiday) => holiday.type)));
        setHolidayTypes(types); 

        setLoading(false);
      } catch (error) {
        console.error("Error fetching holidays:", error);
        setLoading(false);
      }
    };

    if (country && year) {
      fetchHolidays();
    }
  }, [country, year]);

  // Filter holidays by name and type based on the search term and selected type
  useEffect(() => {
    let filtered = holidays;

    if (searchTerm) {
      // Filter holidays by search term (name)
      filtered = filtered.filter((holiday) =>
        holiday.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (holidayType) {
      // Filter holidays by the selected type
      filtered = filtered.filter((holiday) => holiday.type === holidayType);
    }

    setFilteredHolidays(filtered); 
    setCurrentPage(1); 
  }, [searchTerm, holidayType, holidays]);

  // Calculate the current holidays to display based on the current pages
  const indexOfLastHoliday = currentPage * holidaysPerPage;
  const indexOfFirstHoliday = indexOfLastHoliday - holidaysPerPage;
  const currentHolidays = filteredHolidays.slice(indexOfFirstHoliday, indexOfLastHoliday);

  const totalPages = Math.ceil(filteredHolidays.length / holidaysPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const openModal = (holiday) => {
    setSelectedHoliday(holiday);
  };

  const closeModal = () => {
    setSelectedHoliday(null); 
  };

  return (
    <div className="p-4" style={{ maxWidth: "700px", margin: "0 auto", marginTop: "50px" }}>
      <div className="flex flex-col space-y-4">
          {/* Go Back Button */}
          <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white p-2 rounded"
          style={{ marginBottom: "10px" ,maxWidth:'90px',backgroundColor:'grey'}}
        >
          Go Back
        </button>

        <h2 className="text-xl font-semibold" style={{textAlign:'center'}}>Holidays in {country} for {year}</h2>

        {/* Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search holidays by name..."
          className="p-2 border rounded"
        />

        {/* Filter by Holiday Type */}
        {/* <select
          value={holidayType}
          onChange={(e) => setHolidayType(e.target.value)} // Update the selected type
          className="p-2 border rounded"
        >
          <option value="">All Types</option>
          {holidayTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select> */}

        {loading ? (
          <p>Loading holidays...</p>
        ) : (
          <>
            {currentHolidays.length > 0 ? (
              <ul>
                {currentHolidays.map((holiday, index) => (
                  <li
                    key={index}
                    className="border-b py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => openModal(holiday)}
                  >
                    <p className="font-bold">{holiday.name}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No holidays found for "{searchTerm}" and type "{holidayType}".</p>
            )}

            {/* Pagination Controls */}
            {filteredHolidays.length > holidaysPerPage && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
                >
                  Previous
                </button>
                <p>
                  Page {currentPage} of {totalPages}
                </p>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {selectedHoliday && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">{selectedHoliday.name}</h2>
            <p><strong>Date:</strong> {selectedHoliday.date.iso}</p>
            <p><strong>Type:</strong> {selectedHoliday.type}</p>
            <p><strong>Description:</strong> {selectedHoliday.description}</p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white p-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListPage;
