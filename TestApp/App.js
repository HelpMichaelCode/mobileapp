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
  const [modalVisibleAddDrink, setModalVisibleNewDrink] = useState(false);
  const [modalVisibleUpdateDrink, setModalVisibleUpdate] = useState(false);
  const [drinkInput, setDrinkInput] = useState('');
  const [millilitersInput, setMillilitersInput] = useState('');
  const [alcoholInput, setAlcoholInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [ populateEditModal, setPopulateEditModal ] = useState({
    id: 0,
    drinkName: "",
    percentageOfAlcohol: 0,
    milliliter: 0,
    price: 0.0,
    imageUrl: ""
	});

  var ngrokUrl = "https://d8922bb4bb33.ngrok.io";
  // Retrievs all drinks
  useEffect(() =>
  {
    axios.get(`${ngrokUrl}/cocktails/alldrinks`)
        .then(res => {setDrinkCollectionFull(res.data), setDrinkCollection(res.data)})
        .catch(err => console.log(err));
  }, [modalVisibleAddDrink, modalVisibleUpdateDrink]);
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

      setDrinkCollectionFull(newData);
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
      imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAAEsCAMAAABgwwj8AAAAe1BMVEX98fAAAAD/9fT/9/b/+fjWzMv//Pu8s7LLwcDl2tn/+vj47OvHvr377+7///46ODiYkZHe1NPq394aGRizq6pJRkZaVlWKg4Oak5Lx5eQrKSl/eXliXV2poaCMhYVnYmEgHx8SEREyMC9STk0NDAzJv76tpKRybWxCPz/Mj9BqAAACuElEQVR4nO3b226qQBhAYf6ZAaQgZVBRWlGr1fb9n3DP4CG7tTvxoslA9vqS4lS4WKWcIhhFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8kwod8BhtJzp0wyPURGQzhlK9aVYLE7riEfVOtknoiIeYVtIxrFKtngqptfpqeFut7uRHeeiw79Rc5tbutln8F9vINHTYHbMSm1iJ6/Tm+Cn1AM8CiSstO5neNtNy6bbZ0FU/6UsPzfUYlSwlG2TnuTSS7nyMGnCni6skiyXz2+WgO/vSevmmBt/Zl7Yvr8ZUA+90pR8vbZwUYgfe6U5RsybtZD78s76KJVrtx3AdlRw6OQ7whHTPXewP/x/vmc16JKHNavC7fM88z8cSmo5iXyL01xH628YTuh9JaCLjOOArK89juHhSyWEt6XBLjYmU8exhZyZS5eYsdNd3Vj5d3mw2E5HZ7sVP3xa72ex9aJ895UWs2uPki9hPQofdUcr/3AvdBQAAAAAAAADA/0g7/UC5wfnTen1+/zZSl9/8vZ1gt/Paqqq6XPvHctwo9R3txrqyU2ei3I9UVSjTrdwMM3l9nYd6OjeT50YkVpGuZLuWxvi3ChU9HWTuHyF3M2RZbsSqSBWybiTUvdxMjqVeiPahSZlKew11+VnuR0aqVPw3M9wSWdmGyTxX6UJqn6HNyj93fQldH3aX0IU0pV/WiuyDPa/nqrQ5uRXpQp1O30KbqWz70Hf32vcZfdzKKdDulEk6jeVgfKg99Q/iXkPLo5zX6Ee59puE+ehULstAodavxyb3X2gRk3y+RdfQxeIp2Vx2JpPLXvklRN7rMJ1Rbq1t++2udoeiNnbJuZ9EWeb/DL/v2DpS/QwzjeNw38z6ek9W3SbRTyPu3wIAAAAAAAAAAAAAAAAAAAAAAAAAgEH6A3KCHRvBxslPAAAAAElFTkSuQmCC'
    };
    axios
      .post(`${ngrokUrl}/cocktails/add`, newDrink)
      .then(res => setDrinkCollection([...collectionOfDrinks], newDrink))
      .catch(err => console.log(err));
  }

    function ascendingOrder()
    {
      axios.get(`${ngrokUrl}/cocktails/ascending`)
              .then(res => setDrinkCollectionFull(res.data))
              .catch(err => console.log(err));
    }

      function descendingOrder()
      {
        axios.get(`${ngrokUrl}/cocktails/descending`)
                .then(res => setDrinkCollectionFull(res.data))
                .catch(err => console.log(err));
      }

  const updateDrink = (e) =>
  {
    axios.put(`${ngrokUrl}/cocktails/update`,
    {
      id: e.id,
      drinkName: e.drinkName,
      percentageOfAlcohol: e.percentageOfAlcohol,
      milliliter: e.milliliter,
      editPriceInput: e.price,
      imageUrl: e.imageUrl
    })
    .then(res => {
      setDrinkCollection([...collectionOfDrinks.filter((drink) => drink.id !== populateEditModal.id), populateEditModal]);
      setDrinkCollectionFull([...collectionOfDrinksFull.filter((drink) => drink.id !== populateEditModal.id), populateEditModal]);
    })
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
            onPress={() => {setPopulateEditModal({...item}); setModalVisibleUpdate(true)}}
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
            onPress={() => setModalVisibleNewDrink(true)}>
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
               <TouchableOpacity
                          style={styles.buttonStyleEdit}
                          onPress = {()=>ascendingOrder()}
                         >
                         <Text>Ascending</Text>
                         </TouchableOpacity>
                                  <TouchableOpacity
                                             style={styles.buttonStyleEdit}
                                             onPress = {()=>descendingOrder()}
                                            >
                                            <Text>Descending</Text>
                                            </TouchableOpacity>
      <TextInput
          style={styles.input}
          value={text}
          onChangeText={(text) => searchFilter(text)}
          placeholder="Search Cocktail"
      />
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisibleAddDrink}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleNewDrink(!modalVisibleAddDrink);
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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisibleNewDrink(!modalVisibleAddDrink); addNewDrink()}}
            >
              <Text style={styles.textStyle}>Add New Drink</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisibleUpdateDrink}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleUpdate(!modalVisibleUpdateDrink);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <TextInput
              style={styles.modalInput}
              value={populateEditModal.drinkName}
              onChangeText={(text) => setPopulateEditModal((pState) => ({
                ...pState,
                drinkName: text
              }))}
              placeholder="Enter cocktail name"
            />
            <TextInput
              style={styles.modalInput}
              value={populateEditModal.milliliter.toString()}
              keyboardType = 'numeric'
              onChangeText={(text) => setPopulateEditModal((pState) => ({
                ...pState,
                milliliter: text
              }))}
              placeholder="Enter milliliters"
            />
            <TextInput
              style={styles.modalInput}
              value={populateEditModal.percentageOfAlcohol.toString()}
              keyboardType = 'numeric'
              onChangeText={(text) => setPopulateEditModal((pState) => ({
                ...pState,
                percentageOfAlcohol: text
              }))}
              placeholder="Enter percentage of alcohol"
            />
            <TextInput
              style={styles.modalInput}
              value={populateEditModal.price.toString()}
              keyboardType = 'numeric'
              onChangeText={(text) => setPopulateEditModal((pState) => ({
                ...pState,
                price: text
              }))}
              placeholder="Enter price"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisibleUpdate(!modalVisibleUpdateDrink); updateDrink(populateEditModal); Alert.alert('Drink Updated!')}}
            >
              <Text style={styles.textStyle}>Update Drink</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>

        <FlatList
          data={collectionOfDrinksFull}
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
    borderWidth: 0.5,
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
