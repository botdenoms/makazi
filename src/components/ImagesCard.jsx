import { View, Text, StyleSheet, Pressable} from 'react-native'
import {ChevronLeftIcon, ChevronRightIcon} from "react-native-heroicons/solid"

export default function ImagesCard() {
  return (
    <View style={styles.card}>
      <Text>Image here</Text>
      <View style={styles.extras}>
        <Pressable>
          <ChevronLeftIcon color='white'/>
        </Pressable>
        <Pressable>
         <ChevronRightIcon color='white'/>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card:{
    height: 200,
    width: '100%',
    backgroundColor: '#1e1e1e',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  extras:{
    position: 'absolute',
    height: '100%',
    paddingHorizontal: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})