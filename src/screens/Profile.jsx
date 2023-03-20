import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from 'react-native'
import ListingCard from '../components/ListingCard'

import { ChevronLeftIcon, PlusIcon, UsersIcon } from "react-native-heroicons/solid"
import { useEffect, useState } from 'react'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default function Profile({navigation}) {

    const ref = firestore().collection('users')
    const refList = firestore().collection('listings')
    const [current, setCurrent] = useState({})
    const [profile, setProfile] = useState(true)
    const [fetching, setFetching] = useState(true)

    useEffect(()=>{
        getUser()
        getlistings()
    }, [])

    const [listings, setlistings] = useState([])

    const getlistings = async ()=>{
        // fetch users listings
        if(auth().currentUser.uid !== null){
            const req = await refList.where('owner', '==', auth().currentUser.uid).get().catch((e)=>{
                console.log(`error: `, e)
                return
            })
            // console.log(req.docs)
            const lst = req.docs
            const temp = []
            for (let index = 0; index < lst.length; index++) {
                const element = {
                    id : lst[index].id,
                    ...lst[index].data()
                }
                temp.push(element)
            }
            setlistings([...temp])
            setFetching(false)
        } else {
            console.log('no current listings')
        }
    }

    const getUser = async ()=>{
        if(auth().currentUser.uid !== null){
            const doc = await ref.doc(auth().currentUser.uid).get().catch((e)=>{
                console.log(`error: `, e)
                return
            })
            setCurrent(doc.data())
            setProfile(false)
        } else {
            console.log('no user currently')
        }
    }

    const logOut = ()=>{
        auth().signOut().then(() => console.log('User signed out!'))
        navigation.replace('Accounts')
    }

    const exit = ()=>{
        if (auth().currentUser.uid !== null) {
            navigation.replace('Home')
        }else{
            navigation.navigate('Accounts')
        }
    }

    const updatelisting = ()=>{
        // update the value of listing
    }

    return (
        <SafeAreaView>
            <View style={StyleSheet.body}>
                <View style={styles.appBar}>
                    <Pressable onPress={()=> exit()}>
                        <ChevronLeftIcon size={28} color='#1e1e1e'/>
                    </Pressable>
                    <Pressable onPress={()=> logOut()}>
                        <UsersIcon size={28} color='#1e1e1e'/>
                    </Pressable>
                </View>
                <View style={{height: '92%',width: '100%'}}>
                    <ScrollView style={{width: '100%', height: '100%'}}>
                        {
                            profile?
                            <View style={{width: '100%', height: 200, justifyContent: 'center', alignItems: 'center'}}>
                                <Text>Loading...</Text>
                            </View>
                            :<>
                                <Text style={[styles.textbox, {fontSize: 17}]}>{current.name}</Text>
                                <Text style={[styles.textbox, {fontSize: 17}]}>{current.telephone}</Text>
                                <Text style={[styles.textbox, {fontSize: 17}]}>{current.email}</Text>
                                <View style={{borderBottomColor: '#1e1e1e', borderWidth: .5, marginHorizontal: 10, marginTop: 5}}></View>
                                <Text style={styles.textbox}>My listings</Text>
                            </>
                        }  
                        <ScrollView style={{ paddingHorizontal: 10}}>
                            {
                                fetching?
                                <View style={{width: '100%', height: 400, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>Loading...</Text>
                                </View>
                                : listings.length < 1?
                                <View style={{width: '100%', height: 500, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>No listing posted</Text>
                                </View>
                                :listings.map((l)=> <ListingCard key={l.id} data={l}/>)
                            }
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
        marginVertical: 5,
        color: '#1e1e1e'
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