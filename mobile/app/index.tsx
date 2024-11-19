import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View
      style={styles.container}
    >
      <Text>teste</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3c3d47"
  }
})
