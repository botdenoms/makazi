import { View, Text, StyleSheet } from 'react-native'

export default function HouseCard() {
  return (
    <View style={styles.card}>
      <Text>HouseCard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    card:{
        height: 150,
        width: '100%',
        backgroundColor: 'yellow',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        marginVertical: 5
    }
})