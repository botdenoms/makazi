import { View, Text, TextInput } from 'react-native'

export default function CustomInput({title, type}) {
  return (
    <View>
      <Text>{title}</Text>
      <TextInput placeholder={type == 0? '1': '1, 000 ks'}/>
    </View>
  )
}