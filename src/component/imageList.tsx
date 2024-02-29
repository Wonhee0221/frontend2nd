import '../imageList.css'
import { PhotoType } from './commonType/commonType';
function ImageList({images}:{images:PhotoType[]}) {
  return ( 
    <div className='image-grid'>{
      images.map((item:PhotoType)=>{
        return(
          <img className="img-thumbnail" src={item.thumbnailUrl} alt={item.title}style={{"width":"100px"}}/>
        )
    })
      }
    </div>
  )
}

export default ImageList;