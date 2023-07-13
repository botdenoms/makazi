import { View, Text, TextInput,Pressable, StyleSheet, ActivityIndicator} from 'react-native'
import {useState} from 'react'

import auth from '@react-native-firebase/auth'
import {ArrowRightIcon} from "react-native-heroicons/solid"

export default function LogIn({toggle, stack, reset=false, resetCallBack=false}) {

  // const [name, setName] = useState('')
  // const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logging, setLogging] = useState(false)
  const [error, setError] = useState(false)
  const [emsg, setEmsg] = useState('')
  
  const logIn = ()=>{
    setError(false)
    if (reset){
      if(resetCallBack == false){
        return
      }
      resetCallBack(false)
      return
    }
    if (email === '' || password === '') {
      setError(true)
      setLogging(false)
      setEmsg('empty email or pass')
      // console.log('empty email or pass')
      return
    }
    // console.log('no empty stuff')
    setLogging(true)
    // log in checks & create user obj
    auth().signInWithEmailAndPassword(email, password).then((e)=>{
      // console.log(`signed in as ${e.user.email}`)
      setLogging(false)
      setEmail('')
      setPassword('')
      stack.replace('profile')
    }).catch((e)=>{
      // console.log(`this error: ${e}`)
      if (e.code === 'auth/invalid-email') {
        setError(true)
        setLogging(false)
        setEmsg('That email address is invalid!')
        // console.log('That email address is invalid!')
      }
      if (e.code === 'auth/user-not-found') {
        setError(true)
        setLogging(false)
        setEmsg('No such user exist!')
        // console.log('That email address is invalid!')
      }
      setError(true)
      setLogging(false)
      setEmsg('Wrong pass or email')
    })
  }

  return (
    <View style={styles.body}>
      <View style={{height: 20}}></View>
      <View style={styles.header}>
        <Text style={{fontSize: 24, color: 'white', fontWeight: '500'}}>
          {reset? 'Reset':'Welcome'}
        </Text>
        <Text style={{fontSize: 24, color: 'white', fontWeight: '500'}}>
          {reset? 'Password':'Back'}</Text>
      </View>
      <View style={{height: 60}}></View>
      <TextInput
        style={styles.input}
        placeholder="email@name.com"
        keyboardType="email-address"
        onChangeText={(t)=> setEmail(t)}
        value={email}
      />
      {
        reset?
        <></>
        :<TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(t)=> setPassword(t)}
          value={password}
        />
      }
      <View style={{height: 20}}></View>
      {
        error && 
        <View style={styles.center}>
          <Text style={{color: 'red', margin: 20}}>{emsg}</Text>
        </View>
      }
      <View style={{height: 20}}></View>
      {/* button */}
      <View style={styles.center}>
        <Pressable onPress={()=>logIn()}>
          <View >
            {
              logging? <ActivityIndicator color='#1e1e1e' size='small'/>
              :<View style={{flexDirection: 'row', alignItems: "center"}}>
                <View style={{width: 10}}></View>
                <Text style={{color: '#1e1e1e', fontSize: 18, fontWeight: '400'}}>
                  {
                    reset? 'Reset': 'Sign In'
                  }
                </Text>
                <ArrowRightIcon size={28} color='green'/>
              </View>
            }
          </View>
        </Pressable>
      </View>
      {/* reset and change option */}
      <View style={styles.ops}>
        <Pressable onPress={()=>toggle()} >
            <Text style={{color: 'white', fontWeight: '400'}}> Sing Up</Text>
        </Pressable>
        <Pressable onPress={()=> setReset(true)}  >
            <Text style={{color: 'white', fontWeight: '400'}}>Forgot password</Text>
        </Pressable>
      </View>
      <View style={{height: 20}}></View>
      {/* {
        reset?
        <></>:
        <View style={styles.center}>
          <Pressable onPress={()=>setReset(true)} style={{flexDirection: 'row'}}>
              <Text >Forgot password,</Text>
              <Text style={{color: 'green'}}> Reset</Text>
          </Pressable>
        </View>
        
      } */}
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
    alignItems: "center",
    marginHorizontal: 10,
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
    borderColor: '#1e1e1e',
    borderBottomWidth: 1,
    paddingLeft: 10,
    marginVertical: 5,
    marginHorizontal: 20
  }
})
