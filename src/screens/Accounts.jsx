import { useState } from 'react'
import { View, StyleSheet, SafeAreaView, Pressable, Image, Text, ScrollView} from 'react-native'
import LogIn from '../components/LogIn'
import SIgnUp from '../components/SIgnUp'

import { ChevronLeftIcon } from "react-native-heroicons/solid"

export default function Accounts({navigation}) {
    const [user, setUser] = useState(true)
    const [reset, setReset] = useState(false)
    const toggle = ()=>{
        if(reset && !user){
            setUser(false)
            setReset(false)
            return
        }
        setUser(!user)
    }

    const exit = ()=>{
        navigation.goBack()
    }
    return (
        <SafeAreaView>
            <View style={styles.body}>
                <View style={styles.appBar}>
                    <Pressable onPress={()=> exit()}>
                        <ChevronLeftIcon size={28} color='white'/>
                    </Pressable>
                </View>
                
                <Image 
                    source={
                        user?
                        require('../components/login.jpeg'):
                        require('../components/signup.jpeg') 
                    } 
                    style={styles.image}
                    resizeMode='cover'
                />
                <ScrollView style={{flex: 1, zIndex:4}}>
                    {
                        user == true?
                        <LogIn toggle={toggle} stack={navigation} reset={reset} resetCallBack={setReset}/>
                        :<SIgnUp toggle={toggle} stack={navigation}/>
                    }
                    <View style={{height: 30}}></View>
                    <View style={styles.ops}>
                        <Pressable onPress={()=>toggle()} >
                            <Text style={{color: '#1e1e1e', fontWeight: '800'}}>
                                {
                                    !user?'Sing In':'Sign Up'
                                }
                            </Text>
                        </Pressable>
                        {
                            user && !reset &&
                            <Pressable onPress={()=> setReset(true)}  >
                                <Text style={{color: '#1e1e1e', fontWeight: '800'}}>Forgot password</Text>
                            </Pressable>
                        }
                    </View>
                    <View style={{height: 20}}></View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body:{
        width: '100%',        
        height: '100%',
        backgroundColor: 'transparent',
        zIndex: 5,
    },
    appBar:{
        height: 50,
        backgroundColor: 'transparent',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        zIndex: 4,
    },
    image:{
        position: 'absolute',
        height: '100%', 
        width: '100%',
        zIndex: 0
    },
    ops:{
        // position: 'absolute',
        // bottom: 0,
        width: '100%',
        zIndex: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 50
    }
})
