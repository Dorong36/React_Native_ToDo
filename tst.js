import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, View, 
  TouchableOpacity, 
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from './color'
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

const STORAGE_KEY = "@toDos";
const CATEGORY_KEY = "@Category"

export default function App() {

  const [working, setWorking] = useState(true);
  const [isChecked, setChecked] = useState(false);

  // 마지막 카테고리 저장
  const saveLastCategory = async (working) => {
    try {
      await AsyncStorage.setItem(CATEGORY_KEY, working.toString())
    }catch (e) {
      console.log(e)
    }
  }
  // 마지막 카테고리 로드 및 state 저장
  const loadLastCategory = async () => {
    try {
      const lastCategory = await AsyncStorage.getItem(CATEGORY_KEY);
      if(JSON.parse(lastCategory)) {
        setWorking(true)
      }else {
        setWorking(false)
      }
    } catch (e) {
      console.log(e)
    }
  }
  // 실행시 마지막 카테고리 로드 함수 실행
  useEffect(()=>{
    loadLastCategory();
  },[])

  // travel, work 터치 시 동작 함수
  // 터치 시 마다 AsyncStroage에 상태 저장 함수 호출
  const travel = () => {
    if(working == true) {
      saveLastCategory(false)
    }
    setWorking(false);
  }
  const work = () => {
    if(working == false){
      saveLastCategory(true)
    }
    setWorking(true);
  }

  // 텍스트 value 설정
  const [text, setText] = useState("")
  const onChangeText = (payload) => {setText(payload)}


  // 스토리지에 할일 저장하기
  const saveToDos = async (toSave) =>{
    try {
      // setItem은 Pomise 반환 => 앞에 await 붙여주고 함수에 async 붙여주기
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))       
    }catch (e) {
      console.log(e)
    }

  }

  // 스토리지에서 불러오기
  const loadToDos = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY)
      if(s){
        const loadedObj = JSON.parse(s);
        setToDos(loadedObj);
      }

    }catch (e) {
      console.log(e)
    }
  }
  // 처음 실행시 불러오는 함수 실행
  useEffect(()=>{
    loadToDos();
  }, [])

const [toDos, setToDos] = useState({});
const addToDo = async () => {
  if(text === ""){
    return
  }
  // const newToDos = Object.assign({}, toDos, {[Date.now()] : {text : text, work : working}})
  const newToDos = {...toDos, [Date.now()] : {text : text, working : working, checked : false}}
  setToDos(newToDos);
  await saveToDos(newToDos);
  setText("") 
}

const deleteToDo = (key) => {
  Alert.alert("삭제하시겠습니까?", "진짜루?", [
    {text : "Cancel"},
    {
      text : "Delete", 
      style : "destructive",
      onPress : async () => {
        const newToDos = {...toDos};
        delete newToDos[key];
        setToDos(newToDos);
        await saveToDos(newToDos);
        }
      }
  ]);
  return
}

const checkThis = async (key) => {
  const chkToDos = {...toDos};
  chkToDos[key].checked = !chkToDos[key].checked;
  setToDos(chkToDos);
  await saveToDos(chkToDos);
}




  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.5} onPress={work}>
          <Text style={{...styles.btnText, color : working ? 'white' : theme.grey}}>Work</Text>
        </TouchableOpacity>
        {/* <TouchableHighlight 
          onPress={()=>{console.log("pressed")}} 
          underlayColor="#DDDDDD"
          activeOpacity={0.3}
        >
          <Text style={styles.btnText}>Travel</Text>
        </TouchableHighlight> */}
        <TouchableOpacity activeOpacity={0.5} onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? 'white' : theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput 
          style={styles.input}
          placeholder={working ? "Add a To Do" : "Where do you wanna go?"}
          keyboardType="default"
          returnKeyType="done"
          onChangeText={onChangeText}
          value={text}
          onSubmitEditing={addToDo}
        ></TextInput>
      </View>
      <ScrollView>
        {
          Object.keys(toDos).map( (key) => {
            return (
              toDos[key].working === working ? (
                <View key={key} style={styles.toDo}>
                  <View style={styles.leftBox}>
                    <Checkbox
                      style={styles.checkbox}
                      // value={toDos[key].checked}
                      // onValueChange={checkThis(key)}
                      // color={toDos[key].checked ? '#4630EB' : undefined}
                      value={isChecked}
                      onValueChange={setChecked}
                      color={toDos[key].checked ? '#4630EB' : undefined}
                    />
                    <Text style={styles.toDoText}>{toDos[key].text}</Text>
                  </View>
                  
                  <TouchableOpacity onPress={() => {deleteToDo(key)}}>
                    <AntDesign name="delete" size={18} color="lightgrey" />
                  </TouchableOpacity> 
                </View>
              ) : null
            )
          })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal : 20,
  },
  header:{
    flexDirection : "row",
    marginTop:100,
    justifyContent : 'space-around'
  },
  btnText : {
    fontSize : 40,
    fontWeight: "600"
  },
  input : {
    backgroundColor : 'white',
    paddingVertical : 15,
    paddingHorizontal : 20,
    borderRadius : 30,
    marginTop : 20,
    marginBottom : 20,
    fontSize : 15
  },
  toDo : {
    backgroundColor : theme.toDoBG,
    borderRadius : 15,
    marginBottom : 10,
    paddingHorizontal : 20,
    paddingVertical : 20,
    flexDirection : "row",
    alignItems : "center",
    justifyContent : "space-between",
  },
  toDoText : {
    color : 'white',
    fontSize : 15,
    fontWeight : "500",
    paddingHorizontal : "5%"
  },
  leftBox : {
    flexDirection : "row",
    alignItems : "center",
    justifyContent : "flex-start",
  },
  checkbox: {
    margin: 8,
  },
});
