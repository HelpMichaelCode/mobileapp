/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Card, Title } from 'react-native-paper';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput
} from 'react-native';

const App: () => React$Node = () => {
  const [collectionOfDrinks, setDrinkCollection] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => 
  {
    axios.get("https://e66f32be20ec.ngrok.io/cocktails/alldrinks")
        .then(res => setDrinkCollection(res.data))
        .catch(err => console.log(err));
  }, [collectionOfDrinks]);

  // Might be a bit tricky
  // function searchDocktail()
  // {
  //   return
  //   (

  //   )
  // }
  function deleteEndpoint(drinkId)
  {
    console.log(drinkId);
    var value = parseInt(drinkId);
    axios.delete(`https://e66f32be20ec.ngrok.io/cocktails?ID=${value}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

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
                  <Card.Actions>
                  <TouchableOpacity 
                    style={styles.buttonStyleEdit}
                   >
                    <Text style={{fontFamily: 'sans-serif-light', fontSize: 15}}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.buttonStyleDelete}
                    onPress={() => deleteEndpoint(item.id)}>
                    <Text style={{fontFamily:'sans-serif-light', fontSize: 15}}>Delete</Text>
                  </TouchableOpacity>
                </Card.Actions>
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
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={text => setText(text)}
          placeholder="Search Cocktail"
        />
        {displayDrinks()}
      </ScrollView>
    </SafeAreaView>
     
    </>
  );
};

const styles = StyleSheet.create({
  input: 
  {
    width: 250,
    borderRadius: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  buttonStyleEdit: 
  {
    backgroundColor: '#ff4e50',
    alignItems: 'center',
    width: 50,
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 210,
    borderRadius: 3,
  },
  buttonStyleDelete: 
  {
    backgroundColor: '#ff4e50',
    alignItems: 'center',
    width: 60,
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 10,
    borderRadius: 3,
  },
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
