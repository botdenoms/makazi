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
    const [listings, setlistings] = useState([])
    const [error, setError] = useState(false)
    const [emsg, setEmsg] = useState('')

    useEffect(()=>{
        getUser()
        getlistings()
    }, [])

    const deleteListing = async(idx)=> {
        // delete listing
        // remove from list
        const temp = listings.filter((v, i)=> idx !== i)
        setlistings([...temp])
        // update firestore
        const id = listings[idx].id
        await refList.doc(id).update({owner: 'none', lister: auth().currentUser.uid}).catch((e)=>{
            console.log(`error: `, e)
            return
        })
    }
    
    const statusChange = async(idx)=>{
        // toggle availability
        // change local list 
        var temp = listings
        temp[idx].availability  = !temp[idx].availability
        setlistings([...temp])
        //update firestore
        const id = listings[idx].id
        await refList.doc(id).update({availability: listings[idx].availability}).catch((e)=>{
            console.log(`error: `, e)
            return
        })
    }
    
    const getlistings = async ()=>{
        setFetching(true)
        setError(false)
        // fetch users listings
        if(auth().currentUser.uid !== null){
            const req = await refList.where('owner', '==', auth().currentUser.uid).get().catch((e)=>{
                setEmsg('Error getting user Listings information')
                setError(true)
                return
            })
            // console.log(req.docs)
            if (!req.empty) {
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
            }else{
                setlistings([])
                setFetching(false)
            }
        } else {
            setEmsg('This is wierd and impossible')
            setError(true)
            setFetching(false)
        }
    }

    const getUser = async ()=>{
        setProfile(true)
        setError(false)
        if(auth().currentUser.uid !== null){
            const doc = await ref.doc(auth().currentUser.uid).get().catch((e)=>{
                setEmsg('Error getting user information')
                setError(true)
                return
            })
            if (doc.exists) {
                setCurrent(doc.data())
                setProfile(false)
            }
        } else {
            setEmsg('no user currently')
            setError(true)
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
                                {
                                    error && 
                                    <View>
                                        <Text style={{color: 'red', margin: 20}}>{emsg}</Text>
                                        <Pressable style={styles.btn} onPress={()=>getUser()}>
                                            <Text style={{color: "green"}}>Reload</Text>
                                        </Pressable>
                                    </View>
                                }
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
                                    {
                                        error && 
                                        <View>
                                            <Text style={{color: 'red', margin: 20}}>{emsg}</Text>
                                            <Pressable style={styles.btn} onPress={()=>getlistings()}>
                                                <Text style={{color: "green"}}>Reload</Text>
                                            </Pressable>
                                        </View>
                                    }
                                </View>
                                : listings.length < 1?
                                <View style={{width: '100%', height: 500, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>No listing posted</Text>
                                </View>
                                :listings.map((l, i)=> {
                                    return (
                                        <ListingCard
                                            key={l.id} 
                                            data={l} 
                                            index={i} 
                                            remove={deleteListing} 
                                            status={statusChange}
                                        />
                                    )
                                })
                            }
                            <View style={{height: 10}}></View>
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
        height: '100%',
        backgroundColor: 'white'
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
    },
    btn:{
        padding: 5,
        backgroundColor: "#c1c1c1",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
})