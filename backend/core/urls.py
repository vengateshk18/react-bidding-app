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
    path('user-watchlist',views.user_watch_list,name="user-watchlist"),
    path('user-watchlist-delete-item',views.user_delete_watchlist_item,name="user-watchlist-delete-item"),
    path('get-list/<str:pk>',views.get_specific_list,name="get-list"),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
