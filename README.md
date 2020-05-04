# Places tracker

This is a React Native app that allows to keep a list of visited places. A user can input a title, add a picture with camera, and add location with Google Map. The user can tap on any item in the list to see the details (title, picture, and map image), and by taping on the map image the user will be able to see full screen non-editable map with marker on it. Each item in the list is deletable by long pressing on the item. 

## Downloading the project

Fork and clone this repo. It is recommended to install Android Studio Emulator as instructed 👉 in [expo-android-studio-emulator](https://docs.expo.io/workflow/android-studio-emulator/) or iOS Simulator as instructed 👉 in [expo-iOS-emulator](https://docs.expo.io/workflow/ios-simulator/). The following instruction is for Android Studio. 

## Install Expo CLI

```sh
npm install -g expo-cli
```

## Running the project

Open a virtual device in Android Studio.

```sh
cd react-native-visits-app
expo start
```

In the opened new window (usually on localhost:19002), click on the "Run on $(your device)" section to run app on the smartphone simulator or web.

## Screenshot of FixIT app in action

### The front screen with no added places

<img src="https://github.com/hanuz06/react-native-visits-app/blob/master/assets/images/front-screen-no-added-places.png?raw=true" width="292" height="500">

### The front screen with added places

<img src="https://github.com/hanuz06/react-native-visits-app/blob/master/assets/images/all-places.png?raw=true" width="292" height="500">

### Place details screen 

<img src="https://github.com/hanuz06/react-native-visits-app/blob/master/assets/images/calgary-tower.png?raw=true" width="292" height="500">

### Place delete alert 

<img src="https://github.com/hanuz06/react-native-visits-app/blob/master/assets/images/Screenshot%20from%202020-05-03%2018-23-31.png?raw=true" width="292" height="500">

### Map screen

<img src="https://github.com/hanuz06/react-native-visits-app/blob/master/assets/images/map.png?raw=true" width="292" height="500">


## Dependencies

- Node 12.x or above
- NPM 5.x or above
- formik ^2.1.4
- yup ^0.28.4
- redux ^4.0.5
- react-redux ^7.2.0
- redux-thunk ^^2.3.0
- react-native
- react-native-maps 0.26.1
- react-navigation ^4.3.8
- expo ~37.0.3
- expo-file-system ~8.1.0
- expo-image-picker ~8.1.0
- expo-location ~8.1.0
- expo-permissions ~8.1.0
- expo-sqlite ~8.1.0