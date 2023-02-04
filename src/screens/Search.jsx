import { View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable , Text} from 'react-native'
import CustomInput from '../components/CustomInput'
import ResultCard from '../components/ResultCard'

export default function Search({navigation}) {
  return (
    <SafeAreaView>
        <View style={styles.body}>
            <View style={styles.appBar}>
                <Pressable onPress={()=>navigation.goBack()}>
                    <View style={styles.icon}></View>
                </Pressable>
            </View>
            <ScrollView>
            <TextInput placeholder='Rent Amount'/>
            <TextInput placeholder='County, Address'/>
            <CustomInput title='Bedrooms' type={0}/>
            <Pressable>
                <View style={styles.button}>
                    <Text>Search</Text>
                </View>
            </Pressable>
            <Text>results</Text>
            <ScrollView style={{paddingHorizontal: 10}}>
                <ResultCard/>
                <ResultCard/>
                <ResultCard/>
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
    }
})