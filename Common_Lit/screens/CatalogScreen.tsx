import { 
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
 } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import NetInfo from '@react-native-community/netinfo'
import React, { useEffect, useState, useContext } from 'react';
import { greaterOrEq } from 'react-native-reanimated';
import LibContext from '../context/LibContext';
import { Avatar, Button, Card, Title, Paragraph, Chip, FAB, Portal, Provider } from 'react-native-paper';

export default function CatalogScreen({ navigation }: RootTabScreenProps<'Catalog'>) {
  const [isLibraryLoading, setLibraryLoading] = useState(true);
  const {categories, getFromAPILibrary, getBookInfo, createTables, deleteTables, dropTables,
    getNetInfo, getCategories, hm} = useContext(LibContext);
  const [selectedId, setSelectedId] = useState(null);
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

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

  return (
    <View style={styles.container}>
      <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 11 }} onPress={() => getFromAPILibrary("APIToCatalog")}>API to Catalogar</Button>
      <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 11 }} onPress={() => getCategories()}>Mostrar Catalogo</Button>
      <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 11 }} onPress={() => getBookInfo(selectedId, "add")}>descarga</Button>
      
      <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'wrench' : 'wrench'}
          actions={[
            { icon: 'plus', onPress: () => console.log('Pressed add') },
            {
              icon: 'bell',
              label: 'Drop All SQL Tables',
              onPress: () => dropTables(),
            },
            {
              icon: 'minus',
              label: 'Clear All SQL Tables',
              onPress: () => deleteTables(),
            },
            {
              icon: 'plus',
              label: 'Create Local Storage Tables',
              onPress: () => createTables(),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
      <FlatList
          data={categories}
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
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 50,
    height: 50,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  fab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    top: 0,
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});