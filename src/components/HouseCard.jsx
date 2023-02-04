import { View, Text, StyleSheet, Pressable } from 'react-native'

export default function HouseCard({to}) {
  return (
    <Pressable onPress={()=> to()}>
      <View style={styles.card}>
        <Text>HouseCard</Text>
      </View>
    </Pressable>
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