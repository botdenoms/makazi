import { useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import LogIn from '../components/LogIn'
import SIgnUp from '../components/SIgnUp'

export default function Accounts() {
    const [user, setUser] = useState(false)
    const toggle = ()=>{
        setUser(!user)
    }
  return (
    <SafeAreaView>
        <View style={styles.body}>
            <View style={styles.icon}></View>
            {
                user == true?<LogIn toggle={toggle}/>:<SIgnUp toggle={toggle}/>
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