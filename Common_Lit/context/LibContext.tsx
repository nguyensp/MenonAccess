import React, { useState, useEffect, useContext } from 'react';
import * as SQLite from 'expo-sqlite';
import NetInfo from '@react-native-community/netinfo';

const LibContext = React.createContext(undefined);

export const LibProvider = ({ children }) => {
    const [libraryData, setLibraryData] = useState([]);
    const [textData, setTextData] = useState([]);
    const [isTextLoading, setTextLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [placeHolder, setPlaceHolder] = useState([]);
    const [downloads, setDownloads] = useState([]);

    const db = SQLite.openDatabase('fresh_one.db');

    const getNetInfo = () => {
        NetInfo.fetch().then(state => {
          alert(
            `Connection type: ${state.type}
            Is connected?: ${state.isConnected}
            IP Address: ${state.details.ipAddress}`,
          );
        });
      };
    

  const dataBaseCommand = (command : String, variables : Array<any>, successLog : String, errorLog : String) => {
    db.transaction(txn => {
      txn.executeSql(
        `${command}`,
        [variables],
        (sqlTxn, res) => {
          console.log(`${successLog}`);
        },
        error => {
          console.log(`${errorLog}`);
        },
      );
    });
  }
 
  //CHAIN API and SQL Feature Code
  const createTables = () => {
    dataBaseCommand("CREATE TABLE IF NOT EXISTS catalog (id INTEGER PRIMARY KEY, name VARCHAR(20), author VARCHAR(20), grade_level INTEGER, genres VARCHAR(200))", [], "catalog created successfully", "error creating table: ");
    dataBaseCommand("CREATE TABLE IF NOT EXISTS downloads (id INTEGER PRIMARY KEY, name VARCHAR(20), author VARCHAR(20), grade_level, genres VARCHAR(200))", [], "downloads created successfully", "error creating table: ");
    dataBaseCommand("CREATE TABLE IF NOT EXISTS textJSON (id INTEGER PRIMARY KEY, json NVARCHAR(4000))", [], "bookJSON created successfully", "error creating table: ");
  };

  const deleteTables = () => {
    dataBaseCommand("DELETE FROM catalog",[],"catalog delete from","catalog clear error");
    dataBaseCommand("DELETE FROM downloads",[],"downloads delete from","downloads clear error");
    dataBaseCommand("DELETE FROM textJSON",[],"textJSON delete from","bookJSON clear error");
  }

  const dropTables = () => {
    dataBaseCommand("DROP TABLE catalog",[],"catalog dropped","catalog clear error");
    dataBaseCommand("DROP TABLE downloads",[],"downloads dropped","downloads clear error");
    dataBaseCommand("DROP TABLE textJSON",[],"textJSON dropped","bookJSON clear error");
  }

  const getFromAPILibrary = async (value : String) => {
    try {
      const token = 
      fetch(
        'https://www.commonlit.org/api/v1/raw_content/lesson_templates?token=' + token,
      ).then( response => {
        return response.json();
      }).then( data => {
        const len = data.length;
        let start = 0;
        while (start < len 
          && getBookInfo(data[start].id, value)
          ) {
          start++;
        }
      })
    } catch (error) {
      console.error(error);
    } finally {
      //setLibraryLoading(false);
    }
  };

  const getBookInfo = async (specifiedId, value : String) => {
    let done: boolean = false;
    
    try {
      const token = 

      await fetch(
        'https://www.commonlit.org/api/v1/raw_content/lesson_templates/' +
          specifiedId +
          '?token=' +
          token,
      ).then( textResponse => {
        return textResponse.json();
      }).then( data => {
        switch(value) {
          case "id":
            console.log(data.id);
            break;
          case "name":
            console.log(data.name);
            break;
          case "author":
            console.log(data.author);
            break;
          case "html":
            console.log(data.html);
            break;
          case "student_intro":
            console.log(data.student_intro);
            break;
          case "permissions":
            console.log(data.permissions);
            break;
          case "grade_level":
            console.log(data.grade_level);
            break;
          case "genres":
            console.log(data.genres);
            break;
          case "image_url":
            console.log(data.image_url);
            break;
          case "image_link":
            console.log(data.image_link);
            break;
          case "image_title":
            console.log(data.image_title);
            break;
          case "image_author":
            console.log(data.image_author)
            break;
          case "license":
            console.log(data.license);
            break;
          case "guided_reading_questions":
            console.log(data.guided_reading_questions);
            break;
          case "APIToCatalog":
            let cId = Number(data.id);
            let cName = JSON.stringify(data.name);
            let cAuthor = JSON.stringify(data.author);
            let cGrade = Number(data.grade_level);
            let cGenreString = JSON.stringify(data.genres);
            db.transaction(txn => {
              txn.executeSql(
                `INSERT INTO catalog (id, name, author, grade_level, genres) VALUES(?, ?, ?, ?, ?)`,
                [cId, cName, cAuthor, cGrade, cGenreString],
                (sqlTxn, res) => {
                  console.log(`${cName} inserted into Catalog`);
                },
                error => {
                  console.log(`error`);
                },
              );
            });
            break;
          case "download":
            let jID = Number(data.id);
            let jsonString = JSON.stringify(data);
            db.transaction(txn => {
              txn.executeSql(
                `INSERT INTO textJSON (id, json) VALUES(?, ?)`,
                [jID, jsonString],
                (sqlTxn, res) => {
                  console.log(`${data.name} downloaded into textJSON`);
                },
                error => {
                  console.log(`error`);
                },
              );
            });
            break;
          case "add":
            let uId = Number(data.id);
            let uName = JSON.stringify(data.name);
            let uGrade = Number(data.grade_level);
            let uAuthor = JSON.stringify(data.author);
            let uGenreString = JSON.stringify(data.genres);
            let uJSON = JSON.stringify(data);
            db.transaction(txn => {
              txn.executeSql(
                `INSERT INTO downloads (id, name, author, grade_level, genres) VALUES(?, ?, ?, ?, ?)`,
                [uId, uName, uAuthor, uGrade, uGenreString],
                (sqlTxn, res) => {
                  console.log(`${uName} inserted into Download`);
                },
                error => {
                  console.log(`error`);
                },
              );
            });
            db.transaction(txn => {
              txn.executeSql(
                `INSERT INTO textJSON (id, json) VALUES(?, ?)`,
                [uId, uJSON],
                (sqlTxn, res) => {
                  console.log(`${uName} JSON Stored`);
                },
                error => {
                  console.log(`error`);
                },
              );
            });
            break;
          default:
            console.log("Default: Please specify key as a type String");
        }
      })
      return done = true;
    } catch (error) {
      return done = false;
      console.error(error);
    } finally {
      setTextLoading(false);
    }
  };

  const getCategories = (filter) => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM catalog ${filter}`,
        //'SELECT * FROM catalog WHERE grade_level = 9',
        [],
        (sqlTxn, res) => {
          console.log("getCategories called");
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, name: item.name, author: item.author, grade_level: item.grade_level, genres: item.genres});
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

  const getDownloads = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM downloads',
        //'SELECT * FROM catalog WHERE grade_level = 9',
        [],
        (sqlTxn, res) => {
          console.log("getDownloads called");
          let len = res.rows.length;

          if (len > 0) {
            let r = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              r.push({ id: item.id, name: item.name, author: item.author, grade_level: item.grade_level, genres: item.genres});
            }
            setDownloads(r);
          }
        },
        error => {
          console.log("error getting books " + error.message);
        },
      );
    });
  };

  const getDownloadJSONHTML = (chosenId) => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM textJSON WHERE id = ${chosenId}`,
        [],
        (sqlTxn, res) => {
          console.log("getDownloadJSON called");
          let objectData = JSON.parse(res.rows.item(0).json);
          //let derivedHTML = JSON.stringify(objectData.html);
          setTextData(objectData);
          console.log(textData);
        },
        error => {
          console.log("error getting textJSON " + error.message);
        },
      );
    });
  };
    
    useEffect(() => {
    });
    
    //getFromAPILibrary();
    return (
        <LibContext.Provider value={{data: placeHolder, downloads, categories, textData, getFromAPILibrary, 
          getBookInfo, createTables, deleteTables, dropTables,
          getNetInfo, getCategories, getDownloads, getDownloadJSONHTML
          }}>
            {children}
        </LibContext.Provider>
    );
};

export default LibContext;