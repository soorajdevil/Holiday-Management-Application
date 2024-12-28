###  Holiday Management Application


 ## Features

- Select a country and year to fetch holidays.
- Filter holidays by name using a search bar.
- Filter holidays by type (e.g., National, Religious).
- View detailed information about a holiday in a modal.
- Pagination for holidays when the list exceeds 10 entries.
- Responsive design for optimal user experience on any device.
******************************************************************
Table of Contents
Backend Setup (Django)
Frontend Setup (React)
Git Repository Details
API Key Setup
Challenges Faced
***********************************************************************

#####Backend Setup (Django)


1. Install Dependencies
Make sure you have Python 3.x installed. Use pip to install the necessary packages:
      Django==4.2
      djangorestframework==3.14
      python-dotenv==0.21
      requests==2.28
2. Django Project Setup
Clone the repository:
    git clone https://github.com/soorajdevil/Holiday-Management-Application.git

    cd holiday-management
3.Create and activate a virtual environment
4.Set up the Django project and install dependencies:
  python manage.py startproject holiday_management .
  python manage.py startapp holidays
5.Configure settings in holiday_management/settings.py:

6.Create a .env file and store the Calendarific API key:
        CALENDARIFIC_API_KEY=your_api_key_here

7.Run the Backend Server
Run the server using the following command:
      python manage.py runserver

8. Create the API Endpoints
        Fetch Holidays:
        Endpoint: /api/holidays/
        Query Parameters: country (e.g., 'US'), year (e.g., 2023)
        Response: List of holidays for the given country and year.
   
    Search Holidays by Name:
    Endpoint: /api/holidays/search/
    Query Parameters: country, year, query (holiday name to search).
    Response: Filtered holidays by name.
9. Caching
        Cache the API response for each combination of country and year using Django's caching framework. Cache expiration time: 24 hours.
Run the Backend
Start the server using:
        python manage.py runserver
*****************************************************************
########Frontend Setup (React)


1. Install Dependencies
          Make sure you have Node.js and npm installed. Then, navigate to the frontend directory:
              cd holiday-management-frontend
2. Install dependencies
      npm install axios react-modal react-select tailwindcss
      npx tailwindcss init

2. Tailwind CSS Setup
Create a tailwind.config.js file:

 3. React Application Setup
Clone the repository and navigate to the frontend folder:
    cd holiday-management-frontend

4. Run the React development server:
        npm start
- Built with **React** and styled using **Tailwind CSS**.
- Handles routing using **React Router DOM**.
- Dynamically fetches data from the backend API.
- Start the frontend server:
*********Open the browser and navigate to http://localhost:3000.

Select a country and year, then click Fetch Holidays to explore holidays. Use filters and pagination to refine your search.****************
***********************************************************************************************************************************************

## API Key Setup Instructions

Get an API Key
Sign up for an account on Calendarific (or your chosen API provider) and generate an API key.

Configure the Backend

Add the API key to the .env file in the backend as shown:
    API_KEY=your_calendarific_api_key

Validate API Key
    Ensure your backend is successfully fetching data using the API key. Test by running the backend and making sample requests.

*************************************************************************************************************************************

## Challenges Faced

  1. Handling Duplicates
    Some API responses contained duplicate holiday names. This was addressed by filtering unique holidays in the backend and frontend using the Map object.
  
  2. Pagination
    Implementing pagination required calculating index ranges dynamically and resetting the current page during filtering.
  
  3. Filter By Type
    Holiday type data was inconsistent in some API responses. Extra logic was added to normalize the data before applying filters.
  
  4. Responsiveness
    Ensuring a smooth experience across devices involved meticulous testing and adjustments with Tailwind CSS.



