from django.db import models

# Create your models here.

# model to group recipes into types
class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
    
# model for ingredients
class Ingredient(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
    
# model for recipe
class Recipe(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    ingredients = models.ManyToManyField(Ingredient, through='RecipeIngredient')
    instructions = models.TextField()
    categories = models.ManyToManyField(Category)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    
    def __str__(self):
        return self.title

# model for recipe ingredients
class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.quantity} {self.ingredient} for {self.recipe}"
