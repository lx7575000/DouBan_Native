'use strict';
import React, {
  Component,
  StyleSheet,
  View,
  ListView,
  NavigatorIOS,
} from 'react-native';

import MovieList from './MovieList';


/*
  style 必须这么写才能显示出内容，别问我。。我也糊涂呢
*/
export default class TopMovie extends Component{
  render(){
    return (
      <NavigatorIOS
      style={{
          flexDirection: 'row',
          flex: 1
      }}
        initialRoute={{
          component: MovieList,
          title: 'Movie Top250',
        }}
        shadowHidden={true}
        barTintColor="darkslateblue"
        titleTextColor="rgba(255,255,255, 0.8)"
        tintColor="rgba(255, 255, 255, 0.8)"
        translucent={true}
      />
    )
  }
}
