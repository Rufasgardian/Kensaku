import os
import subprocess
import json
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from .models import UploadedFile
from .serializers import UploadedFileSerializer

class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        file_serializer = UploadedFileSerializer(data=request.data, context={'request': request})
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FileContentView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, file_id, *args, **kwargs):
        try:
            uploaded_file = UploadedFile.objects.get(id=file_id, user=request.user)
            file_path = uploaded_file.file.path
            file_name = os.path.basename(file_path)

            if not os.path.exists(file_path):
                return Response({'error': 'File not found on the server'}, status=status.HTTP_404_NOT_FOUND)

            with open(file_path, 'r') as file:
                content = file.read()

            # Run Bandit scan
            process = subprocess.run(['bandit', '-f', 'json', '-r', file_path], capture_output=True, text=True)
            bandit_results = json.loads(process.stdout)

            # Extract issues
            issues = []
            for result in bandit_results.get('results', []):
                issues.append({
                    'line_number': result['line_number'],
                    'issue_text': result['issue_text'],
                    'test_name': result['test_id'],
                    'severity': result['issue_severity']
                })

            return Response({'file_content': content, 'file_name': file_name, 'issues': issues}, status=status.HTTP_200_OK)
        except UploadedFile.DoesNotExist:
            return Response({'error': 'File not found in the database'}, status=status.HTTP_404_NOT_FOUND)

class UserFilesListView(generics.ListAPIView):
    serializer_class = UploadedFileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = UploadedFile.objects.filter(user=self.request.user)
        existing_files = []
        for file in queryset:
            if os.path.exists(file.file.path):
                existing_files.append(file)
        return existing_files
