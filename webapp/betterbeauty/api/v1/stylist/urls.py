from django.conf.urls import url

from .views import (
    StylistView,
    StylistServiceView,
    StylistServiceListView,
    ServiceTemplateSetListView,
    ServiceTemplateSetDetailsView,
)

urlpatterns = [
    url('profile$', StylistView.as_view()),
    url('service-template-sets$', ServiceTemplateSetListView.as_view()),
    url('service-template-sets/(?P<template_set_pk>\d+)$',
        ServiceTemplateSetDetailsView.as_view()),
    url('services$', StylistServiceListView.as_view()),
    url('services/(?P<service_pk>\d+)$', StylistServiceView.as_view()),
]