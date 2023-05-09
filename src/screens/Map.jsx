import { View, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import {useEffect} from 'react'

import { ChevronLeftIcon } from "react-native-heroicons/solid"

export default function Map({navigation, route}) {
  const fallback = {
    // nairobi cordinate
    latitude: -1.2863,
    longitude: 36.8172
  }
  const target = {
    latitude: Number(route.params.lat),
    longitude: Number(route.params.long)
  }

  const checkLatLng = ()=>{
    if (!route.params.lat || !route.params.long) {
      target.latitude = fallback.latitude
      target.longitude = fallback.longitude
    }
  }

  useEffect(() => {
    checkLatLng()
  }, [])
  

  return (
    <SafeAreaView>
        <View style={styles.body}>
            <View style={styles.appBar}>
              <Pressable onPress={()=> navigation.goBack()}>
                <ChevronLeftIcon size={28} color='#1e1e1e'/>
              </Pressable>
            </View>
            <MapView 
              style={styles.map}
              initialRegion={{
                latitude: target.latitude,
                longitude: target.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
                <Marker coordinate={{
                  latitude: target.latitude,
                  longitude: target.longitude
                }} title="Here"/>
              </MapView>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body:{
    position: 'relative',
    width:'100%',
    height: '100%',
  },
  appBar:{
    position: 'absolute',
    top: 0,
    left: 0,
    height: 50,
    zIndex: 3,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  map:{
    width: '100%',
    height: '100%'
  }
})