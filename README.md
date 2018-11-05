# Delft-bikefinder
A small React Native application to find your bike at bike storage 2 at Delft Station. Scan the QR-code of your bikespot and it will automagicly save the location.

TODO:
Get it now on (link)F-Droid and (link)Play Store

## Features
- Works completely offline, no accounts etc needed
- Designed to be simple and useful
- Always remembers last spot where you put your bike, even if you (accidentally) delete your history

## To do
- [ ] English version
- [ ] Support for more bike storages (If any of them do have QR-codes? If so let me know!)
- [ ] Add to the App Store (Apple devices are already supported by the app. However, as a poor student I cannot build/pubish the iOS app)

## Contributing
Contributions are always nice and are more than welcome. However, there is one important thing to remember:

> KISS (Keep It Simple Stupid)

So please don't add Redux, to name something... :P

To build and run this project yourself:
```bash
git clone https://github.com/svenvdvoort/Delft-bikefinder.git
cd Delft-bikefinder
npm install                # install all dependencies in this folder
react-native run-android   # to run on an Android device/emulator
react-native run-ios       # to run on an iOS device/emulator (only on Apple computers)
```

# License
This project is licensed under the GNU General Public License v3, or, at your option, any later version. For more information see the [LICENSE](LICENSE) file.
