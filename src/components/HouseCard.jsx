import { View, Text, StyleSheet, Pressable } from 'react-native'
import {CameraIcon} from "react-native-heroicons/solid"

export default function HouseCard({to}) {
  return (
    <Pressable onPress={()=> to()}>
      <View style={styles.card}>
        <View style={styles.box}>
          {/* // image here */}
          <Text>Image here</Text>
          <View style={styles.extras}>
            <CameraIcon color='#1e1e1e'/>
            <Text style={{marginLeft: 5}}>1</Text>
          </View>
        </View>
        <View style={styles.boxtext}>
          <Text style={styles.desc} numberOfLines={3}>Description about the house in showcase</Text>
          <Text style={styles.adress}>County, address</Text>
          <Text style={styles.price}>10, 000/ksh</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    card:{
        height: 150,
        width: '100%',
        // backgroundColor: 'yellow',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        marginVertical: 5,
    },
    box:{
      width: '50%',
      height: '100%',
      backgroundColor: '#ccc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    boxtext:{
      width: '100%',
      paddingHorizontal: 5,
      paddingTop: 20,
      height: '100%',
      display: 'flex'
    },
    desc:{
      width: '50%',
      flex: 1,
      flexDirection: 'column',
      fontSize: 15
    },
    adress:{
      fontSize: 17,
      marginBottom: 5,
    },
    price:{
      fontSize: 18,
      color: 'green'
    },
    extras:{
      position: 'absolute',
      height: 24,
      // width: 40,
      // backgroundColor: 'red',
      bottom: 5,
      left: 5,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
})