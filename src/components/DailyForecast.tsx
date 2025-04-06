import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useContext } from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import { Store } from '../store/Store';

const DailyForecast = () => {

  const {forcast} = useContext(Store);

  return forcast ? (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icons name="calendar-o" size={25} color={'white'} />
        <Text style={styles.headerTxt}>Daily Forecast</Text>
      </View>

      <ScrollView
        horizontal
        style={styles.cardContainer}
        showsHorizontalScrollIndicator={false}>
        {forcast.forecast.forecastday.map((item,index)=>{
          const date = new Date(item.date);
          const dayOfWeek = date.toLocaleDateString('en-US',{weekday : 'short'});
          const {maxtemp_c,condition} = item.day;

          return(
            <View key={index} style={styles.card}>
              <Image source={{uri:`https:${condition.icon}`}} style={styles.cardImg}/>
              <Text style={styles.cardTxt}>{dayOfWeek}</Text>
              <Text style={[styles.cardTxt,styles.cardTxt2]}>{maxtemp_c}&#176;C</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  ) : null;
};

export default DailyForecast;

const styles = StyleSheet.create({
  container:{
    marginTop:15,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 20,
  },
  headerTxt: {
    color: 'white',
    fontSize: 17,
  },
  cardContainer: {
    marginTop: 8,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginLeft:20,
    padding:8,
    borderRadius:15,
  },
  cardImg: {
    aspectRatio: 1,
    height: 70,
  },
  cardTxt: {
    color: 'white',
    fontSize:12,
  },
  cardTxt2:{
    fontSize:15,
    fontWeight:'bold',
  },
});
