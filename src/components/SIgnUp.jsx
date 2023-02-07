import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'

export default function SIgnUp({toggle}) {
  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Text style={{fontSize: 18}}>Welcome to Makazi</Text>
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
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: 'grey',
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems:"center"
  }
})