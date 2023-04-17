import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import {CameraIcon} from "react-native-heroicons/solid"

export default function House({to, data, index}) {
  return (
    <Pressable onPress={()=> to(index)}>
      <View style={styles.card}>
        <View style={styles.box}>
          {
            data.images.length < 1?
            <Text>No images</Text> 
            :<Image source={{uri : data.images[0]}} style={styles.img}/>
          }
          <View style={styles.extras}>
            <CameraIcon color='#1e1e1e'/>
            <Text style={{marginLeft: 5}}>{data.images.length}</Text>
          </View>
        </View>
        <View style={styles.boxtext}>
          <Text style={styles.desc} numberOfLines={3}>{data.description}</Text>
          <Text style={styles.price}>{data.price} ksh</Text>
          <Text style={styles.adress}>{data.location[0]}, {data.location[1]}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    card:{
        height: 200,
        width: '100%',
        backgroundColor: '#c1c1c1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'flex-start',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 10,
    },
    box:{
      height: '60%',
      width: '100%',
      backgroundColor: '#ccc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    boxtext:{
      width: '100%',
      paddingHorizontal: 5,
      height: '100%',
      display: 'flex'
    },
    desc:{
      flexDirection: 'column',
      fontSize: 15,
      color: '#1e1e1e',
      fontWeight: 'bold'
    },
    adress:{
      fontSize: 17,
      marginBottom: 5,
      fontWeight: '500',
      color: '#1e1e1e'
    },
    price:{
      fontSize: 18,
      color: 'green',
      fontWeight: '600'
    },
    extras:{
      position: 'absolute',
      height: 24,
      bottom: 5,
      left: 5,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    img:{
      width: '100%',
      height: '100%',
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
    }
})
