import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OpeningScreen from '../screens/OpeningScreen';
import Home from '../screens/Home';

export type RootStackParamList = {
  OpeningScreen: undefined;
  Home: undefined;
};

const Router = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
      <Stack.Navigator initialRouteName="OpeningScreen">
        <Stack.Screen
          name="OpeningScreen"
          component={OpeningScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
  );
};

export default Router;
