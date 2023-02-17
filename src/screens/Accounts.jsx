import { useState } from 'react'
import { View, StyleSheet, SafeAreaView, Pressable } from 'react-native'
import LogIn from '../components/LogIn'
import SIgnUp from '../components/SIgnUp'

import { ChevronLeftIcon } from "react-native-heroicons/solid"

export default function Accounts({navigation}) {
    const [user, setUser] = useState(false)
    const toggle = ()=>{
        setUser(!user)
    }

    const exit = ()=>{
        if (user){
            navigation.goBack()
        }else{
            navigation.navigate('Home')
        }
    }
    return (
        <SafeAreaView>
            <View style={styles.body}>
                <View style={styles.appBar}>
                    <Pressable onPress={()=> exit()}>
                        {/* <View style={styles.icon}></View> */}
                        <ChevronLeftIcon size={28} color='#1e1e1e'/>
                    </Pressable>
                </View>
                {
                    user == true?
                    <LogIn toggle={toggle} stack={navigation}/>
                    :<SIgnUp toggle={toggle} stack={navigation}/>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body:{
        // position: "relative",
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
    icon:{
        // position: 'absolute',
        left: 20,
        top: 10,
        height: 28,
        width: 28,
        borderRadius: 14,
        backgroundColor: 'green'
    },
})