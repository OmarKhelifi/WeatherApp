import { useEffect, useState } from "react";
import { View,Text,StyleSheet,ScrollView } from "react-native";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Weather from "./Weather";


export default function Forecast({data}) {
    const [forecasts,setForecasts]=useState([])
    useEffect(()=>{
        const foreCastData=data.list.map(f=>{
            const dt =new Date(f.dt*1000)
            return({
                date:dt,
                hour:dt.getHours(),
                temp:f.main.temp,
                icon:f.weather[0].icon,
                name:format(dt,"EEEE", { locale: fr } )
            })
        })
        //Logique pour grouper les éléments par journée - name
        //[Forecast,forecast, ... ]
        //[{day:name,data:[Forecast,forecast]},{},{},{}]

        //1. const t=["vendredi","vendredi","samedi", ... ]
        // t.indexOf("vendredi") => 1
        // t.indexOf("samedi") => 2
        //2. ["vendredi","samedi", ... ]
        //3. [{day:name,data:[Forecast,forecast]},{},{},{}]
        let newForecastsData= foreCastData.map(forecast=>{
            return forecast.name
        }).filter((day,index,self)=>{
            //return true
            return self.indexOf(day) === index // 0 === 1 ==> FALSE
        }).map((day)=>{
            //[{day:name,data:[Forecast,forecast]},{},{},{}]
            return {
                day,
                data: foreCastData.filter((forecast)=> forecast.name === day )
            }
        })
        setForecasts(newForecastsData)
    },[data])
    //[{day:name,data:[Forecast,forecast]},{},{},{}]
    return(
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll} >
            {forecasts.map(f=>(
                <View>
                    <Text style={styles.day} >{f.day.toUpperCase()}</Text>
                    <View style={styles.container} >
                        {f.data.map(w =>  <Weather forecast={w} />)}
                    </View>
                </View>
            ))}
        </ScrollView>        
    )
}

const styles=StyleSheet.create({
    scroll:{
        width:"100%",
        height:"35%",
        marginTop:20,
    },
    container:{
        flexDirection:"row",
        marginLeft:5,
        marginRight:15,
        marginBottom:30,
    },
    day:{
        fontSize:16,
        fontWeight:"bold",
        marginBottom:10,
        marginLeft:9,
    }
})