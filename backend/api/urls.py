from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, IngredientViewSet, RecipeViewSet, RecipeIngredientViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'ingredients', IngredientViewSet)
router.register(r'recipes', RecipeViewSet)
router.register(r'recipe-ingredients', RecipeIngredientViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
