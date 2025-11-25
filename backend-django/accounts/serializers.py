from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
            write_only=True,
            # Agrega * cuando se escribe el password en el form. 
            style ={'input_type': 'password'},
            min_length=8
            )

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # User.objects.create = save the password as plain text (not hashed)
        # User.objects.create_user = automatically hashes the password
        user = User.objects.create_user(
                validated_data['username'],
                validated_data['email'],
                validated_data['password']
            )
        # user = User.objects.create_user(**validated_data)
        return user
