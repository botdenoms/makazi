import { View, Text, TextInput,Pressable, StyleSheet} from 'react-native'
import React from 'react'

export default function LogIn({toggle}) {
    return (
        <View style={styles.body}>
          <View style={styles.header}>
            <Text>Welcome Back</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Name" 
          />
          <TextInput
            style={styles.input}
            placeholder="07....."
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="email@name.com"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          />
          <View style={styles.center}>
            <Pressable>
              <View style={styles.button}>
                <Text>SignUp</Text>
              </View>
          </Pressable>
          </View>
          <View style={styles.center}>
            <Pressable onPress={()=>toggle()}>
                <Text >Don't have an account, SingUp</Text>
            </Pressable>
          </View>
        </View>
      )
}

const styles = StyleSheet.create({
  body:{
      paddingVertical: 10,
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
      backgroundColor: '#1e1e1e',
      marginVertical: 5,
      marginHorizontal: 20
  },
  button:{
      marginVertical: 10,
      paddingHorizontal: 40,
      paddingVertical: 10,
      backgroundColor: 'grey',
      marginHorizontal: 20,
      justifyContent: "center",
      alignItems:"center"
  }
})