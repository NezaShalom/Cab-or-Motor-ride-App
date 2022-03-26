import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tw from "tailwind-rn"
import Map from '../components/Map'
import { createStackNavigator } from '@react-navigation/stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionCard from '../components/RideOptionCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';

const MapScreen = () => {
    const Stack = createStackNavigator();
    const navigation = useNavigation();

    return (
        <View>



            <View style={tw(`h-1/2`)}>      
                {/* BACK BUTTON */}
                <View style={tw(`bg-white absolute top-4 left-8 z-50 p-3 rounded-full`)}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                        <Icon name="menu" />
                    </TouchableOpacity>
                </View>
                
                <Map />
            </View>

            <View style={tw(`h-1/2`)}>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    
                    <Stack.Screen 
                        name="RideOptionCard"
                        component={RideOptionCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen

const menuiconedit = StyleSheet.create({

})
