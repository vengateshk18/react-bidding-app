import Header from "./header";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
function CreateList(){
    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('token')==null){
          navigate("/login")
        }
      },[])
    const [Listdata,setListData]=useState({
        product:'',
        category:'',
        description:'',
        productimg:null,
        price:'',
        end_date:''
    })
    const handleChange=(e)=>{
        const { name, value, files } = e.target
        setListData(prevState=>({
            ...prevState,
            [name]:files?files[0]:value
        }))
    }
    const [result, setResult] = useState(null);

    return(
        <div>
           <Header/>
            <form action="" >
                <label htmlFor="">Product name</label>
                <input name="product" type="text"  value={Listdata.product} onChange={setListData}placeholder="Product" />
                <br />
                <label htmlFor="">category</label>
                <input name="category" type="text" value={Listdata.category} onChange={setListData} placeholder="Category"/>
                <br />
                <label htmlFor="">Image</label>
                <input type="file" name="profileimg" id="" value={Listdata.productimg} onChange={setListData}/>
                <br />
                <label htmlFor="">description</label>
                <textarea name="description"  cols="30" rows="10" value={Listdata.description} onChange={setListData}></textarea>
                <br />
                <label htmlFor="">Price</label>
                <input type="number" name="price" value={Listdata} onChange={setListData}/>
                <br />
                <label htmlFor="">End date</label>
                <input type="date" name="end-date" />
                <br />
                <button>Submit</button>
            </form>
        </div>
    )
}
export default CreateList;