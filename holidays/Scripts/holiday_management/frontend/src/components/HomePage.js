import React, { useState } from "react";
import { fetchHolidays } from "./api";

function HomePage() {
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [holidays, setHolidays] = useState([]);

  const handleSearch = async () => {
    const results = await fetchHolidays(country, year);
    setHolidays(results);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Country (e.g., US)"
          className="p-2 border"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="number"
          placeholder="Year (e.g., 2023)"
          className="p-2 border"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
          Fetch Holidays
        </button>
      </div>
      <div className="mt-4">
        {holidays.map((holiday) => (
          <div key={holiday.date.iso} className="p-2 border-b">
            <h3 className="font-bold">{holiday.name}</h3>
            <p>{holiday.date.iso}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
