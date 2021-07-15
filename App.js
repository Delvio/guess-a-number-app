import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
// Screens
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  // State
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [assetLoaded, setAssetLoaded] = useState(false);

  if (!assetLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setAssetLoaded(true)}
        onError={() => console.log(err)}
      />
    );
  }

  // Handlers
  const gameResetHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  };

  let content = <StartGameScreen onGameStart={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        numberOfRounds={guessRounds}
        userNumber={userNumber}
        onReset={gameResetHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
