from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from django.conf.urls import url

from .views import RegisterUserView

urlpatterns = [
    url(r'^get-token$', obtain_jwt_token),
    url(r'^refresh-token$', refresh_jwt_token),
    url(r'^register$', RegisterUserView.as_view())
]