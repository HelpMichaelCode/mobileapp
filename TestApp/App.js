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
  TextInput,
  FlatList,
} from 'react-native';

const App: () => React$Node = () => {
  const [collectionOfDrinks, setDrinkCollection] = useState([]);
  const [collectionOfDrinksFull, setDrinkCollectionFull] = useState([]);
  const [text, setText] = useState('');

  // Retrievs all drinks 
  useEffect(() => 
  {
    axios.get("https://8f88f3bb5ce6.ngrok.io/cocktails/alldrinks")
        .then(res => {setDrinkCollectionFull(res.data), setDrinkCollection(res.data)})
        .catch(err => console.log(err));
  }, []);

  function searchFilter(text)
  {
    setText(text);
    const newData = collectionOfDrinksFull.filter(item => 
      {
        const itemData = item.drinkName.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      // Can try include function here, maybe.
      setDrinkCollection(newData);
  }
  // Delets a specfici drink
  function deleteEndpoint(drinkId)
  {
    var value = parseInt(drinkId);
    axios.delete(`https://8f88f3bb5ce6.ngrok.io/cocktails?ID=${value}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  function renderItem({item})
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
    );
  }

  return (
    <>
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.mainHeading}>Cocktails</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={(text) => searchFilter(text)}
          placeholder="Search Cocktail"
        />
        <FlatList
          data={collectionOfDrinks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          />
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  buttonStyleSearch: 
  {
    backgroundColor: '#ff4e50',
    alignItems: 'center',
    width: 60,
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 10,
    borderRadius: 3,
  },
  input: 
  {
    width: 250,
    borderRadius: 5,
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
    borderRadius: 10,
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
