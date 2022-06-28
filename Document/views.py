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
        category = models.Category.objects.all()
        if request.user.is_authenticated:
            document_user = models.DocumentUser.objects.values_list(
                'document', flat=True).filter(user=request.user)
            data = {'category': category, 'document_user': document_user}

        else:
            data = {'category': category}
        return render(request, 'document.html', data)

    def put(self, request):
        data = json.loads(request.body.decode('utf-8'))
        num_download = models.Document.objects.get(pk=data['pk']).num_download
        models.Document.objects.filter(pk=data['pk']).update(
            num_download=num_download+1)
        return HttpResponse(json.dumps({'result': 'success'}))


@login_required(login_url=settings.LOGIN_URL)
def buyDocument(request, id):
    document = models.Document.objects.get(pk=id)
    user = request.user
    try:
        document_user = models.DocumentUser.objects.get(user=user)

    except:
        document_user = models.DocumentUser.objects.create(user=user)

    document_user.document.add(document)
    document_user.save()
    user.balance -= document.price
    user.save()
    return redirect('/document')
