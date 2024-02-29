import { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./mycontext";
import axios from "axios";

function Logon() {
  let navigate = useNavigate();
  const [userid, setUserid] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  let context = useContext(AppContext)
  let onChange = (e:any)=>{
    setUserid(e.target.value);
  }
  let logon = ()=>{
    if (parseInt(userid)>=1 && parseInt(userid)<=10 ){
      const controller = new AbortController();
      console.log(userid)
      const hosturl = 'https://jsonplaceholder.typicode.com/users/'+userid;
      axios.get(hosturl)
      .then((res)=>{
        console.log(res.data) 
        let username = res.data.name
        context.dispatch({type:"LOGON", value:{userid:userid, username:username, isLogon:true}})
        navigate("/album/list", {})
        setMsg("로그인성공")
        })
        .catch((error)=>{
          console.log(error)
        })
        return () => {
          console.log("마지막 정리작업을 하고 나간다 ");
          controller.abort();
        }   
    }
    else{
      context.dispatch({type:"LOGON", value:{userid:"",username:"", isLogon:false}})
      setUserid("");
      (document.getElementById("userid") as HTMLInputElement)?.focus()
      setMsg("User ID는 1~10번만 가능합니다.")
    }
  }
  return ( 
    <div>
      <input type="text" id="userid" onChange={onChange} value={userid} placeholder="User ID" />&nbsp;&nbsp;
      <button type="button" className="btn btn-outline-success" onClick={logon} >로그온</button>
      <h3 style={{color:"red"}}> {msg} </h3>
    </div>
   );
}
export default Logon;