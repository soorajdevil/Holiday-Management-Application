from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .utils import fetch_holidays

@api_view(["GET"])
def get_holidays(request):
    country = request.query_params.get("country")
    year = request.query_params.get("year")

    # Validate country and year
    if not country or not year:
        return Response({"error": "Country and year are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        holidays = fetch_holidays(country, year)
    except Exception as e:
        return Response({"error": f"Error fetching holidays: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(holidays)

@api_view(["GET"])
def search_holidays(request):
    country = request.query_params.get("country")
    year = request.query_params.get("year")
    query = request.query_params.get("query", "").lower()

    # Validate country and year
    if not country or not year:
        return Response({"error": "Country and year are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        holidays = fetch_holidays(country, year)
    except Exception as e:
        return Response({"error": f"Error fetching holidays: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Filter holidays based on the query string
    filtered_holidays = [holiday for holiday in holidays if query in holiday["name"].lower()]

    return Response(filtered_holidays)

