import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ListingCard() {
  return (
    <View style={styles.card}>
      <Text>ListingCard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    card:{
        height: 150,
        width: '100%',
        backgroundColor: 'yellow',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        marginVertical: 5,
    }
})