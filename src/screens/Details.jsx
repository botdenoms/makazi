import { View, SafeAreaView, StyleSheet, Text, Pressable } from 'react-native'
import ImagesCard from '../components/ImagesCard'

import { ChevronLeftIcon, MapPinIcon } from "react-native-heroicons/solid"
import { useState } from 'react'

export default function Details({navigation, route}) {

    const [more, setMore] = useState(false)

    const viewMore = ()=>{
        // fetch & show owner details
        setMore(true)
    }

    return (
        <SafeAreaView>
            <View style={styles.body}>
                <View style={styles.appBar}>
                    <Pressable onPress={()=>navigation.goBack()}>
                        {/* <View style={styles.icon}></View> */}
                        <ChevronLeftIcon size={28} color='red'/>
                    </Pressable>
                    <Pressable onPress={()=>navigation.navigate('Map', {long: route.params.geoloc[0], lat: route.params.geoloc[1]})}>
                        {/* <View style={styles.icon}></View> */}
                        <MapPinIcon size={28} color='green'/>
                    </Pressable>
                </View>
                <ImagesCard images={route.params.images}/>
                <Text style={styles.price}>{route.params.price} ksh</Text>
                <View style={styles.more}>
                    <Text style={styles.dataextra}>{route.params.bedrooms} Bedrooms</Text>
                    <Text style={styles.dataextra}>{route.params.bathrooms} Bathrooms</Text>
                </View>
                <Text style={styles.address}>{route.params.location[0]}, {route.params.location[1]}</Text>
                <Text style={styles.header}>Availability status</Text>
                <Text style={[styles.data, {color: route.params.availability == 1? 'green': 'red'}]}>{route.params.availability == 1?'Available':'Unavailable'}</Text>
                <Pressable onPress={()=> viewMore()}>
                    <Text style={[styles.header, {fontSize: 18, color:'#1e1e1e'}]}>Owner Contacts</Text>
                </Pressable>
                {
                    more?
                    <>
                        <Text style={styles.data}>Owner.email.com</Text>
                        <Text style={styles.data}>Telphone no</Text> 
                    </>
                    :<></>
                }
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
        position: 'absolute',
        zIndex: 2,
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
        fontSize: 19,
        paddingHorizontal: 20,
        color: '#1e1e1e',
        fontWeight: '700'
    },
    header:{
        fontSize: 12,
        paddingHorizontal: 20,
        marginVertical: 5,
        color: '#1e1e1e'
    },
    data:{
        fontSize: 17,
        marginVertical: 5,
        paddingHorizontal: 20
    },
    dataextra:{
        fontSize: 16,
        marginVertical: 5,
        color: '#1e1e1e',
        fontSize: 16
    },
})