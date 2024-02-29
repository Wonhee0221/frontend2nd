//logon.tsx
// 리듀서
// 컨텍스트 프로바이더

import { createContext, useReducer,Dispatch, useEffect } from 'react';
import { StateType, LogonAction } from './commonType/commonType';
import axios from 'axios';

// 기본값 전달 - 시작할때 전달
const initalState:StateType={userid:"",username:"",isLogon:false}

function LogonReducer(state:StateType, action:LogonAction):StateType{
  switch(action.type){ 

    case "LOGON":{
        let newState = {...state, userid:action.value.userid, 
          username:action.value.username,
          isLogon:true};
          saveStateToLocalStorage("appState",newState) 
          return newState;        
      }
    case "LOGOUT":{
      let newState = {...state, userid:"", 
        username:"",
        isLogon:false}; 
      saveStateToLocalStorage("appState",newState)
      return newState;
    }
    case "RESET":
      return initalState
    default:
      throw new Error("알수없는 에러") 
    }
}
const AppProvider = ({children}:{children:any})=>{
  const [state, dispatch] = useReducer(LogonReducer, initalState);
  return(
    <AppContext.Provider value= {{state,dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

const AppContext = createContext<{state:StateType, dispatch:Dispatch<LogonAction>}>(
  {
    state:initalState, dispatch:()=>null
  }
)

const saveStateToLocalStorage = (key:string, state:any)=>{
  localStorage.setItem(key,JSON.stringify(state)) 

}
const getStateFromLocalStorage = (key:string)=>{
  const savedState = localStorage.getItem(key);
  return savedState? JSON.parse(savedState):{};
}

export {AppContext,AppProvider, saveStateToLocalStorage, getStateFromLocalStorage} // 컨텍스트랑 컨텍스트 프로바이더내보내기
