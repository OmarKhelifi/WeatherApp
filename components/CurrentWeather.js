import { useEffect, useState } from "react";
import { View,Text,StyleSheet, Image, ImageBackground } from "react-native";
import {isSameDay} from "date-fns";
import clear from "../assets/img/clear.jpg"
import clouds from "../assets/img/clouds.jpg"
import drizzel from "../assets/img/drizzel.jpg"
import rain from "../assets/img/rain.jpg"
import snow from "../assets/img/snow.jpg"
import thunderstorm from "../assets/img/thunderstorm.jpg"
import atmosphere from "../assets/img/mist.jpg"


const getIcon = (icon)=>`http://openweathermap.org/img/wn/${icon}@4x.png`

export default function CurrentWeather({data}){

    const [currentWeather,setCurrentWeather]=useState(null)
    const [time,setTime]=useState('')
    const [bg,setBg]=useState('')

    useEffect(()=>{
        const currentW = data.list.filter(forecast=>{
            const today= new Date().getTime() + Math.abs(data.city.timezone * 1000)
            const forecastDate = new Date (forecast.dt * 1000) 
            return isSameDay(today,forecastDate)
        })
        setCurrentWeather(currentW[0])
    },[data])

    useEffect(()=>{
        setInterval(()=>{
            const time = new Date()
            const hours=time.getHours()
            const minutes=time.getMinutes()
            setTime(hours + ":" +minutes)
        },1000)
        if (currentWeather?.weather[0].main === "Clear" )
        {
            setBg(clear)
        }else if(currentWeather?.weather[0].main === "Clouds" )
        {
            setBg(clouds)
        }else if(currentWeather?.weather[0].main === "Drizzle" )
        {
            setBg(drizzel)
        }else if(currentWeather?.weather[0].main === "Rain" )
        {
            setBg(rain)
        }else if(currentWeather?.weather[0].main === "Thunderstorm" )
        {
            setBg(thunderstorm)
        }else if(currentWeather?.weather[0].main === "Snow" )
        {
            setBg(snow)
        }else if(currentWeather?.weather[0].main === "Atmosphere" )
        {
            setBg(atmosphere)
        }
    })

    return(
        <ImageBackground source={bg} style={styles.bgs} resizeMode='cover' >
            <View style={styles.container}>
                <Text style={styles.city} > {data?.city?.name} </Text>
                <Text style={styles.today}> Aujourd'hui </Text>
                <Text style={styles.times}> {time} </Text> 
                <Image source={{uri: getIcon(currentWeather?.weather[0].icon)}} style={styles.image}  />
                <Text style={styles.temp} > {currentWeather?.main.temp }°C </Text>
                <Text style={styles.description} > {currentWeather?.weather[0].description} </Text>
            </View>
        </ImageBackground>
            
    )
}

const COLOR="black"

const styles=StyleSheet.create({
    container:{
        marginTop:60,
        alignItems:"center",
        height:"65%",
    },
    city:{
        fontSize:46,
        fontWeight:"500",
        color:COLOR,
    },
    today:{
        fontSize:38,
        fontWeight:"300",
        color:COLOR,
    },
    image:{
        width:150,
        height:150,
        marginVertical:10
    },
    temp:{
        fontSize:80,
        fontWeight:"bold",
        color:COLOR,
    },
    description:{
        fontSize:24,
        fontWeight:"bold",
        color:COLOR,
    },
    times:{
        fontSize:28,
        color:COLOR,
    },
    bgs:{
        width:"100%",
    }
})