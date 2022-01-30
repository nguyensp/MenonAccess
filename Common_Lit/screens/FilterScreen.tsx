import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, SectionList } from 'react-native';
import { Button } from 'react-native-paper';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function FilterScreen() {
  const DATA = [
    {
      title: "Grade Level",
      data: ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    },
    {
      title: "Genres",
      data: ["Short Story", "Informational", "Texts", "Poetry", "Misc"]
    },
  ];
  
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title} >Grade Level</Text>
      <View style={styles.row}>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>3</Button>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>4</Button>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>5</Button>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>6</Button>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>7</Button>
      </View>
      <View style={styles.row}>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>8</Button>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>9</Button>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>10</Button>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>11</Button>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>12</Button>
      </View>
      <Text style={styles.title} >Genre</Text>
      <View style={styles.row}>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>Short Story</Button>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>Informational</Button>
      </View>
      <View style={styles.row}>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>Texts</Button>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>Poetry</Button>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>Misc</Button>
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
