from django.shortcuts import render
from file.models import File

def home_view(request):
    return render(request, 'homepage/homepage.html')
