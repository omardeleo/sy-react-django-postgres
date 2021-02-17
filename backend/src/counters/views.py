from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import datetime

from .models import Counter

def reset(request):
    counter = Counter.objects.last()
    counter.reset()

    return JsonResponse({'response': counter.value})

def index(request):
    counter = Counter.objects.last()
    if counter:
        counter.increment()
    else:
        counter = Counter()
        counter.save()
    date = datetime.datetime.now()
    dateStr = date.strftime('%c')
    response = f"""Django server running on port 8080.
Pinged {counter.value} {"time" if counter.value == 1 else "times"}, most recently on {dateStr}."""

    return JsonResponse({'response': response})