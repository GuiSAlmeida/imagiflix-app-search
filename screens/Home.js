import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import Header from '../components/Header';
import {colors} from '../utils/constants';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      search: "",
      loading: false
    }

    this.listItem = this.listItem.bind(this);
  }

  static navigationOptions = {
    //title: "Imagiflix",
    header: null,
  };

  getMovies() {
    if (this.state.search.length < 1) {
      return null;
    }

    Keyboard.dismiss();
    this.setState({ loading: true });
    fetch(`
    https://api.themoviedb.org/3/search/movie?api_key=4ba13f07eb7d66f818df7d9bf080d2e8&language=pt-br&query=${this.state.search}&page=1&include_adult=false`)
      .then(res => res.json())
      .then(res => {
        const results = res.results.filter(item => item.poster_path);
        
        // order results from vote
        const numberOrder = results.sort((item1, item2) => { 
            return item2.vote_average - item1.vote_average;
        });
        
        this.setState({ results: numberOrder, search: "", loading: false });
        
      })
  }  

  listItem({item}) {
    const urlImage = `https://image.tmdb.org/t/p/w342${item.poster_path}`;

    const textVote = vote => {
      if (vote < 5) {
       return <Text style={{...styles.voteItem, backgroundColor: colors.danger}}>Nota: {vote}</Text>
      } else if (vote >= 5 && vote < 7) {
        return <Text style={{...styles.voteItem, backgroundColor: colors.warning}}>Nota: {vote}</Text>
      } else {
        return <Text style={{...styles.voteItem, backgroundColor: colors.sucess}}>Nota: {vote}</Text>
      }
    }

    return (
      <TouchableOpacity onPress={()=> this.props.navigation.navigate('Movie', { id: item.id })}>
        <View style={styles.itemList}>
          {item.poster_path && 
            <Image 
              style={styles.imgItem}
              source={{ uri: urlImage }} 
          />}
          <View style={styles.descriptionItem}>
            <Text style={styles.titleItem}>{item.title}</Text>
            {textVote(item.vote_average)}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />

        <View style={styles.form}>
          <TextInput
            style={styles.search}
            value={this.state.search}
            onChangeText={text => this.setState({ search: text })}
          />
          <Button
            title="Buscar"
            onPress={() => this.getMovies()}
            color={colors.primary}
          />
        </View>

        <View style={styles.wrapList}>

          {this.state.loading && <ActivityIndicator size="large" color={colors.primary} />}
          {this.state.results.length > 0 && !this.state.loading ? (
            <FlatList
              data={this.state.results}
              renderItem={this.listItem}
              keyExtractor={item => item.id.toString()}
            />
          ) : (
            <Text style={{ textAlign: 'center'}}>Digite o nome do filme</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  search: {
    backgroundColor: "#eeeeee",
    padding: 4,
    marginRight: 10,
    borderRadius: 2,
    flex: 1
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20
  },
  imgItem: {
    width: 100,
    height: 150,
    marginRight: 10
  },
  wrapList: {
    flex: 1
  },
  itemList: {
    padding: 20,
    paddingTop: 0,
    flexDirection: "row",
    alignItems: "center"
  },
  descriptionItem: {
    flex: 1
  },
  titleItem: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  voteItem: {
    alignSelf: "flex-start",
    padding: 2,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white'
  }
});


export default Home;