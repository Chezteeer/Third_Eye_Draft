import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';

// Screen Imports
import Home from './screens/Home';
import InDevelopment from './screens/inprogress';

// Screen Imports (PWD)
import Details from './screens/BlindAccess';
import BlindAssistType from './screens/BlindAssistType';

// Screen Imports (Assistant)
import assistantRegister from './screens/AssistantRegister';
import assistantLogin from './screens/AssistantLogin';
import mapPage from './screens/MapPage';
import HelperUI from './screens/HelperUI';
import assistantCurrentlyHelping from './screens/AssistantHelpingUI';
import SearchAssistant from './screens/SearchAssistant';
import BlindAssisted from './screens/BlindAssisted';

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
        <Stack.Screen component={mapPage} name="MapPage"/>
        <Stack.Screen component={assistantCurrentlyHelping} name="AssistantCurrentlyHelping"/>
        <Stack.Screen component={BlindAssistType} name="BlindAssistType"/>
        <Stack.Screen component={SearchAssistant} name="SearchAssistant"/>
        <Stack.Screen component={BlindAssisted} name="BlindAssisted"/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;