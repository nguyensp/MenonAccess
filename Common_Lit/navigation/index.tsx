/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
 import { FontAwesome } from '@expo/vector-icons';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import * as React from 'react';
 import { ColorSchemeName, Pressable } from 'react-native';
 
 import Colors from '../constants/Colors';
 import LibContext from '../context/LibContext';
 import useColorScheme from '../hooks/useColorScheme';
 import FilterScreen from '../screens/FilterScreen';
 import TextScreen from '../screens/TextScreen';
 import CatalogScreen from '../screens/CatalogScreen';
 import DownloadScreen from '../screens/DownloadScreen';
 import QuizScreen from '../screens/QuizScreen';
 import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
 import LinkingConfiguration from './LinkingConfiguration';
 import { LibProvider } from '../context/LibContext';
 
 export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
   return (
     <LibProvider>
       <NavigationContainer
         linking={LinkingConfiguration}
         theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
         <RootNavigator />
       </NavigationContainer>
     </LibProvider>
   );
 }
 
 /**
  * A root stack navigator is often used for displaying modals on top of all other content.
  * https://reactnavigation.org/docs/modal
  */
 const Stack = createNativeStackNavigator<RootStackParamList>();
 
 function RootNavigator() {
   return (
     <Stack.Navigator>
       <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
       <Stack.Screen name="Text" component={TextScreen} options={({navigation}) => ({ 
        title: 'Text',
        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate('Quiz')}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}>
            <FontAwesome
              name="question"
              size={25}
              //color={Colors[colorScheme].text}
              style={{ marginRight: 15 }}
            />
          </Pressable>
        ),
       })} 
       />
       <Stack.Screen name="Quiz" component={QuizScreen} options={{title: 'Quiz'}}/>
       <Stack.Group screenOptions={{ presentation: 'modal' }}>
         <Stack.Screen name="Filter" component={FilterScreen} />
       </Stack.Group>
     </Stack.Navigator>
   );
 }
 
 /**
  * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
  * https://reactnavigation.org/docs/bottom-tab-navigator
  */
 const BottomTab = createBottomTabNavigator<RootTabParamList>();
 
 function BottomTabNavigator() {
   const colorScheme = useColorScheme();
 
   return (
     <BottomTab.Navigator
       initialRouteName="Catalog"
       screenOptions={{
         tabBarActiveTintColor: Colors[colorScheme].tint,
       }}>
       <BottomTab.Screen
         name="Catalog"
         component={CatalogScreen}
         options={({ navigation }: RootTabScreenProps<'Catalog'>) => ({
           title: 'Catalog',
           tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
           headerRight: () => (
             <Pressable
               onPress={() => navigation.navigate('Filter')}
               style={({ pressed }) => ({
                 opacity: pressed ? 0.5 : 1,
               })}>
               <FontAwesome
                 name="filter"
                 size={25}
                 color={"Colors[colorScheme].text"}
                 style={{ marginRight: 15 }}
               />
             </Pressable>
           ),
         })}
       />
       <BottomTab.Screen
         name="Download"
         component={DownloadScreen}
         options={({ navigation }: RootTabScreenProps<'Download'>) => ({
          title: 'Downloads',
          tabBarIcon: ({ color }) => <TabBarIcon name="download" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Text')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="book"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
       />
     </BottomTab.Navigator>
     
   );
 }
 
 /**
  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
  */
 function TabBarIcon(props: {
   name: React.ComponentProps<typeof FontAwesome>['name'];
   color: string;
 }) {
   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
 }
 