import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from 'react-native'
import ListingCard from '../components/ListingCard'

import { ChevronLeftIcon, PlusIcon } from "react-native-heroicons/solid"

export default function Profile({navigation}) {
  return (
    <SafeAreaView>
        <View style={StyleSheet.body}>
            <View style={{position: 'absolute', top: '50%', right: 10, zIndex: 2}}>
                <Pressable onPress={()=> navigation.navigate('Listing')}>
                    <View style={styles.float}>
                        <PlusIcon size={28} color='#1e1e1e'/>
                    </View>
                </Pressable>
            </View>
            <View style={styles.appBar}>
                <Pressable onPress={()=> navigation.goBack()}>
                    {/* <View style={styles.icon}></View> */}
                    <ChevronLeftIcon size={28} color='#1e1e1e'/>
                </Pressable>
                <Pressable onPress={()=> navigation.navigate('Accounts')}>
                    <View style={styles.icon}></View>
                </Pressable>
            </View>
            <Text style={styles.textbox}>User name</Text>
            <Text style={styles.textbox}>Telephone no</Text>
            <Text style={styles.textbox}>User@name.email</Text>
            <Text style={styles.textbox}>My listings</Text>
            <ScrollView style={{height: '100%', paddingHorizontal: 10}}>
                <ListingCard/>
                <ListingCard/>
                <ListingCard/>
                <ListingCard/>
                <ListingCard/>
            </ScrollView>
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
        height: 50,
        // backgroundColor: 'red',
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
        // position: 'absolute',
        // // bottom: '20%',
        // top: '50%',
        // right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: 'red'
    }
})