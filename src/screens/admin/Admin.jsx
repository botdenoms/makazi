import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'

import auth from '@react-native-firebase/auth'

import LogIn from './components/Login'
import { UserCircleIcon , QueueListIcon} from 'react-native-heroicons/solid'
import Listings from './components/Listings'
import Users from './components/Users'

export default function Admin({navigation}) {

    useEffect(() => {
        // initials stuff
        logOut()
      return () => logOut()
    }, [])

    const [admin, setAdmin] = useState(false)
    const [tab, setTab] = useState(0)

    const logOut = ()=>{
        // log out as admin
        if (auth().currentUser !== null){
            auth().signOut().then(() => console.log('Admin signed out!'))
        }
    }

    const tabSwitch = (index) =>{
        setTab(index)
    }

    return (
        <SafeAreaView>
            {
                admin?
                <View style={styles.body}>
                    <View style={styles.appBar}>
                        <Pressable onLongPress={()=> navigation.replace('Home')}>
                            <Text style={{color: '#1e1e1e', fontWeight: '600'}}>Makazi-Admin</Text>
                        </Pressable>
                    </View>
                    <ScrollView 
                        contentInsetAdjustmentBehavior="automatic"
                        style={{height: '100%', paddingHorizontal: 10}}
                    >
                        {
                            tab === 0?
                            <Listings />
                            :<Users />
                        }
                    </ScrollView>
                    <View style={styles.bottomBar}>
                        <Pressable onPress={()=> tabSwitch(0)}>
                            <View style={[styles.tab, {backgroundColor: tab === 1?'white': 'black'}]}>
                                <Text style={{color: tab === 1?'#1e1e1e': 'white'}}>Listings</Text>
                                <QueueListIcon color={tab === 1?'#1e1e1e': 'white'}/>
                            </View>
                        </Pressable>
                        <Pressable onPress={()=> tabSwitch(1)}>
                            <View style={[styles.tab, {backgroundColor: tab === 0?'white': 'black'}]}>
                                <Text style={{color: tab === 0?'#1e1e1e': 'white'}}>Users</Text>
                                <UserCircleIcon color={tab === 0?'#1e1e1e': 'white'}/>
                            </View>
                        </Pressable>
                    </View>
                </View>
                :<LogIn toggle={setAdmin}/>
                
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body:{
        width: '100%',        
        height: '100%',
    },
    appBar:{
        height: 50,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    bottomBar:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 50, 
        backgroundColor: 'white'
    },
    tab:{
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    }
})