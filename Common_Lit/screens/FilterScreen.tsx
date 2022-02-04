import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, SectionList } from 'react-native';
import { Button } from 'react-native-paper';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import React, { useEffect, useState, useContext } from 'react';
import LibContext from '../context/LibContext';

export default function FilterScreen() {
  const {categories, getFromAPILibrary, getBookInfo, createTables, deleteTables, dropTables,
    getNetInfo, getCategories, hm} = useContext(LibContext);
  
  //data: ["Short Story", "Informational", "Texts", "Poetry", "Misc"]
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title} >Nivo De Grado</Text>
      <View style={styles.row}>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 14 }} onPress={() => getCategories("WHERE grade_level = 3")}>3</Button>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 14 }} onPress={() => getCategories("WHERE grade_level = 4")}>4</Button>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 14 }} onPress={() => getCategories("WHERE grade_level = 5")}>5</Button>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 14 }} onPress={() => getCategories("WHERE grade_level = 6")}>6</Button>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 14 }}onPress={() => getCategories("WHERE grade_level = 7")}>7</Button>
      </View>
      <View style={styles.row}>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 14 }} onPress={() => getCategories("WHERE grade_level = 8")}>8</Button>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 14 }} onPress={() => getCategories("WHERE grade_level = 9")}>9</Button>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 14 }} onPress={() => getCategories("WHERE grade_level = 10")}>10</Button>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 14 }} onPress={() => getCategories("WHERE grade_level = 11")}>11</Button>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 14 }} onPress={() => getCategories("WHERE grade_level = 12")}>12</Button>
      </View>
      <Text style={styles.title} >Géneros</Text>
      <View style={styles.row}>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 14 }} onPress={() => console.log('Pressed')}>cuento</Button>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 14 }} onPress={() => console.log('Pressed')}>informativo</Button>
      </View>
      <View style={styles.row}>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 14 }} onPress={() => console.log('Pressed')}>textos</Button>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 14 }} onPress={() => console.log('Pressed')}>poesía</Button>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 14 }} onPress={() => console.log('Pressed')}>varios</Button>
      </View>
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
});
