import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import tw from "tailwind-rn";
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';


const data = [
    {
        id: "123",
        title: "Solid Waste",
        image: "https://i.ibb.co/7JcXgmd/2718784.png",
        screen: "MapScreen",
    },
    {
        id: "456",
        title: "Liquid Waste",
        image: "https://i.ibb.co/B2g6Rym/Png-Item-1649314.png",
        screen: "EatsScreen",
    }
];

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity
            onPress= {() => navigation.navigate(item.screen)}
            style={tw(`p-2 pl-5 pb-8 pt-4 bg-gray-200 m-2`)}
            disabled={!origin}
            >
                <View style={tw(`${!origin && "opacity-20"}`)}>
                    <Image
                    style={{ width: 115, height: 120, resizeMode: "contain" }}
                    source={{ uri: item.image }}
                    />
                    <Text style={tw(`mt-2 text-base font-bold`)}>{item.title}</Text>
                    <Icon 
                    style={tw(`p-2 bg-black rounded-full w-10 mt-4`)}
                    name="arrowright" color="white" type="antdesign" />
                </View>
            </TouchableOpacity>
        )}
        />
    )
}

export default NavOptions

const styles = StyleSheet.create({})
