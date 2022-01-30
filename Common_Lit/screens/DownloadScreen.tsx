import { StyleSheet, FlatList, Button } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import LibContext from '../context/LibContext';
import Navigation from '../navigation';

export default function DownloadScreen() {
  const value = useContext(LibContext);
  const { data, addBlogPost } = useContext(LibContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={value}
        keyExtractor={blogPost => blogPost.title}
        renderItem={({ item }) => {
          return <Text>{item.title}</Text>;
        }}
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
