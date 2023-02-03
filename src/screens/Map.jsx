import { View, Text, SafeAreaView, StyleSheet } from 'react-native'

export default function Map() {
  return (
    <SafeAreaView>
        <View style={styles.body}>
            <View style={styles.appBar}>
                <View style={styles.icon}></View>
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