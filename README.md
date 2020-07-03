# WMS Mobile Android
Software de manejo de bodega, aplicación para Handhelds Android.
Branch original `GForce@Paris`

## Dependencias
* Node 9.5.0
* Cordova 7.0.0
* Android SDK Platform Tools
* Android API 26, 27 y 29

## Uso
### Instalación
1. Descargar repo
```bash
git clone https://github.com/procesoseficientes/swift-wms-android.git
```
2. Abrir carpeta
```bash
cd swift-wms-android
```
3. Descargar dependencias NOM
```bash
npm i
```

### Ejecución
1. Compilar y correr el app en el buscador
```bash
./node_modules/.bin/ionic serve
```
Ingresar `N` si Ionic pregunta para actualizar el app.

Despues de esperar que abra la aplicación deberá de salir una pantalla de error con la descripción `Typescript Error:
A tuple type element list cannot be empty.`

2. Reactivar el compilador
  
Entrar a cualquier archivo dentro de `/src`, preferibilemente `/src/security/security.ts` y presionar `Ctrl+S` para reactivar el compilador.

Este paso puede tardar varios minutos en terminar.

### Configuración
El archivo de configuración para conectar con el backend está en `/src/security/security.ts`.
