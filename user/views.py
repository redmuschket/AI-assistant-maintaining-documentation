from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, authenticate, logout
import json

from .forms import CustomUserCreationForm
from .models import *


def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # Автоматически входим после регистрации
            login(request, user)
            return redirect('tour_list')
    else:
        form = CustomUserCreationForm()
    return render(request, 'user/register.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user=user)

def user_logout(request):
    pass