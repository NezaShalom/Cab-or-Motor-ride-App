import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SafeViewAndroid from './SafeViewAndroid'
import tw from 'tailwind-rn'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { useNavigation } from '@react-navigation/core'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'
import "intl";
import "intl/locale-data/jsonp/en";


const data = [
  {
    id: "Taxi-X-123",
    title: "Taxi-X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Taxi-X-456",
    title: "Taxi-XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Taxi-X-789",
    title: "Taxi-LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

//COST RIDE PRICE

const SURGE_CHARGE_RATE = 500;


const RideOptionCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const TravelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <View style={tw(`bg-white flex-1`)}>
      <View>
        <TouchableOpacity
         onPress={() => navigation.navigate("NavigateCard")}
         style={tw(`flex-row top-5 left-5 rounded-full`)}>
          <Icon name="chevron-left" type="fontawesome" /> 
        </TouchableOpacity>
        <Text style={tw(`text-center -mt-2 text-xl`)}>Select a Ride - {TravelTimeInformation?.distance.text}</Text>
      </View>

      {/*car chooses */}
      <FlatList
        data={data} keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity 
          onPress= {() => setSelected(item)}
          style={tw(` flex-row justify-between items-center px-6 ${id === selected ?.id && "bg-gray-100"}`)}>
            <Image style={{ width: 90, height: 80, resizeMode: "contain", }}
            source={{ uri: image }} />
            <View style={tw(`-ml-6`)}>
              <Text style={tw(`font-bold`)}>{title}</Text>
              <Text>{TravelTimeInformation?.duration.text} Travel Time</Text>
            </View>
            <Text>

              {new Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'RWF',
              }).format(
              (TravelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100 
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw(`mt-0 border-t border-gray-200`)}>
        <TouchableOpacity disabled={!selected} style={tw(`bg-black py-3 m-3 rounded-md ${!selected && "bg-gray-300"}`)}>
          <Text style={tw(`text-center text-white`)}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RideOptionCard

const styles = StyleSheet.create({})