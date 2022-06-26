import email
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.views import View
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
import json
from django.contrib.auth import get_user_model

# Create your views here.

User = get_user_model()


class LoginView(View):
    def get(self, request):
        return render(request, 'login.html')

    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse(json.dumps({'result': 'success'}), safe=False)
        return JsonResponse(json.dumps({'result': 'fail'}), safe=False)


class Register(View):
    def get(self, request):
        return render(request, 'register.html')

    def post(self, request):
        data = request.POST
        try:
            User.objects.get(username=data['username'])
            return HttpResponseBadRequest(
                content=json.dumps({'err_username': 'Username is existed'}))
        except:
            pass
        try:
            User.objects.get(email=data['email'])
            return HttpResponseBadRequest(content=json.dumps({'err_email': 'Email is existed'}))
        except:
            pass

        user = User.objects.create_user(
            username=data['username'],
            password=data['password'],
            email=data['email'],
            fullName=data['fullName'],
            avatar=request.FILES['avatar']
        )
        user.save()
        return HttpResponse(content=json.dumps({'result': 'success'}))


def handleLogout(request):
    logout(request)
    return redirect('/')
