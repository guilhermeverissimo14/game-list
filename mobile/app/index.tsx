import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { listAllGames } from "@/services/listGames";
import { useQuery } from "@tanstack/react-query";

export interface ListAllGames {
  id: number;
  title: string;
  year: string;
  genre: string;
  platforms: string;
  score: number;
  imgUrl: string;
  shortDescription: string;
  longDescription: string;
}

export default function Home() {

  const { data, isFetching, error } = useQuery<ListAllGames[]>({
    queryKey: ['allGames'],
    queryFn: async () => {
      const response = await listAllGames();
      return response;
    }
  })

  return (
    <View
      style={styles.container}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
        renderItem={({ item: game }) => (
          <View style={styles.card}>
            <Image style={styles.imgGame} source={{ uri: game.imgUrl }} />
            <Text style={styles.titleGame}>{game.title}</Text>
          </View>
        )}
      />

      <View style={styles.contentLoading}>
        {isFetching && <ActivityIndicator size="large" color="white" />}
        {error && <Text style={styles.textError}>Error ao listar games</Text>}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3c3d47"
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
    width: 120,
    height: 150,
    resizeMode: "cover",
    borderRadius: 8
  },
  titleGame: {
    color: "#ffff",
    fontWeight: 600,
    fontSize: 14
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    alignItems: "center",
    margin: 5,
  },
})
