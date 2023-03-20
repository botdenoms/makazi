import { View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable , Text, ActivityIndicator} from 'react-native'
import CustomInput from '../components/CustomInput'
// import ResultCard from '../components/ResultCard'
import firestore from '@react-native-firebase/firestore'

import { ChevronLeftIcon } from "react-native-heroicons/solid"
import HouseCard from '../components/HouseCard'
import { useState } from 'react'

export default function Search({navigation}) {
    
    const ref = firestore().collection('listings')

    const [searching, setSearching] = useState(false)
    const [rent, setRent] = useState('')
    const [county, setCounty] = useState('')
    const [bed, setBed] = useState('')
    const [results, setResults] = useState([])

    const toDetails = (index)=>{
        navigation.navigate('Details', { ...results[index]})
    }

    const doSearch= async ()=>{
        // check fields
        if (rent === '' && county === '') {
            console.log(`atleast one is to be picked option`)
        }
        // only rent searched
        if (rent !== '' && county === '') {
            console.log(`searching price only`)
            setSearching(true)
            const req = await ref.where('price', '<=', Number(rent)).get().catch((e)=>{
                console.log(`error: `, e)
                return
            })
            const lst = req.docs
            var temp = []
            for (let index = 0; index < lst.length; index++) {
                const element = {
                    id : lst[index].id,
                    ...lst[index].data()
                }
                temp.push(element)
            }
            temp = temp.filter((i)=> i.verified === true)
            setResults([...temp])
            setSearching(false)
        }
        
        if (rent === '' && county !== '') {
            console.log(`searching county only`)
            setSearching(true)
            const req = await ref.where('location', 'array-contains', county).get().catch((e)=>{
                console.log(`error: `, e)
                return
            })
            const lst = req.docs
            var temp = []
            for (let index = 0; index < lst.length; index++) {
                const element = {
                    id : lst[index].id,
                    ...lst[index].data()
                }
                temp.push(element)
            }
            temp = temp.filter((i)=> i.verified === true)
            setResults([...temp])
            setSearching(false)
        }

        if (rent !== '' && county !== '') {
            console.log(`searching rent and county both`)
            setSearching(true)
            // location first before price check
            const req = await ref.where('location', 'array-contains', county).get().catch((e)=>{
                console.log(`error: `, e)
                return
            })
            // where('price', '<=', Number(rent)).get()
            const lst = req.docs
            var temp = []
            for (let index = 0; index < lst.length; index++) {
                const element = {
                    id : lst[index].id,
                    ...lst[index].data()
                }
                temp.push(element)
            }
            temp = temp.filter((i)=> i.price <= Number(rent))
            temp = temp.filter((i)=> i.verified === true)
            setResults([...temp])
            setSearching(false)
        }

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
                <TextInput 
                    style={styles.input} 
                    placeholder='Rent Amount'
                    onChangeText={(t)=> setRent(t)}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder='County, Address'
                    onChangeText={(t)=> setCounty(t)}
                />
                <View style={{justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 20}}>
                    <CustomInput title='Bedrooms' type={0} handleChange={setBed}/>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Pressable onPress={()=> doSearch()}>
                        <View style={styles.button}>
                            <Text style={{color: 'white'}}>Search</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 20}}>
                    <Text>results</Text>
                </View>
                {
                    searching? 
                    <View style={{width: '100%', height: 200, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator color='#1e1e1e'/>
                    </View>
                    :results.length < 1?
                    <View style={{width: '100%', height: 200, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>No results found or</Text>
                        <Text>You have not make any search</Text>
                    </View>
                    :<ScrollView style={{paddingHorizontal: 10}}>
                    {
                        results.map((r, i)=> <HouseCard key={i} data={r} to={toDetails} index={i}/>)
                    }
                </ScrollView>
                }
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
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#1e1e1e',
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
