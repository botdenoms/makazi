import { View, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import {useEffect, useState} from 'react'

import { ChevronLeftIcon } from "react-native-heroicons/solid"

export default function Map({navigation, route}) {
  const [ltlg, setLtLg] = useState({
    latitude: -1.2863,
    longitude: 36.8172
  })
  const [error, setError] = useState(false)
  const [emsg, setEmsg] = useState('')

  const checkLatLng = ()=>{
    const fallback = {
      // nairobi cordinate
      latitude: -1.2863,
      longitude: 36.8172
    }
    if (!route.params.lat || !route.params.long) {
      setEmsg('Empty geo location data')
      setError(true)
      setLtLg({...fallback})
    }else{
      try {
        const target = {
          latitude: Number(route.params.lat),
          longitude: Number(route.params.long)
        }
        setLtLg({...target})
      } catch (error) {
        setEmsg('Error parsing geo location')
        setError(true)
        setLtLg({...fallback})
      }
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
            {
              error && 
              <View style={styles.error}>
                  <Text style={{color: 'white', margin: 20}}>{emsg}</Text>
                  <Pressable style={styles.btn} onPress={()=>setError(false)}>
                      <Text style={{color: "green"}}>Dismiss</Text>
                  </Pressable>
              </View>
            }
            <MapView 
              style={styles.map}
              initialRegion={{
                latitude: ltlg.latitude,
                longitude: ltlg.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
                <Marker coordinate={{
                  latitude: ltlg.latitude,
                  longitude: ltlg.longitude
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
  },
  error:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 3,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: "red"
  },
})