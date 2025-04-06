import {View, Text, StyleSheet} from 'react-native';
import React, { useContext, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../router/Router';
import { Store } from '../store/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type props = NativeStackScreenProps<RootStackParamList,'OpeningScreen'>

const OpeningScreen = ({navigation}:props) => {

  const {setForcast} = useContext(Store);

  const dataLoading = async() => {
    try {
      const data = await AsyncStorage.getItem('forecast');
      data != null ? setForcast(JSON.parse(data)) : null;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    const timer = setTimeout(()=>{
      dataLoading();
      navigation.replace('Home');
    },2000);
    return ()=>clearTimeout(timer);
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Created By</Text>
        <Text style={styles.footerText}>Rishik Singha</Text>
      </View>
    </View>
  );
};

export default OpeningScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
});
