import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';

// Screen Imports
import Home from './screens/Home';
import Details from './screens/blindAccess';
import HelperUI from './screens/HelperUI';
import InDevelopment from './screens/inprogress';
import assistantRegister from './screens/AssistantRegister';
import assistantLogin from './screens/AssistantLogin';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
}

const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    FredokaOne: require('./assets/fonts/FredokaOne.ttf')
  });

  if (!loaded) return null;
  return(
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen component={Home} name="Home"/>
        <Stack.Screen component={Details} name="Details"/>
        <Stack.Screen component={HelperUI} name="HelperUI"/>
        <Stack.Screen component={InDevelopment} name="inDevelopment"/>
        <Stack.Screen component={assistantRegister} name="AssistantRegister"/>
        <Stack.Screen component={assistantLogin} name="AssistantLogin"/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;