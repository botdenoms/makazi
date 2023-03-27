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

    const remove = async(idx)=>{
        //delete listing
        // remove from list
        const temp = lists.filter((v, i)=> idx !== i)
        setLists([...temp])
        // update firestore
        const id = lists[idx].id
        await refList.doc(id).delete().catch((e)=>{
            console.log(`error: `, e)
            return
        })
    }

    const approve = async(idx)=>{
        // toggle availability
        // change local list 
        var temp = lists
        temp[idx].verified  = !temp[idx].verified
        setLists([...temp])
        //update firestore
        const id = lists[idx].id
        await refList.doc(id).update({verified: lists[idx].verified}).catch((e)=>{
            console.log(`error: `, e)
            return
        })
    }

    return (
        <View >
            <Text>Listings</Text>
            {
                load?
                <ActivityIndicator color='#1e1e1e' style={{height:200}}/>
                :lists.map((h, i)=> <ListingCard key={h.id} data={h} index ={i} approve={approve} remove={remove}/>)
            }
        </View>
    )
}