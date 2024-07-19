from rest_framework import serializers
from .models import Category, Ingredient, Recipe, RecipeIngredient

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = serializers.SlugRelatedField(
        queryset=Ingredient.objects.all(),
        slug_field='name'
    )

    class Meta:
        model = RecipeIngredient
        fields = ['ingredient', 'quantity']

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = RecipeIngredientSerializer(many=True)
    categories = serializers.SlugRelatedField(
        queryset=Category.objects.all(),
        slug_field='name',
        many=True
    )

    class Meta:
        model = Recipe
        fields = '__all__'

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        categories_data = validated_data.pop('categories')
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            RecipeIngredient.objects.create(recipe=recipe, **ingredient_data)
        recipe.categories.set(categories_data)
        return recipe

    def update(self, instance, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        categories_data = validated_data.pop('categories')
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.instructions = validated_data.get('instructions', instance.instructions)
        instance.image = validated_data.get('image', instance.image)
        instance.save()

        instance.ingredients.clear()
        for ingredient_data in ingredients_data:
            RecipeIngredient.objects.create(recipe=instance, **ingredient_data)

        instance.categories.set(categories_data)
        return instance





















