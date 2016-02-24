'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';

import Loading from './Loading';
import MovieSummary from './MovieSummary';

import assets from '../Assets/assets';
import styles from '../Style/MovieDetial';
import icons from '../Assets/icons';

export default class MovieList extends Component{
  constructor(props){
    super(props);
    this.REQUEST_URL = "https://api.douban.com/v2/movie/top250";
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      // movies: this.ds.cloneWithRows(assets.topMovie.subjects),
      movies: [],
      loaded: true,
    };

    this._fetchData();
  }
  _fetchData(){
    fetch(this.REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        // console.log('loaded ' + this.state.loaded);
        this.setState({
          movies: this.ds.cloneWithRows(responseData.subjects),
          loaded: false,
        });

      });
  }
  _showMovieSummary(movie){
    this.props.navigator.push({
      title: movie.title,
      component: MovieSummary,
      passProps: {movie},
    })
  }

  _renderMovieItem(asset){
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

  render(){
    if(this.state.loaded){
      return <Loading />
    }
    return (
      <View style={mainstyles.container}>
          <ListView
            dataSource={this.state.movies}
            renderRow={this._renderMovieItem.bind(this)}
          />
      </View>
    )
  }
}







let mainstyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 60,
  },
})
