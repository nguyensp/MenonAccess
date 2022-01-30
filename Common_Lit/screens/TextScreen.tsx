import { StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import {WebView} from 'react-native-webview';
import {getParent} from 'domutils';

export default function TextScreen({ navigation }: RootStackScreenProps<'Text'>) {
  const text = "https://www.mushroom-ebooks.com/authors/akers/samplers/AKERSTransitToScorpio%28Sampler%29.html"
  const contentWidth = useWindowDimensions().width * 2;
  const contentHeight = useWindowDimensions().height - 210;
  const styles = StyleSheet.create({
    container: {
      flex: 0,
      width: contentWidth,
      height: contentHeight,
      marginVertical: 8,
      marginHorizontal: 16,
      //backgroundColor: 'offwhite',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView>
            <ScrollView horizontal>
              <View>
                <WebView style={styles.container} source={{uri: text}} />
              </View>
            </ScrollView>
          </ScrollView>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
      </TouchableOpacity>
    </View>
  );
}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
*/
