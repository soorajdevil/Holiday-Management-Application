import requests
from django.conf import settings
from django.core.cache import cache

CALENDARIFIC_API_URL = "https://calendarific.com/api/v2/holidays"

def fetch_holidays(country, year):
    cache_key = f"holidays_{country}_{year}"
    holidays = cache.get(cache_key)

    if not holidays:
        params = {
            "api_key": "vMV7t7K0gQ41q8pWae2eFOZUO4rnq1KT",
            "country": country,
            "year": year,
        }
        print('params',params)

        try:
            response = requests.get(CALENDARIFIC_API_URL, params=params, timeout=10)  # 10 seconds timeout
            if response.status_code == 200:
                holidays = response.json().get("response", {}).get("holidays", [])
                cache.set(cache_key, holidays, timeout=24 * 60 * 60)  # Cache for 24 hours
            else:
                print(f"Error fetching holidays: {response.status_code} - {response.text}")
                holidays = []
        except requests.exceptions.RequestException as e:
            # Log the exception
            print(f"An error occurred: {e}")
            holidays = []

    return holidays
