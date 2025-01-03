import { StyleSheet, Text, View, Button  } from 'react-native'
import React from 'react'


const DetailScreen = ({ navigation }: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:30}}>DetailsScreen</Text>
      <Button
        title="Go to SignIn"
        onPress={() => navigation.navigate('SignIn')}
      />
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <Button title="Go back" onPress={() => navigation.replace()} />
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#5635e7'
  }
})