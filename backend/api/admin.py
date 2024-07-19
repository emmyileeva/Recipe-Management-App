from django.contrib import admin
from .models import Category, Ingredient, Recipe, RecipeIngredient

class RecipeIngredientInline(admin.TabularInline):
    model = RecipeIngredient
    extra = 1  

class RecipeAdmin(admin.ModelAdmin):
    inlines = [RecipeIngredientInline]
    list_display = ['title', 'description']

admin.site.register(Category)
admin.site.register(Ingredient)
admin.site.register(Recipe, RecipeAdmin)
