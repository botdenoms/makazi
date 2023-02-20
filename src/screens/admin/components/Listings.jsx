import firestore from '@react-native-firebase/firestore'

import { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import ListingCard from '../components/ListingCard'

export default function Listings() {

    const refList = firestore().collection('listings')

    useEffect(()=>{
        loadListings()
    }, [])

    const loadListings = async ()=>{
        // request data
        const lst = await (await refList.get()).docs
        const temp = []
        for (let index = 0; index < lst.length; index++) {
            const element = {
                id : lst[index].id,
                ...lst[index].data()
            }
            temp.push(element)
        }
        setLists([...temp])
        setLoad(false)
    }

    const [lists, setLists] = useState([])
    const [load, setLoad] = useState(true)

    return (
        <View >
            <Text>Listings</Text>
            {
                load?
                <ActivityIndicator color='#1e1e1e' style={{height:200}}/>
                :lists.map((h, i)=> <ListingCard key={h.id} data={h}/>)
            }
        </View>
    )
}