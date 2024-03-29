import { View, SafeAreaView, StyleSheet, Text, Pressable } from 'react-native'
import ImagesCard from '../components/ImagesCard'

import firestore from '@react-native-firebase/firestore'

import { ChevronLeftIcon, MapPinIcon } from "react-native-heroicons/solid"
import { useState } from 'react'

export default function Details({navigation, route}) {

    const ref = firestore().collection('users')
    const [more, setMore] = useState(false)
    const [current, setCurrent] = useState({})
    const [error, setError] = useState(false)
    const [emsg, setEmsg] = useState('')

    const viewMore = ()=>{
        // fetch & show owner details
        getUser()
    }

    const getUser = async ()=>{
        const owner = route.params.owner
        if(owner !== null){
            const doc = await ref.doc(owner).get().catch((e)=>{
                setEmsg('Error fetching data')
                setError(true)
                return
            })
            if(doc.exists){
                setCurrent(doc.data())
                setMore(true)
                return
            }
            setEmsg('No owner details found database')
            setError(true)
        } else {
            setEmsg('No owner details found')
            setError(true)
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.body}>
                <View style={styles.appBar}>
                    <Pressable onPress={()=>navigation.goBack()}>
                        <ChevronLeftIcon size={28} color='red'/>
                    </Pressable>
                    <Pressable onPress={()=>navigation.navigate('Map', {long: route.params.geoloc[0], lat: route.params.geoloc[1]})}>
                        <MapPinIcon size={28} color='green'/>
                    </Pressable>
                </View>
                <ImagesCard images={route.params.images}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.price}>{route.params.price} ksh</Text>
                    {
                        route.params.units &&
                        <Text style={styles.price}>{route.params.units} Left</Text>
                    }
                </View>
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
                        <Text style={styles.data}>
                            {current.name !== null && current.name}
                            {!current.name && "No name found"}
                        </Text>
                        <Text style={styles.data}>
                            {current.telephone !== null  && current.telephone}
                            {!current.telephone && "No phone found"}
                        </Text>
                        <Text style={styles.data}>
                            {current.email !== null && current.email}
                            {!current.email && "No mail found"}
                        </Text>
                    </>
                    :<></>
                }
                {
                    error && 
                    <View >
                        <Text style={{color: 'red', margin: 20}}>{emsg}</Text>
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body:{
        width:'100%',
        height: '100%',
        backgroundColor: 'white',
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
        fontSize: 15,
        marginVertical: 5,
        paddingHorizontal: 20,
        color: '#111eee'
    },
    dataextra:{
        fontSize: 16,
        marginVertical: 5,
        color: '#1e1e1e',
        fontSize: 16
    },
})