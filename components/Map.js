import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import tw from "tailwind-rn"
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import {GOOGLE_MAPS_APIKEY} from "@env"

const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
      if (!origin || !destination) return;

      //Zoom &fit to markers
      mapRef.current.fitToSuppliedMarkers(["origin","destination"], {
        edgePadding: { top:50, right:50, buttom:50, left:50 },
      });
    }, [origin, destination]);

    //GOOGLE DISTANCE METRICS CALCULATION === TRAVEL TIME
     
    useEffect(() => {
      if (!origin || !destination) return;

      const getTravelTime = async () => {
          fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
            ).then((res) => res.json())
            .then(data => {
              dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
            })
      };
      getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_APIKEY]);

    return (
        <MapView
        ref={mapRef}
        style={tw(`flex-1`)}
        mapType="mutedStandard"
        initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922,
    }}
    >
      {origin && destination && (
        <MapViewDirections
          lineCap="square"
          lineDashPattern={[1]}
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{ 
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
          />
      )}
    </MapView>
    );
};

export default Map

const styles = StyleSheet.create({})
