from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from .models import Counter

def index(request):
    counter = Counter.objects.last()
    if counter:
        counter.increment()
    else:
        counter = Counter()
        counter.save()
    response = f'Hi! I\'m a Django server. Been pinged {counter.value} times.'
    return JsonResponse({"response": response})
