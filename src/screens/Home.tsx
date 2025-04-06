import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import Forecast from '../components/Forecast';
import DailyForecast from '../components/DailyForecast';

const Home = () => {


  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} />
      <Image
        blurRadius={70}
        source={require('../assets/images/bg.png')}
        style={styles.bg}
      />
      <SafeAreaView style={styles.safeArea}>
        {/* Search section */}
        <SearchBar />

        {/* Forecast section */}
        <Forecast />

        {/* Daily Forecast */}
        <DailyForecast />
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  safeArea: {
    display: 'flex',
    flex: 1,
    paddingTop: 15,
  },
});
