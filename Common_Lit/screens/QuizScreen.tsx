import {
  ActivityIndicator,
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
import { Avatar, Button, Card, Title, Paragraph, Chip, FAB, Portal, Provider } from 'react-native-paper';

export default function QuizScreen({ navigation }: RootStackScreenProps<'Quiz'>) {
  const {textData, getDownloadJSONHTML} = useContext(LibContext);
  let quizOption = {
    flex: 1,
    padding: 20,
    backgroundColor: '#',
    borderRadius: 1,
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
  };

  return (
    <View>
        <ScrollView>
          <View style={{flex: 1, padding: 24}}>
          </View>
          <View style={styles.viewQuiz}>
            <Text style={styles.quizstyle}>
              {'\n'}
              {textData.guided_reading_questions[0].question}
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={quizOption}>
                {textData.guided_reading_questions[0].answer_options[0].answer}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={quizOption}>
                {textData.guided_reading_questions[0].answer_options[1].answer}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={quizOption}>
                {textData.guided_reading_questions[0].answer_options[2].answer}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={quizOption}>
                {textData.guided_reading_questions[0].answer_options[3].answer}
              </Text>
            </TouchableOpacity>
            
          </View>
        </ScrollView>
        <Button mode="outlined" labelStyle={{ color: "teal", fontSize: 11 }} onPress={() => console.log(textData.guided_reading_questions)}>Console</Button>
    </View>
  );
}

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
  quizstyle: {
    lineHeight: 20,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 6,
    textAlign: 'center',
  },
  viewQuiz: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F0FFFF',
  },
});
