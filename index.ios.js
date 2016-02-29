/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} from 'react-native';

import assets from './App/Assets/assets';
import icons from './App/Assets/icons';

import MovieDetail from './App/Components/MovieDetial';
import MovieList from './App/Components/MovieList';
import Loading from './App/Components/Loading';

import TopMovie from './App/Components/TopMovie';
import DBEvents from './App/Components/DBEvents';


class DouBan_Native extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: 'DBEvents',
    }
  }


  render() {
    return (
      <TabBarIOS
      tintColor="#000"
      barTintColor="darkslateblue"
      >
       <TabBarIOS.Item
        title="IMDB top250电影"
        icon={{uri: icons.movieIcon, scale: 4.6}}
        selectedIcon={{uri: icons.movieIcon_selected, scale: 4.6}}
        selected={this.state.selected === 'topMovie'}
        onPress={() => {
          this.setState({
            selected: 'topMovie',
          })
        }}
       >
       <TopMovie />
       </TabBarIOS.Item>
       <TabBarIOS.Item
       title="本地生活"
       systemIcon="more"
       selected={this.state.selected === 'DBEvents'}
       onPress={() => {
         this.setState({
           selected: 'DBEvents',
         })
       }}
       >
        <DBEvents />
       </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('DouBan_Native', () => DouBan_Native);
