import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

/*
GIT HISTORY SUBSTITUTE
This is old code using React-Native-Cli and Javascript 
prior to refactoring with Expo and Typescript with MVC Design Principles
It is included here as a reference for earlier development.
This current repository does not have previous commit history,
however, the following is an attempt to demonstrate,
previous development. Initial development learning started
as Monolithic Functional code is app.js before the refactor

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Header from './src/components/Header';
import { 
  CurrentRenderContext,
  NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { openDatabase } from 'react-native-sqlite-storage';
import { WebView } from 'react-native-webview';
import { TextInput } from 'react-native';
import {getParent} from 'domutils';
import { Platform } from 'react-native';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo'

const db = openDatabase({
  name: "commonlit_mobile_database"
});

export default App = () => {

  const [bookData, setBookData] = useState([]);
  const [bookString, setBookString] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isBookLoading, setBookLoading] = useState(true);
  const [isLibraryLoading, setLibraryLoading] = useState(true);
  const [libraryData, setLibraryData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const Stack = createNativeStackNavigator();
  const [userBookList, setUserBookList] = useState([]);
  const [userBookJSON, setUserBookJSON] = useState([]);
  //const [chosenJSON, setChosenJSON] = useState([]);

  const getNetInfo = () => {
    NetInfo.fetch().then((state) => {
      alert(
        `Connection type: ${state.type}
        Is connected?: ${state.isConnected}
        IP Address: ${state.details.ipAddress}`,
      );
    });
  };

  const getLibrary = async () => {
    try {
      const token =
      const response = await fetch(
        'https://www.commonlit.org/api/v1/raw_content/lesson_templates?token=' +
          token,
      );
      const json = await response.json();
      setLibraryData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLibraryLoading(false);
    }
  };

  const getBook = async (specifiedId) => {
    try {
      const token =
      const bookResponse = await fetch(
        'https://www.commonlit.org/api/v1/raw_content/lesson_templates/' +
          specifiedId +
          '?token=' +
          token,
      );
      const bookJson = await bookResponse.json();
      setBookData(bookJson);
      console.log("getBookAPI call Successful");
    } catch (error) {
      console.error(error);
    } finally {
      setBookLoading(false);
    }
  };
  const chainQueryUpdate = async () => {
    const token = 
    const fullTextUpdate = await fetch('https://www.commonlit.org/api/v1/raw_content/lesson_templates?token=' + token).then(res = res.json());
    fullTextUpdate.forEach(
      const specificText = await fetch(
        'https://www.commonlit.org/api/v1/raw_content/lesson_templates/' +
          fullTextUpdate.id +
          '?token=' +
          token,
      ).then(res = res.json());
      db.transaction(txn => {
        txn.executeSql(
          'INSERT INTO chain_library',
          [specificText.id, specific],
           (sqlTxn, res) => {
             console.log(`${bData.name} singlebookJSON added successfully`)
          },
          error => {
             console.log("error adding singbookJSON: " + error.message);
           },
        );
      })
    );
    )
  }
  
  const storeBook = (bData) => {
    if (!bData) {
      alert("bookData from API Call Needed");
      return false;
    }

    let jsonString = JSON.stringify(bData);
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO bookJSON (id, json) VALUES(?, ?)',
        [bData.id, jsonString],
         (sqlTxn, res) => {
           console.log(`${bData.name} singlebookJSON added successfully`)
        },
        error => {
           console.log("error adding singbookJSON: " + error.message);
         },
      );
    })
  }

  const dataBaseCommand = (command, variables, successLog, errorLog) => {
    db.transaction(txn => {
      txn.executeSql(
        `${command}`,
        [variables],
        (sqlTxn, res) => {
          console.log(`${successLog}`);
        },
        error => {
          console.log(`${errorLog}` + error.message);
        },
      );
    });
  }

  const createTables = () => {
    dataBaseCommand("CREATE TABLE IF NOT EXISTS cl_library (id INTEGER PRIMARY KEY, name VARCHAR(20))", [], "cl_library created successfully", "error creating table: ")
    dataBaseCommand("CREATE TABLE IF NOT EXISTS userBookList (id INTEGER PRIMARY KEY, name VARCHAR(20))", [], "userBookList created successfully", "error creating table: ")
    dataBaseCommand("CREATE TABLE IF NOT EXISTS bookJSON (id INTEGER PRIMARY KEY, json NVARCHAR(4000))", [], "bookJSON created successfully", "error creating table: ")
    //dataBaseCommand("CREATE TABLE IF NOT EXISTS chain_library (id INTEGER PRIMARY KEY, name VARCHAR(20), grade INTEGER, allegory INTEGER, autobiography INTEGER, biography INTEGER, drama INTEGER, essay INTEGER, fable INTEGER, fantasy INTEGER, fiction INTEGER, folktale INTEGER, historical_document INTEGER, historical_fiction INTEGER, informational_text INTEGER, interview INTEGER, legal_document INTEGER, letter INTEGER, literary_theory INTEGER, magical_realism INTEGER, memoir INTEGER, myth INTEGER, news INTEGER, non-fiction INTEGER, opinion INTEGER, parable INTEGER, philosophy INTEGER, poem INTEGER, political_theory INTEGER, primary_source_document INTEGER, psychology INTEGER, quotation INTEGER, religious_text INTEGER, satire INTEGER, science_fiction INTEGER, short_story INTEGER, skill_lesson INTEGER, speech INTEGER)", [], "cl_library created successfully", "error creating table: ")
  };

  /*
  const idToJSONFromBookJSONTable = (chosenId) => {
    console.log("idToJSON called");
    db.transaction(txn => {
      txn.executeSql(
        `SELECT json FROM bookJSON WHERE ${chosenId}`,
        [],
        (sqlTxn, res) => {
          console.log(`Getting JSON for: ${chosenId}`);
          let item = res.rows.item;
          let currentJSON = JSON.parse(item.json);
          setChosenJSON(currentJSON);
          console.log('JSON stored in ChosenJSON');
        },
        error => {
          console.log("idToJSON Error: " + error.message);
        },
      );
    });
  }
  
 
  const iterateThroughTable = (tableName) => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM ${tableName}`,
        [],
        (sqlTxn, res) => {
          console.log(`Iterating through: ${tableName}`);
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              console.log(item);
            }
          }
          console.log('Iteration Successful');
        },
        error => {
          console.log("iterateThroughTable Error: " + error.message);
        },
      );
    });
  }

  const populateLibrary = async () => {
    for (let i = 0; i < libraryData.length; i++) {
      let bookId = libraryData[i].id;
      let bookTitle = libraryData[i].name;
      db.transaction(txn => {
        txn.executeSql(
          'INSERT INTO cl_library (id, name) VALUES(?, ?)',
          [bookId, bookTitle],
          (sqlTxn, res) => {
            console.log(`${bookTitle} book added successfully`)
          },
          error => {
            console.log("error adding book " + error.message);
          },
        );
      })
    }
  }

  const addToUserBookList = () => {
    
    if (!category) {
      alert("Enter category");
      return false;
    }
    
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO userBookList (id, name) VALUES(?, ?)',
        [selectedId, category],
        (sqlTxn, res) => {
          console.log(`${category} book added successfully`)
          getUserBookList();
          setUserBookList("");
        },
        error => {
          console.log("error adding book " + error.message);
        },
      );
    });
  };

  const getCategories = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM cl_library ORDER BY id DESC',
        [],
        (sqlTxn, res) => {
          console.log("books retrieved successfully");
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, name: item.name});
            }
            setCategories(results);
          }
        },
        error => {
          console.log("error getting books " + error.message);
        },
      );
    });
  };

  const getUserBookList = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM userBookList ORDER BY id DESC',
        [],
        (sqlTxn, res) => {
          console.log("books retrieved successfully");
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, name: item.name});
            }
            setUserBookList(results);
          }
        },
        error => {
          console.log("error getting books " + error.message);
        },
      );
    });
  };

  const getUserBookJSON = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM bookJSON ORDER BY id DESC',
        [],
        (sqlTxn, res) => {
          console.log("json retrieved successfully");
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, json: item.json});
              console.log("getUserBookJSONCalled: "+item.json)
            }
            setUserBookJSON(results);
          }
        },
        error => {
          console.log("error getting json " + error.message);
        },
      );
    });
  };

  const clearTable = (tableName, screenName) => {
      db.transaction(txn => {
        txn.executeSql(
          `DELETE FROM ${tableName}`,
          [],
          () => {
            navigation.navigate(`${screenName}`)
          },
          error => {
            console.log(error)
          }
        )
      })
      getCategories();
  }

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
      </View>
    )
  }

  const renderJSON = ({ item }) => {
    console.log("Item.id,item.json: "+item.id+item.json);
    return (
      <View style={{
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#ddd",
      }}>
        <Text style={{ marginRight: 9 }}>{item.id}</Text>
        <Text>{item.json}</Text>
      </View>
    )
  }

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style = {[styles.item, backgroundColor]}>

      <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderLibrary = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id)
          setCategory(item.name)
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };


  function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, padding: 24 }}>
      <Header title="CommonLit" />
      <Button 
        title="Iterate Through Table"
        onPress={
          () => {
            iterateThroughTable("bookJSON");
          }
        } 
      />
      <Button 
        title="Refresh"
        onPress={
          () => {
            //Add Screen Refresh Feature
          }
        } 
      />
      <Button
          title="Get more detailed NetInfo"
          onPress={getNetInfo}
        />
      <Button 
        title="Call API"
        onPress={
          () => {
            getLibrary()
          }
        } 
      />
      <Button
        title="Go to Library"
        onPress={
          () => {
            navigation.navigate('Library')
            getLibrary()
          }
        }
      />
      <Button
        title="Populate Library"
        onPress={
          () => {
            populateLibrary()
          }
        }
      />
      <Button
        title="Delete CommonLit Library"
        onPress={
          () => {
            clearTable("cl_library", "Home")
          }
        }
      />
      
      <FlatList
        data={categories}
        renderItem={renderCategory}
        key={cat => cat.id}
      />
    </View>
    );
  }

  function LibraryScreen({navigation}) {
    return (
      <View style={{ flex: 1, padding: 24 }}>
      <Header title="Book List" />
      <Button
        title="Go To User Book List"
        onPress={
          () => {
            navigation.navigate('userList')
          }
        }
      />
      <StatusBar backgroundColor="orange" />
      <TextInput
        placeholder="Enter category"
        value={category}
        onChangeText={setCategory}
        style = {{ marginHorizontal: 8 }}
      />
      <Button title="Add to User Book List" onPress={addToUserBookList} />
      {isLibraryLoading ? <ActivityIndicator/> : (
        <FlatList
          data={categories}
          renderItem={renderLibrary}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      )}
      </View>
    );
  }

  function BookScreen({navigation}) {
    htmlData = bookData.html;
    console.log(htmlData);
    const contentWidth = useWindowDimensions().width * 2;
    const contentHeight = useWindowDimensions().height - 210;
    const styles = StyleSheet.create({
      container: {
        flex: 0,
        width: contentWidth,
        height: contentHeight,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: 'offwhite',
      },
    });
    return (
      <View>
        <Button title="Load Book" onPress={() => getBook(selectedId)} />
        <Button title="Store Book" onPress={() => storeBook(bookData)} />
        <Button
            title="Take Quiz"
            onPress={() => navigation.navigate('Quiz')}
          />
        {isBookLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView>
            <Text style={styles.baseText}>
              <Text style={styles.titleText}>
                {bookData.name}
                {'\n'}
                By: {bookData.author}
                {'\n'}
                {'\n'}
              </Text>
            </Text>
            <ScrollView horizontal>
              <View>
                <WebView style={styles.container} source={{html: htmlData}} />
              </View>
            </ScrollView>
          </ScrollView>
        )}
      </View>
    );
  }

  function QuizScreen({navigation}) {
    let quizOption = {
      flex: 1,
      padding: 20,
      backgroundColor: '#E4D6A7',
      borderRadius: 1,
      borderColor: 'black',
      borderWidth: 1,
      textAlign: 'center',
    };
    return (
      <View>
        {isBookLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView>
            <View style={{flex: 1, padding: 24}}>
              <Header title="Quiz" />
              <Button
                title="Take Quiz"
                onPress={() => {
                  navigation.navigate('Book');
                }}
              />
            </View>
            <View style={styles.viewQuiz}>
              <Text style={styles.quizstyle}>
                {'\n'}
                {bookData.guided_reading_questions[0].question}
              </Text>
            </View>
            <View>
              <Text style={quizOption}>
                {bookData.guided_reading_questions[0].answer_options[0].answer}
              </Text>
              <Text style={quizOption}>
                {bookData.guided_reading_questions[0].answer_options[1].answer}
              </Text>
              <Text style={quizOption}>
                {bookData.guided_reading_questions[0].answer_options[2].answer}
              </Text>
              <Text style={quizOption}>
                {bookData.guided_reading_questions[0].answer_options[3].answer}
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }

  function userListScreen({ navigation }) {
    return (
      <View>
        <Header title="User Book List" />
        <Button 
        title="Go To Book"
        onPress={
          () => {
            if (selectedId !== null) {
              navigation.navigate('Book')
            }
          }
        } 
      />
      <Text>{selectedId}</Text>
      
      <Button
        title="Display User List JSON Data"
        onPress={
          () => {
            getUserBookJSON()
          }
        }
        />
      
      <Button
        title="Delete User bookJSON Data"
        onPress={
          () => {
            clearTable("bookJSON", "userList")
          }
        }
        />

        <Button
        title="Delete User Book List"
        onPress={
          () => {
            clearTable("userBookList", "userList")
          }
        }
        />
        <FlatList
          data={userBookList}
          renderItem={renderLibrary}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />

        <FlatList
          data={userBookJSON}
          renderItem={renderJSON}
          key={cat => cat.id}
        />

      </View>
    )
  }

  
    TODO: 
      1. add function: if correct option chosen, css color change to green
                        else css color change to red.
  

  useEffect(() => {
    getLibrary();
    createTables();
    getCategories();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 15,
    },
    baseText: {
      fontFamily: 'Cochin',
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
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
      backgroundColor: '#6689A1',
    },
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Library" component={LibraryScreen} />
        <Stack.Screen name="Book" component={BookScreen} />
        <Stack.Screen name="userList" component={userListScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
*/