from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    path("add", views.add, name="add"),
    path("user", views.user, name="user"),
    path("membershipinfo", views.membershipinfo, name="memebershipinfo"),



    # API Routes
    path("join", views.join, name="join"),
    path("class_capacity", views.class_capacity, name="class_capacity"),





]


# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL,
#                           document_root=settings.MEDIA_ROOT)
