/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Card, Title, Headline, Snackbar } from 'react-native-paper';
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
      <ScrollView>
        <Text style={styles.mainHeading}>Cocktails</Text>
        {displayDrinks()}
      </ScrollView>
    </SafeAreaView>
     
    </>
  );
};

const styles = StyleSheet.create({
  mainHeading: 
  {
    fontSize: 35,
    fontFamily: 'sans-serif-light',
    textAlign: 'center',
    marginBottom: 25,
    backgroundColor: '#ff4e50',
    paddingBottom: 10,
    paddingTop: 10,
  },
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
    textAlign: 'center',
  },
  contentStyle: 
  {
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
    fontSize: 21,
  }
});

export default App;
