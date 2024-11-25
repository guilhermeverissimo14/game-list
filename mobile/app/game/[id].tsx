import { View, Text, StyleSheet, StatusBar, ActivityIndicator, Platform, Image } from 'react-native';
import { listGame } from '@/services/listGames';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';

interface ListGame {
    id: number;
    title: string;
    year: number;
    genre: string;
    score: number;
    imgUrl: string;
    shortDescription: string;
    longDescription: string;
}

export default function GameId() {

    const { id } = useLocalSearchParams();

    const { data, isFetching, error } = useQuery<ListGame>({
        queryKey: ['gameId'],
        queryFn: async () => {
            const response = await listGame(Number(id));
            console.log("response", response)
            return response;
        },
        enabled: !!id,
    })

    return (
        <View style={styles.container}>
            <>
                <View style={styles.card}>
                    <Image source={{ uri: data?.imgUrl }} style={styles.imgGame} />
                    <View style={styles.contentTexts}>

                        <Text style={styles.titleGame}>{data?.title}</Text>

                        <Text style={styles.textLeft}>
                            Ano:
                            <Text style={styles.textRight}> {data?.year}</Text>
                        </Text>

                        <Text style={styles.textLeft}>
                            Gênero:
                            <Text style={styles.textRight}> {data?.genre}</Text>
                        </Text>

                        <Text style={styles.textLeft}>
                            Score:
                            <Text style={styles.textRight}> {data?.score}</Text>
                        </Text>

                        <Text style={styles.textLeft}>
                            Introdução:
                            <Text style={styles.textRight}> {data?.shortDescription}</Text>
                        </Text>

                        <Text style={styles.textLeft}>
                            Descrição:
                            <Text style={styles.textRight}> {data?.longDescription}</Text>
                        </Text>

                    </View>
                </View>
                <View style={styles.contentLoading}>
                    {isFetching && <ActivityIndicator size="large" color="white" />}
                    {error && <Text style={styles.textError}>Error ao listar games</Text>}
                </View>
            </>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: "#3c3d47",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! : 10,
        alignItems: "center",
    },
    contentLoading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textError: {
        color: "#ffff"
    },

    imgGame: {
        width: "100%",
        height: 350,
        resizeMode: "cover",
        borderRadius: 3
    },
    titleGame: {
        color: "#ffff",
        fontWeight: 600,
        fontSize: 18,
        textAlign: "center",
        width: "100%",
        padding: 8,
    },

    card: {
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        borderRadius: 8
    },
    contentTexts: {
        width: "100%",
        margin: 10,
        alignItems: "flex-start",
        gap: 2
    },
    textLeft: {
        color: "#ffff",
        fontWeight: 600,
        fontSize: 16,
    },
    textRight: {
        color: "#f8f8f8",
        fontWeight: 400,
        fontSize: 14,
    }
})