
"""
Django settings for tradingBackEnd project.

Generated by 'django-admin startproject' using Django 3.1.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
from pymongo import MongoClient
from urllib.parse import quote_plus


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '#v^^d_^a_fb&6sbj^kyj_v-3xqj#&i-lxj*n)4_*(==6bv7yx@'
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
ALLOWED_HOSTS = []


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'accessControl',
    'candlestick'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware', # 加入中间键 位置必须在这里 不能在其他位置
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'CustomizedMiddleware.CROSmiddleware.CoreMiddle',
]


ALLOWED_HOSTS = ['*'] # 允许全部IP访问项目
ROOT_URLCONF = 'tradingBackEnd.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'tradingBackEnd.wsgi.application'

# Database settings using pymongo directly
MONGO_URI = "mongodb+srv://hanxy030703:2ZbMcWH4HtyTP8Xg@aginetrading.4ogjg.mongodb.net/?retryWrites=true&w=majority&appName=aginetrading"

# Initialize MongoDB connection
client = MongoClient(MONGO_URI)
db = client['aginetrading']


# # Database
# #https://docs.djangoproject.com/en/3.1/ref/settings/#databases
# DATABASES = {
#    'default': {
#     'ENGINE': 'djongo',
#     'ENFORCE_SCHEMA': True,
#     'NAME': 'aginetrading',
#     # 'PORT': port_number,
#     # 'USER': 'db-username',
#     # 'PASSWORD': 'password',
#     # 'AUTH_SOURCE': 'db-name',
#     # 'AUTH_MECHANISM': 'SCRAM-SHA-1',
#     # 'REPLICASET': 'replicaset',
#     # 'SSL': 'ssl',
#     # 'SSL_CERTFILE': 'ssl_certfile',
#     # 'SSL_CA_CERTS': 'ssl_ca_certs',
#     # 'READ_PREFERENCE': 'read_preference',
#     'CLIENT': {
#         'host': "mongodb+srv://hanxy030703:2ZbMcWH4HtyTP8Xg@aginetrading.4ogjg.mongodb.net/?retryWrites=true&w=majority&appName=aginetrading"
#     }
#    }
# }

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_HEADERS = ('*')