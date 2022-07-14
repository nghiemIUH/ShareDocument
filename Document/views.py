from unicodedata import category
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.views import APIView
from . import models
from . import serializers
# Create your views here.


@api_view(['GET'])
@permission_classes([AllowAny])
def getAllCategory(request):
    try:
        category = models.Category.objects.all()
        category_se = serializers.CategorySerialize(category, many=True)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(data=category_se.data, status=status.HTTP_200_OK)


class CustomPagination(LimitOffsetPagination):
    default_limit = 10


class GetDocumentView(APIView, CustomPagination):
    permission_classes = [AllowAny]

    def get(self, request, category):
        try:
            category = models.Category.objects.get(title=category)
            documents = models.Document.objects.filter(category=category)
            result = self.paginate_queryset(documents, request, view=self)
            documents_se = serializers.DocumentSerialize(result, many=True)
            return self.get_paginated_response(documents_se.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def getDocumentDeatil(request, slug):
    try:
        document = models.Document.objects.get(slug=slug)
        document_se = serializers.DocumentDetailSerialize(document)
        return Response(data=document_se.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
