import { View, SafeAreaView, StyleSheet, Text, Pressable } from 'react-native'
import ImagesCard from '../components/ImagesCard'

import { ChevronLeftIcon, MapPinIcon } from "react-native-heroicons/solid"

export default function Details({navigation}) {
  return (
    <SafeAreaView>
        <View style={styles.body}>
            <View style={styles.appBar}>
                <Pressable onPress={()=>navigation.goBack()}>
                    {/* <View style={styles.icon}></View> */}
                    <ChevronLeftIcon size={28} color='#1e1e1e'/>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate('Map')}>
                    {/* <View style={styles.icon}></View> */}
                    <MapPinIcon size={28} color='#1e1e1e'/>
                </Pressable>
            </View>
            <ImagesCard/>
            <Text style={styles.price}>20, 000 ksh</Text>
            <View style={styles.more}>
                <Text style={styles.dataextra}>1 Bedrooms</Text>
                <Text style={styles.dataextra}>1 Bathrooms</Text>
            </View>
            <Text style={styles.address}>County, address</Text>
            <Text style={styles.header}>Availability status</Text>
            <Text style={styles.data}>Available</Text>
            <Text style={styles.header}>Owner/renter</Text>
            <Text style={styles.data}>Owner.email.com</Text>
            <Text style={styles.data}>Telphone no</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    body:{
        width:'100%',
        height: '100%'
    },
    appBar:{
        height: 50,
        // backgroundColor: 'red',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    icon:{
        height: 28,
        width: 28,
        borderRadius: 14,
        backgroundColor: 'green'
    },
    price:{
        color: 'green',
        fontSize: 18,
        marginVertical: 5,
        paddingHorizontal: 20
    },
    more:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 5
    },
    address:{
        fontSize: 18,
        paddingHorizontal: 20,
    },
    header:{
        fontSize: 12,
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    data:{
        fontSize: 17,
        marginVertical: 5,
        paddingHorizontal: 20
    },
    dataextra:{
        fontSize: 16,
        marginVertical: 5,
    },
})