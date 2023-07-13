import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {ArrowRightIcon} from "react-native-heroicons/solid"

export default function SIgnUp({toggle, stack}) {

  const usersCol = firestore().collection('users')

  const [name, setName] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signing, setSigning] = useState(false)
  const [error, setError] = useState(false)
  const [emsg, setEmsg] = useState('')

  const signUp = ()=>{
    // check error in inputs
    setError(false)
    var temp = ''
    if (email === '' || password === null || name === '' || telephone === '') {
      setError(true)
      setSigning(false)
      setEmsg('no empty fields allowed')
      // console.log('no empty fields allowed')
      return
    }
    // console.log('no empty fields found')
    setSigning(true)
    // create auth user, get uuid
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then((c) => {
      // console.log('User account created & signed in!')
      temp = c.user.uid
      // console.log(`uid ${temp}`)
      // create users collection id= uuid
      usersCol.doc(temp).set({
        name,
        email,
        telephone,
      }).catch(()=> {
        setEmsg('Record creation failed, try again')
        setError(true)
        setSigning(false)
        return
      })
      setSigning(false)
      setEmail('')
      setPassword('')
      stack.replace('profile')
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        setEmsg('That email address is already in use!')
        setError(true)
        setSigning(false)
        // console.log('That email address is already in use!')
      }

      if (error.code === 'auth/invalid-email') {
        setEmsg('That email address is invalid!')
        setError(true)
        setSigning(false)
        // console.log('That email address is invalid!')
      }

      if (error.code === 'auth/weak-password'){
        setEmsg('weak password')
        setError(true)
        setSigning(false)
        // console.log('weak password')
      }
      // console.error(error)
      return
    })
  }

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Text style={{fontSize: 24, color: 'white', fontWeight: '500'}}>create</Text>
        <Text style={{fontSize: 24, color: 'white', fontWeight: '500'}}>Account</Text>
      </View>
      <View style={{height: 20}}></View>
      {/* fields */}
      <TextInput
        style={styles.input}
        placeholder="Name" 
        onChangeText={(t)=> setName(t)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="07....."
        keyboardType="phone-pad"
        onChangeText={(t)=> setTelephone(t)}
        value={telephone}
      />
      <TextInput
        style={styles.input}
        placeholder="email@name.com"
        keyboardType="email-address"
        onChangeText={(t)=> setEmail(t)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(t)=> setPassword(t)}
        value={password}
      />
      <View style={{height: 20}}></View>
      {
        error && 
        <View style={styles.center}>
          <Text style={{color: 'red', margin: 20}}>{emsg}</Text>
        </View>
      }
      <View style={{height: 10}}></View>
      {/* button */}
      <View style={styles.center}>
        <Pressable onPress={()=> signUp()}>
          <View>
            {
              signing?
              <ActivityIndicator color='white' size='small'/>
              :<View >
                {
                  signing? <ActivityIndicator color='#1e1e1e' size='small'/>
                  :<View style={{flexDirection: 'row', alignItems: "center"}}>
                    <View style={{width: 10}}></View>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: '400'}}>Sign Up</Text>
                    <View style={{width: 10}}></View>
                    <ArrowRightIcon size={28} color='white'/>
                  </View>
                }
              </View>
            }
          </View>
        </Pressable>
      </View>
      <View style={{height: 20}}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  body:{
    // paddingVertical: 10,
    flexDirection: 'column',
    zIndex: 4
  },
  center:{
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"
  },
  header:{
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'flex-start',
    alignItems: "flex-start"
  },
  input:{
    height: 40,
    // borderRadius: 5,
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1e1e1e',
    paddingLeft: 10,
    marginVertical: 5,
    marginHorizontal: 20
  },
  button:{
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#1e1e1e',
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems:"center"
  }
})
