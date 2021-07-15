import React from "react";
import { StyleSheet, Text, View } from "react-native";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>GameOver!</Text>
      <Text>It took me {props.numberOfRounds} rounds to beat you!</Text>
      <Text>Your Number is {props.userNumber} </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameOverScreen;
