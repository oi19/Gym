
from types import ClassMethodDescriptorType
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.checks import messages
from django.db import IntegrityError
from django.http import JsonResponse
from django.http.request import HttpRequest
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django.core import serializers
from django.views.decorators.csrf import csrf_protect
from django.utils import timezone
import datetime
from dateutil.relativedelta import relativedelta
from dateutil import parser


import datetime

from django.db.models import Q


from .models import *
import json


def index(request):
    classes = Classes.objects.all()
    # c = classes.order_by("-timestamp").all()
    context = {'classes': classes}
    return render(request, "network/index.html", {'context': context})


# def user(request):
#     return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


@csrf_exempt
def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            print(user)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


@csrf_exempt
@ login_required
def add(request):
    # cases of request methods
    if request.method == 'POST':
        # fetching data from the form
        className = request.POST["class"]
        trainer = request.POST['trainer']

        # getting a queryset of the coach from the database
        coach = User.objects.filter(username=trainer)
        if len(coach) == 0:
            message = 'This Trainer Does Not Exist'
            print(message)
            return render(request, 'network/add.html', {'message': message})
        print(list(coach))
        # print(coach[0])

        # assiging dates of the start and the end of this class
        start = datetime.date.today()
        end = start + relativedelta(months=1)
        print(start)
        print(end)

        # creating new class instance
        created = Classes.objects.create(
            name=className,  coach=coach[0], date_start=start, date_end=end)
        created.save()
        print(className)

        # classes = Class.objects.all()
        # context = {'classes': classes}

        return HttpResponseRedirect("/")
        # return render(request, 'network/index.html', {'context': context})

    # if GET method
    else:
        # just render the add.html page
        return render(request, 'network/add.html', {'message': ''})


@csrf_exempt
@ login_required
def join(request):
    user = request.user
    if request.method == 'POST':

        # unjson data from the JSON object
        data = json.loads(request.body)
        print('break Down')

        button = data.get('button', '')

        # getting a classes queryset of that id
        class_id = data.get('id', '')
        classInstance = list(Classes.objects.filter(id=class_id))
        print(class_id)
        print(classInstance)
        print(button)

        # checking if the button says leave or join
        if button == 'join':
            # creating user_class instance
            u = User_Class.objects.create(
                user=user, className=classInstance[0])
            u.save()
        else:
            User_Class.objects.filter(
                user=user, className=classInstance[0]).delete()
    else:
        class_id = int(request.GET.get("class_id"))
        print(20)
        classInstance = list(Classes.objects.filter(id=class_id))
        b = User_Class.objects.filter(
            user=user, className=classInstance[0])
        print(b)
        print(len(b))
        if len(b) > 0:
            return JsonResponse(data='found', safe=False)
        else:
            return JsonResponse(data='not found', safe=False)
    return HttpResponseRedirect('/')


@csrf_exempt
@ login_required
def user(request):
    user = request.user

    if request.method == 'GET':
        userInfo = Membership.objects.filter(user=user)
        id = userInfo.values('id')[0]['id']
        print(id)
        start = userInfo.values('date_start')[0]['date_start']
        end = userInfo.values('date_end')[0]['date_end']
        # print(start.strftime("%m/%d/%Y"))
        # print(end.strftime("%m/%d/%Y"))
        today = datetime.datetime.today()
        answer = end.replace(tzinfo=None) < today
        print(answer)
        print(end.replace(tzinfo=None) - today)
        # print(datetime.date.today().strftime("%m/%d/%Y"))
        # print(userInfo.values('date_start')[0])

        return render(request, 'network/user.html', {
            'user': user,
            'start': start.strftime("%m/%d/%Y"),
            'end': end.strftime("%m/%d/%Y"),
            'id': id,
            'answer': answer,
        })

    else:
        # assiging dates of the start and the end of this class
        start = datetime.date.today()
        end = start + relativedelta(months=1)
        new = Membership.objects.create(
            user=user, date_start=start, date_end=end)
        new.save()

        return HttpResponse(status=200)


@ csrf_exempt
@ login_required
def membershipinfo(request):
    user = request.user

    if request.method == 'GET':
        userInfo = Membership.objects.filter(user=user)
        data = list(userInfo)
        return JsonResponse({'data': [serializers.serialize('json', data)]}, safe=False)
    else:
        value = request.GET.get('value')
        print('this is' + f' {value}')

        start = datetime.date.today()
        end = start + relativedelta(months=1)
        if value == 'buy':
            print('buy')
            member = Membership.objects.create(
                user=user, date_start=start, date_end=end)
            member.save()
        else:
            print('renew')
            member = Membership.objects.filter(user_id=user.id)
            print(member)
            # print(member('id'))
            member.update(date_start=start, date_end=end)
            # member.date_end = end
            # member.save()

        # member.save()

        return HttpResponseRedirect('/')


def class_capacity(request):
    if request.method == 'GET':
        id = request.GET.get('id')
        people = User_Class.objects.filter(className_id=id)

        num = len(people)
        print('here')
        print(num)
        return JsonResponse(data=f'{num}', safe=False)

    return HttpResponse(status=200)
