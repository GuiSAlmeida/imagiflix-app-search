import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './screens/Home';
import Movie from './screens/Movie';

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Movie: {screen: Movie}
});

const App = createAppContainer(MainNavigator);

export default App;