from rest_framework import serializers
from .models import UploadedFile

class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = ('id', 'file', 'uploaded_at', 'user')
        read_only_fields = ('id', 'uploaded_at', 'user')

    def create(self, validated_data):
        user = self.context['request'].user
        return UploadedFile.objects.create(user=user, **validated_data)
