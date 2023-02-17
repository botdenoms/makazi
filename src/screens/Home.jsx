import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import HouseCard from '../components/HouseCard'

import { MagnifyingGlassIcon, UserCircleIcon } from "react-native-heroicons/solid"
import { useEffect, useState } from 'react'

export default function Home({ navigation }) {

    const [houses, setHouses] = useState([])
    const [user, setUser] = useState(null)
    const [load, setLoad] = useState(true)
    // const [idx, setIdx] = useState(0)

    const ref = firestore().collection('listings')

    useEffect(()=>{
        loadHouses()
        const subscriber = auth().onAuthStateChanged(loadUser)
        return subscriber
    }, [])

    const toDetails = (index)=>{
        navigation.navigate('Details', { ...houses[index]})
    }

    const toAccounts = ()=>{
        if (user === null){
            navigation.navigate('Accounts')
        } else{
            navigation.navigate('profile')
        }
    }

    const loadUser = async (user)=>{
        if (user) {
            setUser(user)
          } else {
            // Signed out
            setUser(null)
          }
    }

    const loadHouses = async ()=>{
        // request data
        // const lst = await (await ref.get()).docs
        const req = await ref.where('verified', '==', true).get()
        const lst = await req.docs
        const temp = []
        for (let index = 0; index < lst.length; index++) {
            const element = {
                id : lst[index].id,
                ...lst[index].data()
            }
            temp.push(element)
        }
        setHouses([...temp])
        setLoad(false)
        
    }

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
                        load?
                        <View style={{width: '100%', height: 400, justifyContent: 'center', alignItems: 'center'}}>
                            {/* <Text>Loading...</Text> */}
                            <ActivityIndicator color='#1e1e1e' animating={true}/>
                        </View>
                        : houses.length < 1?
                        <View style={{width: '100%', height: 400, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>Unavailable currently</Text>
                        </View>
                        :houses.map((h, i)=> <HouseCard to={toDetails} key={h.id} data={h} index={i}/>)
                    }

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
