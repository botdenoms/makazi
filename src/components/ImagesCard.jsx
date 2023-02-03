import { View, Text, StyleSheet} from 'react-native'

export default function ImagesCard() {
  return (
    <View style={styles.card}>
      <Text>ImagesCard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    card:{
        height: 200,
        width: '100%',
        backgroundColor: '#1e1e1e'
    }
})