import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from 'react-native'
import HouseCard from '../components/HouseCard'

import { MagnifyingGlassIcon, UserCircleIcon } from "react-native-heroicons/solid"

export default function Home({ navigation }) {
    const toDetails = ()=>{
        navigation.navigate('Details')
    }
  return (
    <SafeAreaView>
        <View style={styles.body}>
            <View style={styles.appBar}>
                <Text>Makazi</Text>
                <Pressable onPress={()=> navigation.navigate('Accounts')}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg> */}
                    <UserCircleIcon size={36} color='#1e1e1e'/>
                    {/* <View style={styles.icon}></View> */}
                </Pressable>
            </View>
            <ScrollView 
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scroll}
            >
                <Text>Featured</Text>
                <HouseCard to={toDetails}/>
                <HouseCard to={toDetails}/>
                <HouseCard to={toDetails}/>
                <HouseCard to={toDetails}/>
                <HouseCard to={toDetails}/>
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