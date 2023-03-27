import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import {CameraIcon, CheckBadgeIcon} from "react-native-heroicons/solid"

export default function ListingCard({data, remove, status, index}) {

  return (
    <View style={styles.body}>
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
            <View style={styles.verif}>
              <CheckBadgeIcon color={data.verified == 1?'green':'red'}/>
              <Text 
                style={[{marginLeft: 5, fontSize: 11}, {color: data.verified == 1?'green':'red'}]}
                >{data.verified == 1?'Verified':'Not verified'}</Text>
            </View>
        </View>
        <View style={styles.boxtext}>
          <Text style={styles.desc} numberOfLines={3}>{data.description}</Text>
          <Text style={styles.adress}>{data.location[0]}, {data.location[1]}</Text>
          <Text style={styles.price}>{data.price}/ksh</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
        <Pressable onPress={()=> remove(index)}>
          <View style={styles.button}>
            <Text style={{color: 'red'}}>Remove</Text>
          </View>
        </Pressable>
        <Pressable onPress={()=> status(index)}>
          <View style={styles.button}>
            <Text style={styles.btncolor}>
              {
                data.availability?'UnAvailable':'Vaccant'
              }
            </Text>
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
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1e1e1e',
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems:"center"
  },
  btncolor:{
    color: 'white',
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
  verif:{
    position: 'absolute',
    height: 24,
    // width: 40,
    // backgroundColor: 'red',
    top: 5,
    left: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
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
  },
  img:{
    width: '100%',
    height: '100%'
  }
})
