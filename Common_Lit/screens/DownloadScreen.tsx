import { 
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity
 } from 'react-native';

import React, { useEffect, useState, useContext } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import LibContext from '../context/LibContext';
import Navigation from '../navigation';
import { Button } from 'react-native-paper';

export default function DownloadScreen() {
  const {downloads, categories, getFromAPILibrary, getBookInfo,
    getNetInfo, getDownloads, getDownloadJSONHTML} = useContext(LibContext);
    const [selectedId, setSelectedId] = useState(null);
    
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity onPress={onPress} style = {[styles.item], backgroundColor}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>{item.name}</Text>
      <Text >Escrito Por: {item.author}</Text>
      <Text>nivel de grado: {item.grade_level}</Text>
      <Text>{item.genres}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </TouchableOpacity>
    
     );
  
    const renderLibrary = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#F0FFFF" : "";
      const color = item.id === selectedId ? 'white' : 'black';
  
      return (
        <Item
          item={item}
          onPress={() => {
            setSelectedId(item.id)
          }}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };


//getDownloadJSONHTML(selectedId);

  return (
    <View style={styles.container}>
      <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 11 }} onPress={() => getDownloads()}>Mostrar Descargas</Button>
      <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 11 }} onPress={() => getDownloadJSONHTML(selectedId)}>leer</Button>
      <FlatList
          data={downloads}
          renderItem={renderLibrary}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
