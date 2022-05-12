## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mira **Deployment** para conocer como desplegar el proyecto.

### Instalación 🔧

_Para instalar las dependencias


```
composer install
```

_Configurar el archivo .env

```
php artisan migrate
php artisan passport:install //Este comando creará las claves de cifrado necesarias para generar tokens de acceso seguro
php artisan serve

```
