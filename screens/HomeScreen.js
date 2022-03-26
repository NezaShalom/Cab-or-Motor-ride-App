import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import tw from 'tailwind-rn'
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from "react-redux"
import { setDestination, setOrigin } from "../slices/navSlice"
import NavFavourites from '../components/NavFavourites';


const HomeScreen = () => {

    const dispatch = useDispatch();

    return (
        <View style={tw(`bg-white h-full`)}>
            <View style={tw(`p-5`)}>
                <Image
                    style={{
                        width: 160,
                        height: 110,
                        resizeMode: "contain",
                    }}
                  source={require('../images/ad.png')}
                />
                
                <GooglePlacesAutocomplete
                
                    placeholder="Uherereye he?"
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 16,
                        },
                    }}
                    onPress={(data, details = null) => {
                        dispatch(
                            setOrigin({
                            location: details.geometry.location,
                            description: data.description,
                        }))
                        dispatch(setDestination(null));
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />

                <NavOptions />

                {/* favorite places */}
                
                <NavFavourites />

            </View>
        </View>
    );
};

export default HomeScreen

const styles = StyleSheet.create({})
