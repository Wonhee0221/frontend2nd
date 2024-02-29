//컨텍스트로 부터 사용자 id를 가져와서 화면에 목록을 뿌린다.
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, getStateFromLocalStorage } from './mycontext';
import axios from 'axios';
import { ItemType } from './commonType/commonType';

function AlbumList() {
    const [items, setItems] = useState<ItemType[]>([]);
    const [selectItem, setSelectItem] = useState<ItemType>({ id: -1, userId: 0, title: "" });
    const context = useContext(AppContext);  
    useEffect(() => {
      const controller = new AbortController();
      context.state = getStateFromLocalStorage("appState");
      let userid = context.state.userid;
      const url = "https://jsonplaceholder.typicode.com/albums?userId="+userid;
      axios.get(url, { signal: controller.signal })
        .then((res) => {
          setItems(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      return () => {
        console.log("마지막 정리작업을 하고 나간다 ");
        controller.abort();
      }
    }, []);
//  아이템 선택하는 경우
    const itemClick = (item: ItemType) => {
      setSelectItem({ ...item });
      console.log(item.id, "selected");
    }
// 상세보기 페이지로 넘어가기
    const navigate = useNavigate();
    const buttonClick = () => {
      navigate("/photo/list", {state: selectItem});
    }
    
    return (
      <div className='container mt-2' style={{ "marginTop": "50px" }}>
        <div>
          <h3>앨범목록 <button type='button' className="btn btn-outline-success"
            disabled={selectItem.id === -1 ? true : false}
            onClick={buttonClick}>앨범 상세보기</button></h3>
        </div>
        <ol className="list-group list-group-numbered">
          {items.map((item: ItemType, key: number) => (
            <li className="list-group-item"
              style={{
                "textAlign": "left",
                "backgroundColor": selectItem.id === item.id ? "lightgray" : "white"}}
              key={key}
              onClick={() => { itemClick(item) }}>
              {item.title}
              {selectItem.id === item.id && <span style={{ marginLeft: '5px' }}>&#10004;</span>}
            </li>
          ))}
        </ol>

      </div>
    );
  }
  
  export default AlbumList;
  
  