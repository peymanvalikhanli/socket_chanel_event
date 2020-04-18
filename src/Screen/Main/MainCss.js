

const MainCss = {
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#ffff'
    },
    chatlistcartitem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    chatlistitem1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    totalnewchat: {
        alignSelf: 'center',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    containersend: {
  
        flexDirection:'row',
        marginTop: 10
    },

    fistusersend: {
        
        marginRight: 20,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        width: '95%',
        justifyContent: 'flex-end'

    },

    text1send: {
        minWidth: '30%',
        maxWidth: '80%',
        minHeight: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingRight: 5,
        paddingLeft: 5,

        marginRight: 5,
        fontSize: 14

    },
    containerreceve: {
        marginTop: 10,

    },


    fistuserreceve: {
        marginLeft: 10,
        flexDirection: 'row',
        width: '95%',



    },

    text1receve: {
        minWidth: '30%',
        maxWidth: '80%',
        fontFamily: 'B Nazanin',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 5,
        fontSize: 14

    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1
    },
    newchatprivateviewtotal: {
        // marginButton:Platform.OS==='ios'?10:5,
        borderWidth: 1,
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        flexDirection: 'row',
        width: '98%',
        backgroundColor: 'white',

    },
    footertouch: {
        width: Platform.OS === 'ios' ? 40 : 40,
        height: Platform.OS === 'ios' ? 40 : 40,
        borderRadius: 40, alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'deepskyblue'
    },
    footericon: {
        fontSize: 25,
        color: '#F5F5F5'
    },
    inputfooter: {
        borderRadius: 15,
        textAlign: 'left',
        paddingLeft: 20,
        fontSize: 15
    },
    modalstyle: {
        height: 200,
        marginTop: 50, width: "100%",
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalstyle2: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        backgroundColor: '#F5F5F5',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalstyle3: {
        width: '80%',
        height: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: "wrap",
    },
    modaltouch:{
        width: Platform.OS === 'ios' ? 55 : 55, 
        height: Platform.OS === 'ios' ? 55 : 55, 
        borderRadius: 55, justifyContent: 'center', 
        alignItems: 'center', backgroundColor: '#000dcf', 
        borderWidth: 1,
         borderColor: '#ccc' 
    },

    // task styles ===>
    color_gray:{
        color : "#8b9dc3",
    },

    color_primary:{
        color : "#3b5998",
    },

    icon_margin:{
        marginLeft: 10, 
    }, 

};


export default MainCss;
