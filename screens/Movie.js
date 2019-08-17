import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    ScrollView,
    Button,
    Linking
} from 'react-native';
import Header from '../components/Header';
import {colors} from '../utils/constants';


class Movie extends Component {
    constructor() {
        super();

        this.state = {
            movie: {},
            loading: true,
            videos: []
        }
    }
    static navigationOptions = {
        //title: "Imagiflix",
        header: null,
    };

    componentDidMount() {
        const id = this.props.navigation.getParam("id");

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4ba13f07eb7d66f818df7d9bf080d2e8&language=pt-br`)
            .then(res => res.json())
            .then(res => {
                this.setState({movie: res, loading: false });
                }
        );

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=4ba13f07eb7d66f818df7d9bf080d2e8&language=pt-br`)
            .then(res => res.json())
            .then(res => {
                const videoLinks = res.results.filter(item => item.site === "YouTube")
                .map(item => `https://www.youtube.com/watch?v=${item.key}`);
                this.setState({ videos: videoLinks });
                }
        );
    }

    textVote(vote) {
        if (vote < 5) {
         return colors.danger;
        } else if (vote >= 5 && vote < 7) {
          return colors.warning;
        } else {
          return colors.sucess;
        }
    }

    render() {
        const { movie, loading, videos } = this.state;
        const urlImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        if (loading) {
            return(
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={50} color={colors.primary} />
                </View>
            )
        }

        return (
            <>
                <Header />

                <View style={styles.containerBack}>
                    <Text style={styles.back} onPress={() => this.props.navigation.goBack()}>Voltar</Text>
                </View>

                <ScrollView>
  
                    <View style={styles.container}>
                        <Text style={styles.title}>{movie.title}</Text>

                        <View style={styles.wrapPoster}>
                            <Image
                                style={styles.poster}
                                source={{uri: urlImage}}
                            />
                        </View>

                        <View style={styles.info}>
                            <Text style={{ ...styles.infoText, backgroundColor: this.textVote(movie.vote_average) }}>{movie.vote_average}</Text>
                            <Text style={styles.infoText}>{movie.release_date}</Text>
                            <Text style={styles.infoText}>{movie.runtime} min.</Text>
                        </View>

                        <View>
                            <Text style={styles.overview}>{movie.overview}</Text>

                            <Text style={styles.subtitle}>Trailer</Text>

                            {videos.map((video, index) => (
                                <View style={styles.trailerButton} key={index}>
                                    <Button
                                        title={`Trailer ${index + 1}`}
                                        onPress={() => Linking.openURL(video)}
                                        color={colors.primary}
                                    />                                    
                                </View>
                            ) )}
                        </View>
                    </View>
                </ScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center"
    },
    poster: {
        width: 300,
        height: 430
    },
    wrapPoster: {
        alignItems: "center",
        marginVertical: 20
    },
    info: {
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: "space-around"
    },
    infoText: {
        color: "white",
        backgroundColor: "#444444",
        padding: 2,
        paddingHorizontal: 5,
        fontSize: 12,
        fontWeight: "bold",
        borderRadius: 4
    },
    overview: {
        fontSize: 16
    },
    subtitle: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 15,
        marginTop: 30
    },
    trailerButton: {
        marginBottom: 10
    },
    containerBack: {
        padding: 20
    },
    back: {
        fontWeight: "bold",
        fontSize: 12,
        color: colors.primary,
        textTransform: "uppercase"
    }
});

export default Movie;