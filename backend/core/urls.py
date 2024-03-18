from django.conf.urls.static import static
from django.conf import settings
from django.urls import path
from . import views

urlpatterns = [
    path('profiles/',views.signup , name='profile-list-create'),
    path('login',views.login_view,name="login-view"),
    path('user-details',views.userdetails,name="user-details"),
    path('add-list',views.addProducts,name="add-list"),
    path('categories',views.categories,name="categories"),
    path('bid-lists',views.bid_lists,name="bidlists"),
    path('add-to-watchlist',views.add_to_watchlist,name="add-to-watchlist"),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
