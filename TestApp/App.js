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
    axios.get("https://d65ffa3d707d.ngrok.io/cocktails/alldrinks")
        .then(res => setDrinkCollection(res.data))
        .catch(err => console.log(err));
  }, [collectionOfDrinks]);

  function displayDrinks()
  {
    return collectionOfDrinks.map(item => 
          {
            return(
              <Card>
                <Title style={styles.titleStyle}><Text>{item.drinkName}</Text></Title>
                <Card.Cover source={{ uri: item.imageUrl}} style={styles.image} />
                <Card.Content>
                  <Title style={styles.contentStyle}>Milliters: {item.milliliter}ml</Title>
                  <Title style={styles.contentStyle}>Alcohol: {item.percentageOfAlcohol}%</Title>
                  <Title style={styles.contentStyle}>Price: €{item.price}</Title>
                </Card.Content>
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
    width: 350,
    height: 300,
    marginLeft: 5,
  },
  titleStyle : 
  {
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
    fontSize: 25,
    textAlign: 'center'
  },
  contentStyle: 
  {
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
    fontSize: 21,
  }
});

export default App;
