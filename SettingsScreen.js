import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";

export function SettingsScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        "https://api.sampleapis.com/coffee/hot"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  function handleSettingsPress() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.screen}>
      <Button title="Vrati se na Home Screen!" onPress={handleSettingsPress} />
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.itemWrapper}>
                <View style={styles.item}>
                  <View style={styles.image}>
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: `${item.image}`,
                      }}
                    />
                  </View>
                  <View style={styles.text}>
                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.ingredients}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    fontFamily: 'Georgia',
    color:"gray",
  },
  tinyLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  image: {
    width: 100,
    height: 100,
    
  },

  item: {
    flexDirection: "row",
    margin: 10,
    fontFamily: 'Georgia',
  },
  text: {
    padding: 11,
    fontFamily: 'Georgia',
    fontWeight: 'bold',
    
  },
});