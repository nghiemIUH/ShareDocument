from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.views import APIView
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector
from django.db.models import F
from . import models
from . import serializers
# Create your views here.


class CustomPagination(LimitOffsetPagination):
    default_limit = 10


@api_view(['GET'])
@permission_classes([AllowAny])
def getAllCategory(request):
    try:
        category = models.Category.objects.all()
        category_se = serializers.CategorySerialize(category, many=True)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(data=category_se.data, status=status.HTTP_200_OK)


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


class GetAllDocumentView(APIView, CustomPagination):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            documents = models.Document.objects.all().order_by('-date')
            result = self.paginate_queryset(documents, request, view=self)
            document_se = serializers.DocumentSerialize(result, many=True)
            return self.get_paginated_response(document_se.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class SearchDocument(APIView, CustomPagination):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            query = request.GET.get('keyword')

            category_name = request.GET.get('category')
            if category_name == 'All':
                documents = models.Document.objects.all()
            else:
                category = models.Category.objects.get(title=category_name)
                documents = models.Document.objects.filter(category=category)
            if query.strip() != "":
                search_vector = SearchVector(
                    'title', weight='B')+SearchVector('description', weight='A')
                search_query = SearchQuery(query)
                documents = documents.annotate(rank=SearchRank(
                    search_vector, search_query)).filter(rank__gte=0.3).order_by('-rank')
            documents = self.paginate_queryset(documents, request, view=self)
            document_se = serializers.DocumentSerialize(documents, many=True)
            return self.get_paginated_response(document_se.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def increaseView(request):
    models.Document.objects.filter(
        pk=request.GET['id']).update(view=F('view')+1)
    return Response(status=status.HTTP_200_OK)
