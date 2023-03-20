import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default function SIgnUp({toggle, stack}) {

  const usersCol = firestore().collection('users')

  const [name, setName] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signing, setSigning] = useState(false)

  const signUp = ()=>{
    // check error in inputs
    var temp = ''
    if (email === '' || password === null || name === '' || telephone === '') {
      console.log('no empty fields allowed')
      return
    }
    console.log('no empty fields found')
    setSigning(true)
    // create auth user, get uuid
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then((c) => {
      console.log('User account created & signed in!')
      temp = c.user.uid
      console.log(`uid ${temp}`)
      // create users collection id= uuid
      usersCol.doc(temp).set({
        name,
        email,
        telephone,
      })
      setSigning(false)
      stack.navigate('profile')
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!')
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!')
      }

      if (error.code === 'auth/weak-password'){
        console.log('weak password')
      }
      console.error(error)
      return
    })
    toggle()
  }

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Text style={{fontSize: 18}}>Welcome to Makazi</Text>
      </View>
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
      <View style={{height: 40}}></View>
      <View style={styles.center}>
        <Pressable onPress={()=> signUp()}>
          <View style={styles.button}>
            {
              signing?
              <ActivityIndicator color='white' size='small'/>
              :<Text style={{color: 'white'}}>SignUp</Text>
            }
          </View>
      </Pressable>
      </View>
      <View style={{height: 20}}></View>
      <View style={styles.center}>
        <Pressable onPress={()=>toggle()}>
          <Text >Already have an account, Login</Text>
        </Pressable>  
      </View>
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
    paddingLeft: 10,
    borderWidth: 1,
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