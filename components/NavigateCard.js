import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeViewAndroid from './SafeViewAndroid'
import tw from "tailwind-rn"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { GOOGLE_MAPS_APIKEY } from "@env"
import { setDestination } from '../slices/navSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/core'
import NavFavourites from './NavFavourites'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'


const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

  return (
    <View style={tw(`bg-white flex-1`)}>
        <Text style={tw(`text-center py-3 text-xl`)}>Welcome, Shalom</Text>
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

            <NavFavourites />
        </View>

        <View
            style={tw(`flex-row bg-white justify-evenly py-2 mt-0 border-t border-gray-100`)}
        >
            <TouchableOpacity 
            onPress= {() => navigation.navigate('RideOptionCard')}
            style={tw(`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`)}>
                <Icon name="car" type="font-awesome" color="white" size={16} />
                <Text style={tw(`text-white text-center`)}> Taxi</Text>
            </TouchableOpacity>

            <TouchableOpacity style={tw(`flex flex-row justify-between w-24 px-4 py-3 rounded-full`)}>
                <Icon name="motorcycle" type="font-awesome" color="black" size={16} />
                <Text style={tw(`text-center`)}>Motor</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

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