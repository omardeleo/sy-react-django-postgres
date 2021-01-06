from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import datetime

from .models import Counter

def index(request):
    counter = Counter.objects.last()
    if counter:
        counter.increment()
    else:
        counter = Counter()
        counter.save()
    date = datetime.datetime.now()
    dateStr = date.strftime('%c')
    response = f'Hi! I\'m a Django server.\n\nI\'m running on port 8080.\nI\'ve been pinged {counter.value} times.\nMost recent ping on {dateStr}.'
    return JsonResponse({"response": response})
