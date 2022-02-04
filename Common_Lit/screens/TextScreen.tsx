import {
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import {WebView} from 'react-native-webview';
import {getParent} from 'domutils';
import { useEffect, useContext, useState } from 'react';
import LibContext from '../context/LibContext';

export default function TextScreen({ navigation }: RootStackScreenProps<'Text'>) {
  const {textData, getDownloadJSONHTML} = useContext(LibContext);
  //htmlData = textData.html;
    //console.log(textData);
    const contentWidth = useWindowDimensions().width;
    const contentHeight = useWindowDimensions().height ;
    //const [isBookLoading, setBookLoading] = useState(true);
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
    /*
    <Text style={styles.baseText}>
              <Text style={styles.titleText}>
                {textData.name}
                {'\n'}
                By: {textData.author}
                {'\n'}
                {'\n'}
              </Text>
            </Text>
            */
    return (
      <View>
          <ScrollView>
            
            <ScrollView horizontal>
              <View>
                <WebView style={styles.container} source={{html: textData.html}} />
              </View>
            </ScrollView>
          </ScrollView>
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
