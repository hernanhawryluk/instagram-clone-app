# instagram-clone-app

![Instagram Replica](./assets/images/header-logo.png)

Una réplica funcional de Instagram desarrollada en React Native como parte de mi portafolio como desarrollador.

## Características

- **Registro y Autenticación**: Permite a los usuarios crear cuentas, iniciar sesión y recuperar contraseñas de forma segura.
- **Exploración y Búsqueda**: Ofrece la capacidad de descubrir contenido y usuarios interesantes.
- **Creación y Edición de Contenido**: Permite a los usuarios crear y editar publicaciones, historias y reels.
- **Carga de Medios**: Facilita la carga de imágenes desde el almacenamiento del dispositivo o la captura de fotos desde su cámara.
- **Interacción Social**: Permite dar "me gusta" y comentar en publicaciones, así como seguir o dejar de seguir a otros usuarios.
- **Perfiles de Usuarios**: Cada usuario tiene un perfil personalizado con información y lista de publicaciones.
- **Notificaciones y Chat en Tiempo Real**: Ofrece notificaciones instantáneas y chat en tiempo real para mantener a los usuarios conectados.

## Tecnologías Utilizadas

- Expo.
- React Native.
- Firebase (autenticación y almacenamiento en la nube).

## Instalación

1. Clona el repositorio en tu máquina local.
   - git clone https://github.com/hernanhawryluk/instagram-clone-app
2. Navega al directorio del proyecto.
   - cd instagram-clone-app
3. Instala las dependencias:
   - npm install
4. Configura Firebase:
   - Crea un proyecto en Firebase (Authentification - Firestore - Storage).
   - Implementa las reglas de Firebase y Firestore que se encuentran en las carpetas `/src/services/firebase.rules` y `firestore.rules`.
   - Copia y pega las credenciales de Firebase en el archivo `/src/services/firebaseConfig.js`.
   - Renombra el archivo `/src/services/firebaseConfig.js` a `/src/services/firebase.js`.
5. Instala "eas-cli", inicia sesión y crea un "Development Build" en Expo:
   - npm install -g eas-cli
   - eas login
   - eas build --profile development-simulator --platform ios
6. Inicia la aplicación:
   - npx expo start

## Capturas de Pantalla

<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
  <img src="./assets/screenshots/LoginScreen.png" width=350 height=700>
  <img src="./assets/screenshots/HomeScreen.png" width=350 height=700>
  <img src="./assets/screenshots/PostsScreen.png" width=350 height=700>
  <img src="./assets/screenshots/SearchScreen.png" width=350 height=700>
  <img src="./assets/screenshots/NewPostScreen.png" width=350 height=700>
  <img src="./assets/screenshots/NewStoryScreen.png" width=350 height=700>
  <img src="./assets/screenshots/ReelsScreen.png" width=350 height=700>
  <img src="./assets/screenshots/ProfileScreen.png" width=350 height=700>
  <img src="./assets/screenshots/ShareQRModal.png" width=350 height=700>
  <img src="./assets/screenshots/DetailScreen.png" width=350 height=700>
  <img src="./assets/screenshots/CommentsModal.png" width=350 height=700>
  <img src="./assets/screenshots/FollowersScreen.png" width=350 height=700>
  <img src="./assets/screenshots/OptionsModal.png" width=350 height=700>
  <img src="./assets/screenshots/PictureModal.png" width=350 height=700>
</div>

Hecho por Hernán Hawryluk - www.linkedin.com/in/hernan-hawryluk
