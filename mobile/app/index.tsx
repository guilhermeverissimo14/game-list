import { ActivityIndicator, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View, StatusBar } from "react-native";
import { listAllGames, listAllGenders, listGamesId } from "@/services/listGames";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface ListAllGames {
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

interface ListAllGenders {
  id: number;
  name: string;
  imgUrl: string;
}

export default function Home() {

  const [gamesScreen, setGamesScreen] = useState(true);
  const [genderScreen, setGenderScreen] = useState(false);
  const [genderById, setGenderById] = useState(false);
  const [id, setId] = useState<number | null>();

  const queryClient = useQueryClient();

  const { data, isFetching, error } = useQuery<ListAllGames[]>({
    queryKey: ['allGames'],
    queryFn: async () => {
      const response = await listAllGames();
      return response;
    },
    staleTime: 0,
    enabled: !!id,
  })

  const { data: dataGender, isFetching: isFetchingGender, error: errorGender } = useQuery<ListAllGenders[]>({
    queryKey: ['allGenders'],
    queryFn: async () => {
      const response = await listAllGenders();
      return response;
    }
  })

  const { data: dataGamesId, isFetching: isFetchingGamesId, error: errorGamesId, refetch } = useQuery<ListAllGames[]>({
    queryKey: ['allGamesId'],
    queryFn: async () => {
      const response = await listGamesId(id!);
      return response;
    },

  })

  function handleGames() {
    setGamesScreen(true);
    setGenderScreen(false);
    setGenderById(false);
  }

  function handleGenders() {
    setGamesScreen(false);
    setGenderScreen(true);
    setGenderById(false);
  }

  function genderByIds(idParamns: number) {
    refetch();
    setId(idParamns);
    setGamesScreen(false);
    setGenderScreen(false);
    setGenderById(true);
  }


  return (
    <View
      style={styles.container}
    >
      <View style={styles.menuLists}>

        <TouchableOpacity
          onPress={handleGames}
          style={[styles.btnGames, { backgroundColor: gamesScreen ? "#ffff" : "#3c3d47" }]}
        >

          <Text style={{ color: gamesScreen ? "black" : "white" }}>Games</Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleGenders}
          style={[styles.btnGenders, { backgroundColor: genderScreen ? "#ffff" : "#3c3d47" }]}
        >

          <Text style={{ color: genderScreen ? "black" : "#ffff" }}>Gêneros</Text>

        </TouchableOpacity>

      </View>

      {gamesScreen && (
        <>
          <View style={styles.contentCard}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={styles.row}
              renderItem={({ item: game }) => (
                <TouchableOpacity style={styles.card}>
                  <Image style={styles.imgGame} source={{ uri: game.imgUrl }} />
                  <Text style={styles.titleGame}>{game.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.contentLoading}>
            {isFetching && <ActivityIndicator size="large" color="white" />}
            {error && <Text style={styles.textError}>Error ao listar games</Text>}
          </View>
        </>
      )}

      {genderScreen && (
        <>
          <View style={styles.contentCard}>
            <FlatList
              data={dataGender}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={styles.row}
              renderItem={({ item: gender }) => (
                <TouchableOpacity
                  onPress={() => genderByIds(gender.id)}
                  style={styles.card}
                >
                  <Image style={styles.imgGame} source={{ uri: gender.imgUrl }} />
                  <Text style={styles.titleGame}>{gender.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.contentLoading}>
            {isFetchingGender && <ActivityIndicator size="large" color="white" />}
            {errorGender && <Text style={styles.textError}>Error ao listar games</Text>}
          </View>
        </>
      )}

      {genderById && (
        <>
          <View style={styles.contentCard}>
            <FlatList
              data={dataGamesId}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={styles.row}
              renderItem={({ item: games }) => (
                <TouchableOpacity style={styles.card}>
                  <Image style={styles.imgGame} source={{ uri: games.imgUrl }} />
                  <Text style={styles.titleGame}>{games.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.contentLoading}>
            {isFetchingGamesId && <ActivityIndicator size="large" color="white" />}
            {errorGamesId && <Text style={styles.textError}>Error ao listar games</Text>}
          </View>
        </>
      )}

    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3c3d47",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! : 10,
  },
  contentLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textError: {
    color: "#ffff"
  },

  menuLists: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    justifyContent: "center",
  },

  btnGames: {
    width: "45%",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    fontWeight: 600,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ffff"
  },

  btnGenders: {
    width: "45%",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ffff"
  },

  contentCard: {
    marginTop: 10,
    paddingBottom: 80
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
