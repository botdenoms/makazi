import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from 'react-native'
import HouseCard from '../components/HouseCard'

import { MagnifyingGlassIcon, UserCircleIcon } from "react-native-heroicons/solid"
import { useState } from 'react'

export default function Home({ navigation }) {
    const toDetails = ()=>{
        navigation.navigate('Details')
    }

    const toAccounts = ()=>{
        if (user === null){
            navigation.navigate('Accounts')
        } else{
            navigation.navigate('profile')
        }
    }

    const loadUser = ()=>{
        //local storage load user
        setUser('user')
    }

    const loadHouses = ()=>{
        // request data
        setHouses([])
    }

    const [houses, setHouses] = useState([1,2,3])
    const [user, setUser] = useState(null)

    return (
        <SafeAreaView>
            <View style={styles.body}>
                <View style={styles.appBar}>
                    <Text>Makazi</Text>
                    <Pressable onPress={()=> toAccounts()}>
                        <UserCircleIcon size={36} color='#1e1e1e'/>
                    </Pressable>
                </View>
                <ScrollView 
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scroll}
                >
                    <Text>Featured</Text>
                    {
                        houses.map((h)=> <HouseCard to={toDetails} key={h}/>)
                    }
                    {/* <HouseCard to={toDetails}/>
                    <HouseCard to={toDetails}/>
                    <HouseCard to={toDetails}/>
                    <HouseCard to={toDetails}/>
                    <HouseCard to={toDetails}/> */}
                </ScrollView>
                <View style={{width: '100%',justifyContent: 'center', bottom: 20, position: 'absolute', alignItems: 'center'}}>
                    <Pressable onPress={()=> navigation.navigate('Search')}>
                        <View style={styles.float}>
                            <MagnifyingGlassIcon size={28} color='#fff'/>
                        </View>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    body:{
        width: '100%',        
        height: '100%',
        // backgroundColor: '#1e1e1e'
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
    scroll:{
        flex: 1,
        paddingHorizontal: 10,
        // marginBottom: 10,
        paddingTop: 5,
        // backgroundColor: 'green'
    },
    icon:{
        height: 28,
        width: 28,
        borderRadius: 14,
        backgroundColor: 'green'
    },
    float:{
        // position: 'absolute',
        // bottom: 20,
        // left: '44%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: '#1e1e1e'
    }
})