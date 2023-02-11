import { StyleSheet } from "react-native";
import theme from './color'

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
    editInput : {
        backgroundColor : "white",
        fontSize : 15,
        padding : "1.3%",
        width : "100%"
    },
    toDo : {
        backgroundColor : theme.toDoBG,
        borderRadius : 15,
        marginBottom : 10,
        paddingHorizontal : 20,
        paddingVertical : 20,
        flexDirection : "row",
        alignItems : "center",
        flex : 1,
        justifyContent : "space-between",
    },
    toDoText : {
        color : theme.white,
        fontSize : 15,
        fontWeight : "500",
        padding : "2%"
    },
    leftBox : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "flex-start",
        flex : 6
    },
    checkbox : {
        marginRight : "10%"
    },
    rightBox : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "flex-end",
        flex : 4
    },
    icons : {
        marginLeft : "12%"
    },
  });

  export default styles