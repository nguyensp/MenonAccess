import React, { useState, useEffect, useContext } from 'react';
import * as SQLite from 'expo-sqlite';
import NetInfo from '@react-native-community/netinfo';

const LibContext = React.createContext(undefined);

export const LibProvider = ({ children }) => {
    const [libraryData, setLibraryData] = useState([]);
    const [textData, setTextData] = useState([]);
    const [isTextLoading, setTextLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const [userList, setUserList] = useState([]);
    const [subCatalog, setSubCatalog] = useState([]);
    const blogPosts = [{title: 'Blog 1'}, {title: 'Blog 2'}];
    //const [blogPosts, setBlogPosts] = useState([]);

    const db = SQLite.openDatabase('fresh_one.db');

    //Substitue API calls
    //https://api.trivia.willfry.co.uk/questions?limit=7
    //https://jsonplaceholder.typicode.com/

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

  const createTables = () => {
    dataBaseCommand("CREATE TABLE IF NOT EXISTS subCatalog (id INTEGER PRIMARY KEY, name VARCHAR(20), grade_level INTEGER, genre VARCHAR(20))", [], "subCatalog created successfully", "error creating table: ");
    dataBaseCommand("CREATE TABLE IF NOT EXISTS subDownloads (id INTEGER PRIMARY KEY, name VARCHAR(20), grade_level INTEGER, genre VARCHAR(20))", [], "subDownloads created successfully", "error creating table: ");
  };

  const apiSubLibrary = async () => {
    try {
      fetch(
        'https://jsonplaceholder.typicode.com/todos',
      ).then( response => {
        return response.json();
      }).then( data => {
          setSubCatalog(data);
          /*
        const len = data.length;
        let start = 0;
        while (start < len) {
            let cId = Number(data.id);
            let cName = JSON.stringify(data.title);
            let cGrade = Number(data.userId);
            let genreString = JSON.stringify(data.completed);
            db.transaction(txn => {
                txn.executeSql(
                    `INSERT INTO catalog (id, name, grade_level, genres) VALUES(?, ?, ?, ?)`,
                    [cId, cName, cGrade, genreString],
                    (sqlTxn, res) => {
                        console.log(`${cName} inserted into Catalog`);
                    },
                    error => {
                        console.log(`error`);
                    },
                );
            }); 
          start++;
        }
        */
      })
    } catch (error) {
      console.error(error);
    } finally {
      //setLibraryLoading(false);
    }
  };

  /* CHAIN API and SQL Feature Code
  const createTables = () => {
    dataBaseCommand("CREATE TABLE IF NOT EXISTS catalog (id INTEGER PRIMARY KEY, name VARCHAR(20), grade_level INTEGER, genres VARCHAR(200))", [], "catalog created successfully", "error creating table: ");
    dataBaseCommand("CREATE TABLE IF NOT EXISTS downloads (id INTEGER PRIMARY KEY, name VARCHAR(20), grade_level, genres VARCHAR(200))", [], "downloads created successfully", "error creating table: ");
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
      setLibraryLoading(false);
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
            let cGrade = Number(data.grade_level);
            let genreString = JSON.stringify(data.genres);
            db.transaction(txn => {
              txn.executeSql(
                `INSERT INTO catalog (id, name, grade_level, genres) VALUES(?, ?, ?, ?)`,
                [cId, cName, cGrade, genreString],
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

  const getCategories = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM catalog',
        //'SELECT * FROM catalog WHERE grade_level = 9',
        [],
        (sqlTxn, res) => {
          console.log("getCategories called");
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, name: item.name, grade_level: item.grade_level, genres: item.genres});
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
  */

    

    
    /*
    const addBlogPost = () => {
        setBlogPosts([...blogPosts, { title: `Blog Post #${blogPosts.length + 1}` }]);
    };
    
    const downloadText = () => {
        setUserList([
            ...userList, { title:  }
        ])
    }
    useEffect(() => {
        apiSubLibrary(); 
    });
    */
    
    apiSubLibrary();
    return (
        
        <LibContext.Provider value={subCatalog}>
            {children}
        </LibContext.Provider>
    );
};


export default LibContext;