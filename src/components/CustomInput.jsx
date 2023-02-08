import { View, Text, TextInput, StyleSheet } from 'react-native'

export default function CustomInput({title, type, handleChange}) {
  
  return (
    <View style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
      <Text>{title}</Text>
      <TextInput 
        style={styles.input} 
        placeholder={type == 0? '1': '1, 000 ks'} 
        onChangeText={()=> handleChange}/>
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    paddingLeft: 10,
    height: 40,
    borderRadius: 5,
    borderColor: '#1e1e1e',
    borderWidth: 1,
    marginVertical: 5,
    // marginHorizontal: 20
  }
})