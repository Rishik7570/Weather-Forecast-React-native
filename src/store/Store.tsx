import React, {createContext, ReactNode, useEffect, useRef, useState} from 'react';
import { AppState,AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProviderPropsType = {
  children: ReactNode;
};

type searchDataType = {
  name: string;
  region: string;
  country: string;
};

type forecastDataType = {
    location:searchDataType,
    current:{
        temp_c:number,
        condition: {
            text: string,
            icon: string,
        },
        wind_kph:number,
        wind_dir:string,
        humidity:number,
    },
    forecast:{
        forecastday:[{
            date:string,
            day:{
                maxtemp_c:number,
                mintemp_c:number,
                condition:{
                    text:string,
                    icon:string,
                }
            },
            astro:{
                sunrise:string,
                sunset:string,
            }
        }]
    },
}

type StoreData = {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  location: object[];
  setLocation: React.Dispatch<React.SetStateAction<object[]>>;
  searchData: searchDataType[];
  setSearchData: React.Dispatch<React.SetStateAction<searchDataType[]>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  forcast: forecastDataType | null;
  setForcast: React.Dispatch<React.SetStateAction<forecastDataType | null>>;
  handleLocation: (loc: searchDataType) => void
};

export const Store = createContext<StoreData>({
  showSearch: false,
  setShowSearch: () => {},
  location: [],
  setLocation: () => {},
  searchData: [],
  setSearchData: () => {},
  input: '',
  setInput: () => {},
  handleLocation: () => {},
  forcast:null,
  setForcast:()=>{},
});

const StoreProvider = (props: ProviderPropsType) => {
  const [showSearch, setShowSearch] = useState(false);
  const [location, setLocation] = useState<object[]>([]);
  const [searchData, setSearchData] = useState<searchDataType[]>([]);
  const [forcast,setForcast] = useState<forecastDataType | null>(null);
  const [input, setInput] = useState('');

  const API_KEY = 'ed6e989cb5a14d59ac7182816251603';


  const searchApiCall = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setSearchData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const forecastApiCall = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setForcast(data);
      await AsyncStorage.setItem('forecast',JSON.stringify(data));
      console.log(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleLocation = (loc:searchDataType) => {
    const forecastEndPoint = `https://api.weatherapi.com/v1/forecast.json?key=${
        API_KEY
      }&q=${loc.name}&days=${7}&aqi=no&alerts=no`;
    forecastApiCall(forecastEndPoint);
  };

  useEffect(() => {
    if (input.length > 2) {
      const locationEndPoint = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${input}`;
      const timer = setTimeout(() => {
        searchApiCall(locationEndPoint);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [input]);

  const appState = useRef(AppState.currentState);

useEffect(() => {
  const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      if (forcast?.location?.name) {
        const forecastEndPoint = `https://api.weatherapi.com/v1/forecast.json?key=${
          API_KEY
        }&q=${forcast.location.name}&days=${7}&aqi=no&alerts=no`;
        forecastApiCall(forecastEndPoint);
      }
    }
    appState.current = nextAppState;
  });

  return () => {
    subscription.remove();
  };
}, [forcast]);

  const value = {
    showSearch,
    setShowSearch,
    location,
    setLocation,
    searchData,
    setSearchData,
    input,
    setInput,
    forcast,
    setForcast,
    handleLocation,
  };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

export default StoreProvider;
