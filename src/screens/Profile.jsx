import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import ListingCard from '../components/ListingCard'

export default function Profile() {
  return (
    <SafeAreaView>
        <View style={StyleSheet.body}>
            <View style={styles.float}></View>
            <View style={styles.appBar}>
                <View style={styles.icon}></View>
                <View style={styles.icon}></View>
            </View>
            <Text style={styles.textbox}>User name</Text>
            <Text style={styles.textbox}>Telephone no</Text>
            <Text style={styles.textbox}>User@name.email</Text>
            <Text style={styles.textbox}>My listings</Text>
            <ScrollView style={{height: '100%', paddingHorizontal: 10}}>
                <ListingCard/>
                <ListingCard/>
                <ListingCard/>
                <ListingCard/>
                <ListingCard/>
            </ScrollView>
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
        height: 50,
        // backgroundColor: 'red',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    textbox:{
        marginHorizontal: 20,
        marginVertical: 10
    },
    icon:{
        height: 28,
        width: 28,
        borderRadius: 14,
        backgroundColor: 'green'
    },
    float:{
        position: 'absolute',
        // bottom: '20%',
        top: '50%',
        right: 10,
        zIndex: 5,
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: 'red'
    }
})