import firestore from '@react-native-firebase/firestore'

import { View, Text, ActivityIndicator } from 'react-native'
import {useEffect, useState} from 'react'
import UserCard from './UserCard'

export default function Users() {

    const refUser = firestore().collection('users')

    const [users, setUsers] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(()=>{
        loadUsers()
    }, [])

    const loadUsers= async ()=>{
        // request data
        const lst = await (await refUser.get()).docs
        const temp = []
        for (let index = 0; index < lst.length; index++) {
            const element = {
                id : lst[index].id,
                ...lst[index].data()
            }
            temp.push(element)
        }
        setUsers([...temp])
        setLoad(false)
    }

    const disableUser = (idx)=>{
        console.log(`diabling account: ${users[idx].email}`)
    }

    return (
        <View>
            <Text>Users</Text>
            {
                load?
                <ActivityIndicator color='#1e1e1e' style={{height:200}}/>
                :users.map((h, i)=> <UserCard key={i} data={h} index={i} stop={disableUser}/> )
            }
        </View>
    )
}