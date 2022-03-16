import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeViewAndroid from './SafeViewAndroid'
import tw from "tailwind-rn"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { GOOGLE_MAPS_APIKEY } from "@env"
import { setDestination } from '../slices/navSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/core'


const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

  return (
    <View style={SafeViewAndroid.AndroidSafeArea}>
        <Text style={tw(`text-center py-2 text-xl`)}>Welcome, Shalom</Text>
        <View style={tw(`border-t border-gray-50 flex-shrink`)}>
            <View>
                <GooglePlacesAutocomplete
                    placeholder="Aho ujyiye?"
                    styles={toInputBoxStyle}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    minLength={2}
                    onPress={(data, details = null) => {
                        dispatch(
                            setDestination({
                            location: details.geometry.location,
                            description: data.description,
                        }))
                        navigation.navigate("RideOptionCard");
                    }}
                    enablePoweredByContainer={false}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "en",
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />
            </View>
        </View>
    </View>
  )
}

export default NavigateCard

const toInputBoxStyle = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#f0f0f2",
        borderRadius: 5,
        fontSize: 15,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
})