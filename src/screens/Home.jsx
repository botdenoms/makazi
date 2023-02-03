import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import HouseCard from '../components/HouseCard'

export default function Home() {
  return (
    <SafeAreaView>
        <View style={styles.body}>
            <View style={styles.appBar}>
                <Text>Makazi</Text>
                <View style={styles.icon}></View>
            </View>
            <ScrollView 
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scroll}
            >
                <Text>Featured</Text>
                <HouseCard/>
                <HouseCard/>
                <HouseCard/>
                <HouseCard/>
                <HouseCard/>
            </ScrollView>
            <View style={styles.float}></View>
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
        position: 'absolute',
        bottom: 20,
        left: '44%',
        zIndex: 5,
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: 'green'
    }
})