import { View, Text, TextInput,Pressable, StyleSheet, ActivityIndicator} from 'react-native'
import {useState} from 'react'

import auth from '@react-native-firebase/auth'

export default function LogIn({toggle, stack}) {

  // const [name, setName] = useState('')
  // const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logging, setLogging] = useState(false)
  const [reset, setReset] = useState(false)
  
  const logIn = ()=>{
    if (reset){
      setReset(false)
      return
    }
    if (email === '' || password === '') {
      console.log('empty email or pass')
      return
    }
    console.log('no empty stuff')
    setLogging(true)
    // log in checks & create user obj
    auth().signInWithEmailAndPassword(email, password).then((e)=>{
      console.log(`signed in as ${e.user.email}`)
      setLogging(false)
      stack.navigate('profile')
    }).catch((e)=>{
      console.log(`this error: ${e}`)
    })
  }

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Text style={{fontSize: 18}}>Welcome Back</Text>
      </View>
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
      <View style={styles.center}>
        <Pressable onPress={()=>logIn()}>
          <View style={styles.button}>
            {
              logging? <ActivityIndicator color='white' size='small'/>
              :<Text style={{color: 'white'}}>{reset?'Reset':'Log in'}</Text>
            }
          </View>
      </Pressable>
      </View>
      <View style={{height: 20}}></View>
      <View style={styles.center}>
        <Pressable onPress={()=>toggle()}>
            <Text >Don't have an account, SingUp</Text>
        </Pressable>
      </View>
      <View style={{height: 20}}></View>
      {
        reset?
        <></>:
        <View style={styles.center}>
          <Pressable onPress={()=>setReset(true)}>
              <Text >Forgot password, reset</Text>
          </Pressable>
        </View>
        
      }
      
    </View>
  )
}

const styles = StyleSheet.create({
  body:{
    // paddingVertical: 10,
    flexDirection: 'column'
  },
  center:{
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  },
  header:{
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: "center"
  },
  input:{
    height: 40,
    borderRadius: 5,
    borderColor: '#1e1e1e',
    borderWidth: 1,
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