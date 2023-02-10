import { useState } from 'react'
import { View, Text, StyleSheet, Pressable, Image} from 'react-native'
import {ChevronLeftIcon, ChevronRightIcon} from "react-native-heroicons/solid"

export default function ImagesCard({images}) {

  const [index, setIndex] = useState(0)

  const upIndex = ()=>{
    if (index >= images.length - 1) {
      return
    }
    setIndex(index + 1)
  }

  const downIndex = ()=>{
    if (index <= 0) {
      return
    }
    setIndex(index - 1)
  }

  return (
    <View style={styles.card}>
      {
        images.length < 1?
        <Text>No images</Text> 
        :<Image source={{uri : images[index]}} style={{height: '100%', width: '100%'}}/>
      }
      <View style={styles.extras}>
        <Pressable onPress={()=> downIndex()}>
          <ChevronLeftIcon color='white'/>
        </Pressable>
        <Pressable onPress={()=> upIndex()}>
         <ChevronRightIcon color='white'/>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card:{
    height: 250,
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