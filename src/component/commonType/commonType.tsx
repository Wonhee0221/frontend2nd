// 상태 정보 타입.
// 꼭 타입마다 만드시 export 시키자 
export type StateType={
  userid:string;
  username:string;
  isLogon:boolean;

}

export type LogonAction=
  {type:"RESET", value:StateType}
  |{type:"LOGON", value:StateType}
  |{type:"LOGOUT", value:StateType}

export type ItemType={
    id:number; 
    userId:number;
    title:string; 
}

export type PhotoType={
  "albumId": number;
  "id": number;
  "title": string;
  "url": string;
  "thumbnailUrl": string;
}
