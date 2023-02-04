import { View, SafeAreaView, StyleSheet, Pressable } from 'react-native'

export default function Map({navigation}) {
  return (
    <SafeAreaView>
        <View style={styles.body}>
            <View style={styles.appBar}>
              <Pressable onPress={()=> navigation.goBack()}>
                <View style={styles.icon}></View>
              </Pressable>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body:{
      width:'100%',
      height: '100%'
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