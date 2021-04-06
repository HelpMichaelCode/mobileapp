/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Card, Title} from 'react-native-paper';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const App: () => React$Node = () => {
  const [collectionOfDrinks, setDrinkCollection] = useState([]);

  useEffect(() => 
  {
    axios.get("https://12f24066b6f6.ngrok.io/cocktails/alldrinks")
        .then(res => setDrinkCollection(res.data))
        .catch(err => console.log(err));
  }, [collectionOfDrinks]);

  function displayDrinks()
  {
    return collectionOfDrinks.map(item => 
          {
            return(
              <Card>
                <Card.Cover source={{ uri: item.imageUrl}} />
                <Text>Drink Name: {item.drinkName}</Text>
                <Text>Milliters: {item.milliliter}</Text>
                <Text>Alcohol %: {item.percentageOfAlcohol}</Text>
                <Text>Price: {item.price}</Text>
                <Text></Text>
              </Card>
            )
          })
  }
  return (
    <>
    <SafeAreaView>
      <ScrollView >
        {displayDrinks()}
      </ScrollView >
    </SafeAreaView>
     
    </>
  );
};

const styles = StyleSheet.create({
  image: 
  {
    width: 335,
    height: 300,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal:3,
  }
});

export default App;
