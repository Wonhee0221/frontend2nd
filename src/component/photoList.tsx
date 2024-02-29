import { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext, getStateFromLocalStorage } from "./mycontext";
import axios from 'axios';
import { PhotoType } from './commonType/commonType';
import ImageList from './imageList';

function PhotoList() {
  let context = useContext(AppContext);
  let location = useLocation();
  let { id , title} = location.state;
  console.log(location.state)
  let [photoItems, setPhotoItems] = useState<PhotoType[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    context.state = getStateFromLocalStorage("appState");
    let url = "https://jsonplaceholder.typicode.com/photos?albumId="+id;
    axios.get(url, { signal: controller.signal })
      .then((res) => {
        setPhotoItems(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, []);
  const navigate = useNavigate();
  let backpage =()=>{
    navigate("/album/list",{state:context.state})
  }

  return (
    <div>
      <h3 style={{"textDecoration": "underline"}}>{title},{id}</h3>
      <ImageList images={photoItems}/>
      <div><button type="button" className="btn btn-success" onClick={backpage}>뒤로</button></div>
    </div>
  );
}

export default PhotoList;
