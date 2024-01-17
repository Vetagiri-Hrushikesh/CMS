#!/bin/bash

# Change to your React Native project directory
cd ../CMSApp/

# Install dependencies and pods
npm install
cd ios
pod disintegrate && pod install
cd ..

# Build and run the iOS app
npx react-native run-ios
