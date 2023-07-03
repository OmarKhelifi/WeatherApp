import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import React, { useEffect , useState } from 'react'
import * as Location from 'expo-location'
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';


const API_URL= (lat,lon)=> `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d757398dad1ca9229d15cc526808f0ef&units=metric`

export default function App() {
  // 1 - récupérer les coordonnées de user


  const [loading,setLoading] = useState(true)
  const [data,setData] = useState(null)


  useEffect(()=>{
    const getCoordinates = async ()=>{
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !=="granted" ) {
        return
      }

      const userLocation = await Location.getCurrentPositionAsync()
      getWeather(userLocation)
    }
    getCoordinates()
  },[])

  // 2 - réaliser une requette vers nos serveur
    // city
    // météo du moment
    // prévision
    const getWeather= async (location)=>{
      try {
        const response= await axios.get(API_URL(location.coords.latitude,location.coords.longitude ))
        setData(response.data)
        setLoading(false)
      } catch (error) {
        console.log("Error in getWeather")
      }
    }
    if (loading) {
      return(
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    }

  return (

        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.container}>
            <StatusBar backgroundColor={"black"} />
            <CurrentWeather data={data} />
            <Forecast data={data}/>
          </View>
        </ScrollView>

      

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    textAlign:"center",
    backgroundColor:"#ecf0f1",
  },
  
});
