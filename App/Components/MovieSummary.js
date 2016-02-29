'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image,
} from 'react-native';

import Loading from './Loading';

export default class MovieSummary extends Component{
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      MovieDetail : '',
    }

    const REQUEST_URL = `https://api.douban.com/v2/movie/subject/${this.props.movie.id}`;
    this._fetchData(REQUEST_URL);
  }

  componentDidMount(){
    console.log('componentDidMount ....');
  }

  _fetchData(REQUEST_URL){
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        // console.log(responseData.summary);
        this.setState({
          loaded: true,
          MovieDetial: responseData,
        });
      })
      .done();
  }

  _showCasts(casts){
    let actors = '';
    casts.map( c => {
      actors = actors + c.name + "/"
    });
    return actors;
  }

  render(){
    if(!this.state.loaded){
      console.log('is loading ......');
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Loading />
            <Text>
                正在努力加载 《{this.props.movie.title}》 内容
            </Text>
        </View>
      );
    }

    this.movie = this.state.MovieDetial;
    this.summary = this.movie.summary.split(/\n/).map( p => {
      return (
        <View key={'summary' + p.length} style={{marginBottom: 16, paddingLeft: 6, paddingRight: 6}}>
          <Text style={styles.description}>
              {p}
          </Text>
        </View>
      )
    });

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Image source={{uri: this.props.movie.images.large}} style={styles.image}/>
          <View style={{flexDirection: 'column', flex: 1, marginTop: 15}}>
            <Text style={{fontSize: 14, lineHeight: 20}}>
              主演 : {this._showCasts(this.props.movie.casts)}
            </Text>
            <Text style={{fontSize: 14, lineHeight: 20}}>
              
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          {this.summary}
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container:{
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 70,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  description:{
    fontWeight: '300',
    color: 'rgba(0, 0, 0, 0.8)',
    lineHeight: 26,
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 132,
    marginLeft: 20,
    marginTop: 9,
  },
});
