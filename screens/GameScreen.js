import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generatedRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generatedRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const lowestNumber = useRef(1);
  const highestNumber = useRef(100);
  const [currentGuess, setCurrentGuess] = useState(
    generatedRandomBetween(
      lowestNumber.current,
      highestNumber.current,
      props.userChoice
    )
  );

  const handleHint = (direction) => {
    if (
      (direction === "lower" && currentGuess <= props.userChoice) ||
      (direction === "higher" && currentGuess >= props.userChoice)
    ) {
      Alert.alert("No seas palomo", "tu sabes que eso no es asi", [
        { text: "Ya no sere palomo", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      highestNumber.current = currentGuess;
    } else {
      lowestNumber.current = currentGuess;
    }
    setCurrentGuess(
      generatedRandomBetween(lowestNumber.current, highestNumber.current)
    );
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="Lower" onPress={handleHint.bind(this, "lower")} />
        <Button title="Greater" onPress={handleHint.bind(this, "higher")} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
