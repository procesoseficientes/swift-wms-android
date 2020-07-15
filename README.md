# WMS Mobile Android
Software de manejo de bodega, aplicación para Handhelds Android.
Branch original `GForce@Paris`

## Dependencias
* Node 12.14.1
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


## Guía de release

1. Cambiar la version en el archivo config.xml
    - Este es el patrón para las versiones, `"año.mes.día."`
2. Compilar el proyecto corriendo el siguiente comando
```bash
./node_modules/.bin/ionic cordova build android
```
3. Este comando crea un .apk en el directiorio `swift-wms-android/platforms/android/build/outputs/apk`
4. Renombrar el archivo `andoid-debug.apk` que se encuentra en ese directorio como `wms@año.mes.dia.apk`
5. Comprometer y empujar los cambios con una descripción clara de los cambios que tiene ese release
6. Preferiblemente crear un Pull Request de la rama donde se hicieron los cambios a la principal
7. Crear el release en Github
8. Subir el .apk de Release en la sección de Binario en Github
9. Públicar el Release

### Archivo de configuración
Dentro del telefono android tiene que haber un archivo llamado `conf.json` en el directorio 
`Interna/Android/data/com.mobilityscm.swift3pl` con el suguiente formato:

```json
{
    "ulr": "http://192.168.0.5:6161"
}
```
```
.
|- Android
|   |- data
|   |   |- com.mobilityscm.swift3pl
|   |   |   |- **conf.json**
```