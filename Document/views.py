from django.shortcuts import redirect, render
from . import models
from django.views import View
from django.http import HttpResponse
import json
from django.contrib.auth.decorators import login_required
from django.conf import settings

# Create your views here.


class DocumentView(View):
    def get(self, request):
        documents = models.Document.objects.all()
        return render(request, 'document.html', {'documents': documents})

    def put(self, request):
        data = json.loads(request.body.decode('utf-8'))
        num_download = models.Document.objects.get(pk=data['pk']).num_download
        models.Document.objects.filter(pk=data['pk']).update(
            num_download=num_download+1)
        return HttpResponse(json.dumps({'result': 'success'}))


@login_required(login_url=settings.LOGIN_URL)
def buyDocument(request, id):
    return redirect('document')
