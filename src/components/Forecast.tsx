import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useContext } from 'react';
import { Store } from '../store/Store';
import Icons from 'react-native-vector-icons/Feather';

const Forecast = () => {

  const {forcast} = useContext(Store);

  const noData = (
    <View style={styles.emptyContainer}>
      <Text style={styles.locationTxt}>No data found</Text>
      <Text style={styles.locationTxt}>Please click the top right icon.</Text>
    </View>
  );

  return forcast ? (
    <View style={styles.container}>

      <View style={styles.locationBox}>
        <Text style={styles.locationTxt}>{forcast.location.name}, <Text style={styles.locationTxt2}>{forcast.location.region}</Text></Text>
      </View>

      <View style={styles.tempBox}>
        <Image style={styles.weatherBg} source={{uri:`https:${forcast.current.condition.icon}`}}/>
        <View style={styles.tempDetails}>
          <Text style={styles.temp}>{forcast.current.temp_c}&#176;C</Text>
          <Text style={styles.weatherDetails}>{forcast.current.condition.text}</Text>
        </View>
      </View>

      <View style={styles.extraDetailsBox}>
        <View style={styles.extraDetails}>
          <Image source={require('../assets/icons/wind.png')} style={styles.detailIcon}/>
          <Text style={styles.extraDetailTxt}>{forcast.current.wind_kph}km/hr</Text>
        </View>
        <View style={styles.extraDetails}>
          <Image source={require('../assets/icons/drop.png')} style={styles.detailIcon}/>
          <Text style={styles.extraDetailTxt}>{forcast.current.humidity}%</Text>
        </View>
        <View style={styles.extraDetails}>
          <Image source={require('../assets/icons/sun.png')} style={styles.detailIcon}/>
          <Text style={styles.extraDetailTxt}>{forcast.forecast.forecastday[0].astro.sunrise}</Text>
        </View>
      </View>

      <View style={styles.extraDetailsBox2}>
        <View style={styles.extraDetails}>
          <Icons name="chevrons-right" color={'white'} size={30}/>
          <Text style={styles.extraDetailTxt}>{forcast.current.wind_dir}</Text>
        </View>
        <View style={styles.extraDetails}>
        <Icons name="thermometer" color={'white'} size={30}/>
          <Text style={styles.extraDetailTxt}>{forcast.forecast.forecastday[0].day.mintemp_c}&#176;C</Text>
        </View>
        <View style={styles.extraDetails}>
          <Icons name="sunset" color={'white'} size={30}/>
          <Text style={styles.extraDetailTxt}>{forcast.forecast.forecastday[0].astro.sunset}</Text>
        </View>
      </View>
    </View>
  ) : noData;
};

export default Forecast;

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'space-around',
  },
  locationBox:{
    marginBottom:10,
  },
  locationTxt:{
    fontSize:20,
    fontWeight:'bold',
    color:'white',
  },
  locationTxt2:{
    fontWeight:'medium',
  },
  tempBox:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  weatherBg:{
    aspectRatio:'1',
    height:'40%',
  },
  tempDetails:{
    alignItems:'center',
    marginTop:15,
  },
  temp:{
    fontSize:40,
    fontWeight:'bold',
    color:'white',
  },
  weatherDetails:{
    fontSize:15,
    color:'white',
  },
  extraDetailsBox:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:20,
  },
  extraDetails:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:5,
  },
  detailIcon:{
    aspectRatio:'1',
    width:'20%',
  },
  extraDetailTxt:{
    color:'white',
    fontSize:12,
  },
  extraDetailsBox2:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginLeft:20,
    gap:25,
  },
  emptyContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
});
