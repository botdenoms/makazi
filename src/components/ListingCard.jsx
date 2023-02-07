import { View, Text, StyleSheet, Pressable } from 'react-native'
import {CameraIcon} from "react-native-heroicons/solid"

export default function ListingCard() {
  return (
    <View style={styles.body}>
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
      <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
        <Pressable>
          <View style={styles.button}>
            <Text>Remove</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.button}>
            <Text>Available</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body:{
    height: 150,
    width: '100%',
    // backgroundColor: 'yellow',
    marginVertical: 5,
    display: 'flex',
    justifyContent:'space-between',
  },
  card:{
    height: '70%',
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  box:{
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxtext:{
    width: '100%',
    paddingHorizontal: 5,
    // paddingTop: 20,
    height: '100%',
    display: 'flex'
  },
  button:{
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'grey',
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems:"center"
  },
  desc:{
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    fontSize: 14
  },
  adress:{
    fontSize: 16,
    marginBottom: 5,
  },
  price:{
    fontSize: 17,
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
