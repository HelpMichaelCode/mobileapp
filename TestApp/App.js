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
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Alert,
  View,
  Pressable,
} from 'react-native';

function App() {
  const [collectionOfDrinks, setDrinkCollection] = useState([]);
  const [collectionOfDrinksFull, setDrinkCollectionFull] = useState([]);
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [drinkInput, setDrinkInput] = useState('');
  const [millilitersInput, setMillilitersInput] = useState('');
  const [alcoholInput, setAlcoholInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  var ngrokUrl = "https://ed7c3f6e02bd.ngrok.io";
  // Retrievs all drinks 
  useEffect(() => 
  {
    axios.get(`${ngrokUrl}/cocktails/alldrinks`)
        .then(res => {setDrinkCollectionFull(res.data), setDrinkCollection(res.data)})
        .catch(err => console.log(err));
  }, [modalVisible]);
  
  // Saerch filter for cocktail collection
  function searchFilter(text)
  {
    setText(text);
    // Can try include function here, maybe.
    const newData = collectionOfDrinksFull.filter(item => 
      {
        const itemData = item.drinkName.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setDrinkCollection(newData);
  }
  // Delete a specific drink
  function deleteEndpoint(drinkId)
  {
    var value = parseInt(drinkId);
    axios.delete(`${ngrokUrl}/cocktails?ID=${value}`)
      .then(res => {setDrinkCollection(collectionOfDrinks.filter((drink) => drink.id != value))})
      .catch(err => console.log(err));
  }
 
  function addNewDrink()
  {
    const newDrink = 
    {
      drinkName: drinkInput,
      percentageOfAlcohol: alcoholInput,
      milliliter: millilitersInput,
      price: priceInput,
      imageUrl: imageInput
    };
    axios
      .post(`${ngrokUrl}/cocktails/add`, newDrink)
      .then(res => setDrinkCollection([...collectionOfDrinks], newDrink))
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
          <TouchableOpacity 
            style={styles.buttonStyleAddDrink}
            onPress={() => setModalVisible(true)}>
            <Text style={{fontFamily:'sans-serif-light', fontSize: 15}}>Add Drink</Text>
          </TouchableOpacity>
        </Card.Actions>
        </Card.Content>
        <Text></Text>
      </Card>
    );
  }
  return (
    <>
        <Text style={styles.mainHeading}>Cocktails</Text>
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <TextInput
              style={styles.modalInput}
              value={drinkInput}
              onChangeText={(drinkInput) => setDrinkInput(drinkInput)}
              placeholder="Enter cocktail name"
            />
            <TextInput
              style={styles.modalInput}
              value={millilitersInput}
              onChangeText={(millilitersInput) => setMillilitersInput(millilitersInput)}
              placeholder="Enter milliliters"
            />
            <TextInput
              style={styles.modalInput}
              value={alcoholInput}
              onChangeText={(alcoholInput) => setAlcoholInput(alcoholInput)}
              placeholder="Enter percentage of alcohol"
            />
            <TextInput
              style={styles.modalInput}
              value={priceInput}
              onChangeText={(priceInput) => setPriceInput(priceInput)}
              placeholder="Enter price"
            />
            <TextInput
              style={styles.modalInput}
              value={imageInput}
              onChangeText={(imageInput) => setImageInput(imageInput)}
              placeholder="Image url"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible); addNewDrink()}}
            >
              <Text style={styles.textStyle}>Add New Drink</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
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
          windowSize={10}
          maxToRenderPerBatch={3}
          />
    </>
  );
};

const styles = StyleSheet.create({
  buttonStyleAddDrink: 
  {
    backgroundColor: '#ff4e50',
    alignItems: 'center',
    width: 60,
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 10,
    borderRadius: 3,
  },
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
  modalInput:
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
    marginLeft: 137,
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    width: 100,
    borderRadius: 3,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: "#ff4e50",
  },
  textStyle: {
    color: "black",
    fontFamily: 'sans-serif-light',
    textAlign: "center"
  },
});

export default App;
