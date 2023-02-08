import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from 'react-native'
import ListingCard from '../components/ListingCard'

import { ChevronLeftIcon, PlusIcon, UsersIcon } from "react-native-heroicons/solid"
import { useState } from 'react'

export default function Profile({navigation}) {

    const [listings, setlistings] = useState([1])

    const getlistings = ()=>{
        // fetch users listings
        setlistings([])
    }

    const updatelisting = ()=>{
        // update the value of listing
    }
  return (
    <SafeAreaView>
        <View style={StyleSheet.body}>
            <View style={styles.appBar}>
                <Pressable onPress={()=> navigation.goBack()}>
                    <ChevronLeftIcon size={28} color='#1e1e1e'/>
                </Pressable>
                <Pressable onPress={()=> navigation.navigate('Accounts')}>
                    <UsersIcon size={28} color='#1e1e1e'/>
                </Pressable>
            </View>
            <View style={{height: '92%',width: '100%'}}>
                <ScrollView style={{width: '100%', height: '100%'}}>
                <Text style={styles.textbox}>User name</Text>
                    <Text style={styles.textbox}>Telephone no</Text>
                    <Text style={styles.textbox}>User@name.email</Text>
                    <Text style={styles.textbox}>My listings</Text>
                    <ScrollView style={{ paddingHorizontal: 10}}>
                        {listings.map((l)=> <ListingCard key={l}/>)}
                        {/* <ListingCard/>
                        <ListingCard/>
                        <ListingCard/>
                        <ListingCard/>
                        <ListingCard/> */}
                    </ScrollView> 
                </ScrollView>
            </View>
            <View style={{width: '100%',justifyContent: 'center', bottom: 20, position: 'absolute', alignItems: 'center'}}>
                <Pressable onPress={()=> navigation.navigate('Listing')}>
                    <View style={styles.float}>
                        <PlusIcon size={28} color='white'/>
                    </View>
                </Pressable>
            </View>
        </View>
    </SafeAreaView>
  )
}





const styles = StyleSheet.create({
    body:{
        position: 'relative',
        width:'100%',
        height: '100%'
    },
    appBar:{
        height: '8%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    textbox:{
        marginHorizontal: 20,
        marginVertical: 10
    },
    icon:{
        height: 28,
        width: 28,
        borderRadius: 14,
        backgroundColor: 'green'
    },
    float:{
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: '#1e1e1e'
    }
})