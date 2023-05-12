import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable, ActivityIndicator, Image } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import House from '../components/House'

import { MagnifyingGlassIcon, UserCircleIcon, HomeIcon} from "react-native-heroicons/solid"
import { useEffect, useState } from 'react'


export default function Home({ navigation }) {

    const [houses, setHouses] = useState([])
    const [user, setUser] = useState(null)
    const [load, setLoad] = useState(true)
    const [idx, setIdx] = useState(0)
    const [error, setError] = useState(false)
    const [emsg, setEmsg] = useState('')

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
        setError(false)
        const req = await ref.where('verified', '==', true).get().catch((e)=>{
            setEmsg('Error fetching data')
            setError(true)
            setLoad(false)
            return
        })
        if (!req.empty){
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
            setError(false)
            return
        }else{
            setEmsg('no listing found')
            setLoad(false)
            setError(true)
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.body}>
                <ScrollView 
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scroll}
                >
                    <View style={styles.appBar}>
                        <Image source={require('../components/makazi.png') } style={{height: 32, width: 32}}/>
                        <Pressable onLongPress={()=> navigation.navigate('Admin')}>
                            <Text style={{color: '#1e1e1e', fontWeight: '800', marginLeft: 5, fontSize: 20}}>Makazi</Text>
                        </Pressable>
                    </View>
                    <Text style={{color: '#1e1e1e'}}>Featured</Text>
                    {
                        load?
                        <View style={{width: '100%', height: 400, justifyContent: 'center', alignItems: 'center'}}>
                            {/* <Text>Loading...</Text> */}
                            <ActivityIndicator color='#1e1e1e' animating={true}/>
                            {
                                error && 
                                <View>
                                    <Text style={{color: 'red', margin: 20}}>{emsg}</Text>
                                    <Pressable style={styles.btn} onPress={()=>loadHouses()}>
                                        <Text style={{color: "green"}}>Reload</Text>
                                    </Pressable>
                                </View>
                            }
                        </View>
                        : houses.length < 1?
                        <View style={{width: '100%', height: 400, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#1e1e1e'}}>Unavailable currently</Text>
                            {
                                error && 
                                <View>
                                    <Text style={{color: 'red', margin: 20}}>{emsg}</Text>
                                    <Pressable style={styles.btn} onPress={()=>loadHouses()}>
                                        <Text style={{color: "green"}}>Reload</Text>
                                    </Pressable>
                                </View>
                            }
                        </View>
                        :houses.map((h, i)=> <House to={toDetails} key={h.id} data={h} index={i}/>)
                    }
                    <View style={{height: 10}}></View>
                </ScrollView>
                <View style={{width: '100%',justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 2}}>
                    <Pressable>
                        <View style={[[styles.float, {backgroundColor: idx == 0?"#1e1e1e":"white"}]]}>
                            <HomeIcon size={28} color='#fff'/>
                            <Text style={{color: idx == 0?'#fff':'#1e1e1e'}}>Home</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={()=> navigation.navigate('Search')}>
                        <View style={[styles.float, {backgroundColor: idx == 1?"#1e1e1e":"white"}]}>
                            <MagnifyingGlassIcon size={28} color={idx == 1?'#fff':'#1e1e1e'}/>
                            <Text style={{color: idx == 1?'#fff':'#1e1e1e'}}>Search</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={()=> toAccounts()}>
                        <View style={[styles.float, {backgroundColor: idx == 2?"#1e1e1e":"white"}]}>
                            <UserCircleIcon size={28} color={idx == 2?'#fff':'#1e1e1e'}/>
                            <Text style={{color: idx == 2?'#fff':'#1e1e1e'}}>Account</Text>
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
        backgroundColor: 'white'
    },
    appBar:{
        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        height: 48,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#1e1e1e'
    },
    btn:{
        padding: 5,
        backgroundColor: "#c1c1c1",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
})
