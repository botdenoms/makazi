import { View, SafeAreaView, StyleSheet, Pressable } from 'react-native'

import { ChevronLeftIcon } from "react-native-heroicons/solid"

export default function Map({navigation, route}) {
  console.log(`longitude: ${route.params.long}, latitude ${route.params.lat}`)
  return (
    <SafeAreaView>
        <View style={styles.body}>
            <View style={styles.appBar}>
              <Pressable onPress={()=> navigation.goBack()}>
                {/* <View style={styles.icon}></View> */}
                <ChevronLeftIcon size={28} color='#1e1e1e'/>
              </Pressable>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body:{
      width:'100%',
      height: '100%',
      backgroundColor: 'white'
  },
  appBar:{
      height: 50,
      // backgroundColor: 'red',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10
  },
  icon:{
      height: 28,
      width: 28,
      borderRadius: 14,
      backgroundColor: 'green'
  },
})