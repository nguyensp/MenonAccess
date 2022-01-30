import { 
  ActivityIndicator,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity
 } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import NetInfo from '@react-native-community/netinfo'
import React, { useEffect, useState, useContext } from 'react';
import { greaterOrEq } from 'react-native-reanimated';
import LibContext from '../context/LibContext';

export default function CatalogScreen({ navigation }: RootTabScreenProps<'Catalog'>) {
  const [isLibraryLoading, setLibraryLoading] = useState(true);
  const value = useContext(LibContext);
  //const { cataLog } = useContext(LibContext);
  const { data, addBlogPost } = useContext(LibContext);
  const [selectedId, setSelectedId] = useState(null);

  /*
  const renderCategory = ({ item }) => {
    return (
      <View style={{
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#ddd",
      }}>
        <Text style={{ marginRight: 9 }}>{item.id}</Text>
        <Text>{item.name}</Text>
        <Text>{item.grade_level}</Text>
        <Text>{item.genres}</Text>
      </View>
    )
  }

  

  

  //Buttons used to test and debug API and SQL features
  <Button
    title="Get more detailed NetInfo"
    onPress={getNetInfo}
  />

  <Button
    title="Download Selected Text"
    onPress={
      () => {
      getBookInfo(selectedId, "download");
      }
    }
  />
  <Button 
    title="API To Catalog"
      onPress={
        () => {
          getFromAPILibrary("APIToCatalog");
        }
      } 
  />
  <Button 
    title="Display Text List"
    onPress={
      () => {
        getCategories();
      }
    } 
  />
  <Button
    title="Create All Tables"
    onPress={
      () => {
        createTables();
      }
    }
  />
  <Button
    title="Delete Tables"
    onPress={
      () => {
        deleteTables();
      }
    }
  />
  <Button
    title="Drop Tables"
    onPress={
      () => {
        dropTables();
      }
    }
  />
      <Text>{selectedId}</Text>
      {isLibraryLoading ? <ActivityIndicator/> : (
        /*
        )}
        <FlatList
        data={value}
        keyExtractor={blogPost => blogPost.title}
        renderItem={({ item }) => {
          return <Text>{item.title}</Text>;
        }}
      />
    */
      const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style = {[styles.item, backgroundColor]}>
          <Text style={[styles.title, textColor]}>{item.title}</Text>
        </TouchableOpacity>
      );

        const renderLibrary = ({ item }) => {
          const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
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
  
  return (
    <View style={styles.container}>
      <Button 
      title="Download Selected Text"
      onPress={addBlogPost}
      />
      <FlatList
          data={value}
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