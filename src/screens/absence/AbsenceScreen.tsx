import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  // Dimensions,
  // Platform,
  // PermissionsAndroid,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import MapView, { Marker } from "react-native-maps";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

interface coords {
  latitude: number;
  longitude: number;
}

const WaitingDriverScreen = () => {
  const [currentLocation, setCurrentLocation] = useState<coords>({
    latitude: 0,
    longitude: 0,
  });
  const [initialRegion, setInitialRegion] = useState<any>(null);
  const watchId: number | null = null; // Variable to hold watch position ID

  const getLocation = async () => {
    Geolocation.getCurrentPosition((info) => {
      console.log("info: ", info);
      setCurrentLocation({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
      setInitialRegion({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    });
    // Geolocation.getCurrentPosition(
    //   position => {
    //     const { latitude, longitude } = position.coords;
    //     console.log("position: ", latitude, longitude);
    //     setCurrentLocation({ latitude, longitude });
    //     setInitialRegion({
    //       latitude: latitude,
    //       longitude: longitude,
    //       latitudeDelta: 0.005,
    //       longitudeDelta: 0.005,
    //     });
    //   },
    //   (error) => console.log(error),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
  };

  useEffect(() => {
    getLocation();
    // async function requestPermissions() {
    //   if (Platform.OS === "android") {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //       {
    //         title: "Location Permission",
    //         message: "App needs access to your location",
    //         buttonNeutral: "Ask Me Later",
    //         buttonNegative: "Cancel",
    //         buttonPositive: "OK",
    //       },
    //     );
    //     console.log("granted: ", granted);
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       console.log("You can use the location");
    //       // Start watching location updates if permission is granted
    //       getLocation();
    //     }
    //   }
    // }
    // requestPermissions();

    // Cleanup function to stop watching location updates when component unmounts
    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default WaitingDriverScreen;
