'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';


import styles from '../Style/MovieDetial';
import icons from '../Assets/icons';

import MovieSummary from './MovieSummary';

export default class MovieDetail extends Component{


  _showMovieSummary(movie){
    const {navigator} = this.props;
    if(navigator){
      this.props.navigator.push({
        title: movie.title,
        component: MovieSummary,
        passProps: {movie},
      })
    }else{
      console.log('navigator is not exist ...');
    }
  }
  render(){
    let asset = this.props.asset;

    return (
      <TouchableHighlight
        onPress={() => this._showMovieSummary(asset)}
        underlayColor={'#ccc'}
        style={{flex: 1}}
      >

        <View style={styles.container}>
          <View style={styles.imageView}>
            <Image source={{uri: asset.images.large}} style={styles.image}/>
          </View>
          <View style={styles.summary}>
            <Text style={styles.title}>
              {asset.title}
            </Text>
            <Text style={styles.year}>
              {`${asset.original_title} (${asset.year})`}
            </Text>
            <Text style={styles.genres}>
              {asset.genres.length == 2 ? `${asset.genres[0]}/${asset.genres[1]}` : `${asset.genres[0]}/${asset.genres[1]}/${asset.genres[2]}`}
            </Text>
            <Text style={styles.rating}>
              {asset.rating.average}
            </Text>
          </View>
          <View style={styles.arrowImage}>
            <Image source={require('../Assets/Image/double-arrow-right.png')} style={styles.arrowIcon}/>
          </View>
        </View>

      </TouchableHighlight>
    );

  }
}
