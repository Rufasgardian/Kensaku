from django.contrib import admin
from django.urls import path
from users.views import UserCreate, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from file_upload.views import FileUploadView, FileContentView, UserFilesListView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/signup/', UserCreate.as_view(), name='user-create'),
    path('api/auth/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/upload/', FileUploadView.as_view(), name='file-upload'),
    path('api/file/<int:file_id>/', FileContentView.as_view(), name='file-content'),
    path('api/user/files/', UserFilesListView.as_view(), name='user-files'),  # Add this line
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
