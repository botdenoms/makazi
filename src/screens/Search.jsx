import { View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable , Text} from 'react-native'
import CustomInput from '../components/CustomInput'
// import ResultCard from '../components/ResultCard'

import { ChevronLeftIcon } from "react-native-heroicons/solid"
import HouseCard from '../components/HouseCard'

export default function Search({navigation}) {

    const toDetails = ()=>{
        navigation.navigate('Details')
    }

  return (
    <SafeAreaView>
        <View style={styles.body}>
            <View style={styles.appBar}>
                <Pressable onPress={()=>navigation.goBack()}>
                    {/* <View style={styles.icon}></View> */}
                    <ChevronLeftIcon size={28} color='#1e1e1e'/>
                </Pressable>
            </View>
            <ScrollView>
            <TextInput style={styles.input} placeholder='Rent Amount'/>
            <TextInput style={styles.input} placeholder='County, Address'/>
            <View style={{justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 20}}>
                <CustomInput title='Bedrooms' type={0}/>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Pressable>
                    <View style={styles.button}>
                        <Text>Search</Text>
                    </View>
                </Pressable>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 20}}>
                <Text>results</Text>
            </View>
            <ScrollView style={{paddingHorizontal: 10}}>
                <HouseCard to={toDetails}/>
                <HouseCard to={toDetails}/>
                <HouseCard to={toDetails}/>
                <HouseCard to={toDetails}/>
            </ScrollView>
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    body:{
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
    icon:{
        height: 28,
        width: 28,
        borderRadius: 14,
        backgroundColor: 'green'
    },
    button:{
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'grey',
        marginHorizontal: 20,
        justifyContent: "center",
        alignItems:"center"
    },
    input:{
        height: 40,
        paddingLeft: 10,
        borderRadius: 5,
        borderColor: '#1e1e1e',
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 20
    }
})