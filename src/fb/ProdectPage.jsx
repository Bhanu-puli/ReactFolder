import {React, useEffect, useRef, useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import VanillaTilt from 'vanilla-tilt';
import axios from "axios";
import { SlList } from "react-icons/sl";
import "./ProdectPageCss.css"
// import styles from './filter.module.css'
 



export const Prodects_dispaly_Page=()=>{
  // const location = useLocation();
  // var UserName = [location.state];
  // console.log(UserName);

  const savedUser = localStorage.getItem("userData");
  var UserName =savedUser ? JSON.parse(savedUser) : null;

  const [filterApplyOnCategory,setfilterApplyOnCategory]=useState(false);
  const [filterApplyOnPrice,setfilterApplyOnPrice]=useState(false);
  const [ProdectItems,setProdectItems]=useState([]);
  const [AllProdectItems,setAllProdectItems]=useState([]);

  useEffect(() => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      VanillaTilt.init(card, {
        max: 4,
        speed: 400,
      });
    });
  });

  useEffect(()=>{
    axios.post("http://localhost:9000/Dispaly-Products-Deatil-api",[UserName])
     .then((res)=>{
      // console.log(res.data);
      setProdectItems(res.data);
      setAllProdectItems(res.data);
     })
     .catch((err)=>console.log(err))
   },[]);
  //  console.log(ProdectItems);

  const FilterOnCategory=(category)=>{
    const updatedItems = (filterApplyOnPrice?ProdectItems:AllProdectItems).filter((product) => {
      console.log("updatedItemsfun")
      return product.ProductCategory === category;
    });
    console.log("updatedItems",updatedItems);
    setProdectItems(updatedItems);
    setfilterApplyOnCategory(true);
  }
  const FilterOnPrice=(mincost,maxcost)=>{
    const updatedItems = (filterApplyOnCategory?ProdectItems:AllProdectItems).filter((product) => {
      console.log("updatedItemsfun")
      return product.ProductPrice >= mincost && product.ProductPrice <= maxcost;
    });
    console.log("updatedItems",updatedItems);
    setProdectItems(updatedItems);
    setfilterApplyOnPrice(true);
  }  
  const [selectedOptionCata, setSelectedOptionCata] = useState(null); // Initial null means no option is selected
  const handleChangeCata = (event) => {setSelectedOptionCata(event.target.value);};
  const [selectedOptionPrice, setSelectedOptionPrice] = useState(null); // Initial null means no option is selected
  const handleChangePrice = (event) => {setSelectedOptionPrice(event.target.value);};
  const RemoveFilter=()=>{
    setProdectItems(AllProdectItems);
    setSelectedOptionCata(null);
    setSelectedOptionPrice(null);
    setfilterApplyOnCategory(false);
    setfilterApplyOnPrice(false);
  }

  const AddProdectToCart=(product_id)=>{
    console.log("AddProdectToCart");
    if(UserName!=null){
    var data={"UserName":UserName, "ProductId":product_id};
    console.log(data);
    axios.post("http://localhost:9000/Cart-Prodect-Adding-api",data)
    .then((res)=>{console.log("res",res)})
    .catch((err)=>console.log(err))
    }
    const updatedItems = ProdectItems.map((product) => {
      if (product.ProductId === product_id) {
        return { ...product, ProductAddToCart: true }; // Spread operator to avoid mutation
      }
      return product;
    });
    console.log("updatedItems",updatedItems);
    setProdectItems(updatedItems);
    setAllProdectItems(updatedItems);

  }

  const ToRemoveProdectFromCart=(product_id)=>{
    if(UserName!=null){
    var data={"UserName":UserName, "ProductId":product_id};
    axios.post("http://localhost:9000/Cart-Prodect-Delete-api",data)
    .then((res)=>{console.log("res",res)})
    .catch((err)=>console.log(err))
    }
    const updatedItems = ProdectItems.map((product) => {
      if (product.ProductId === product_id) {
        return { ...product, ProductAddToCart: false }; // Spread operator to avoid mutation
      }
      return product;
    });
    console.log("updatedItems",updatedItems);
    setProdectItems(updatedItems);
    setAllProdectItems(updatedItems);
  }
  
  return(
    <main className="ProdectPage">
      <section className="FilterArea">
        <div className="FilterMainHeading">Search By Filter</div>
        <div className="FilterSideHeading">Categories:</div>
        <div className="FilterList">
        <input type='radio' className="radioButtons" value="option1" checked={selectedOptionCata === "option1"} onChange={handleChangeCata} onClick={()=>{FilterOnCategory("Vegetables")}} name='Categories'/><label className="labelText">Vegetables</label><br/>
        <input type='radio' className="radioButtons" value="option2" checked={selectedOptionCata === "option2"} onChange={handleChangeCata} onClick={()=>{FilterOnCategory("Leafyvegetables")}} name='Categories'/><label className="labelText">Leafyvegetables</label><br/>
        <input type='radio' className="radioButtons" value="option3" checked={selectedOptionCata === "option3"} onChange={handleChangeCata} onClick={()=>{FilterOnCategory("Grains")}} name='Categories'/><label className="labelText">Grains</label><br/>
        <input type='radio' className="radioButtons" value="option4" checked={selectedOptionCata === "option4"} onChange={handleChangeCata} onClick={()=>{FilterOnCategory("Legumes")}} name='Categories'/><label className="labelText">Legumes</label><br/>
        <input type='radio' className="radioButtons" value="option5" checked={selectedOptionCata === "option5"} onChange={handleChangeCata} onClick={()=>{FilterOnCategory("Nuts")}} name='Categories'/><label className="labelText">Nuts</label><br/>
        <input type='radio' className="radioButtons" value="option6" checked={selectedOptionCata === "option6"} onChange={handleChangeCata} onClick={()=>{FilterOnCategory("Fruits")}} name='Categories'/><label className="labelText">Fruits</label><br/>
        </div>
        <div className="FilterSideHeading">Select price:</div>
        <div className="FilterList">
        <input type='radio' className="radioButtons" value="option1" checked={selectedOptionPrice === "option1"} onChange={handleChangePrice} onClick={()=>{FilterOnPrice(0,50)}} name='Price'/><label className="labelText">Below 50</label><br/>
        <input type='radio' className="radioButtons" value="option2" checked={selectedOptionPrice === "option2"} onChange={handleChangePrice} onClick={()=>{FilterOnPrice(50,150)}} name='Price'/><label className="labelText">₹50 to ₹150</label><br/>
        <input type='radio' className="radioButtons" value="option3" checked={selectedOptionPrice === "option3"} onChange={handleChangePrice} onClick={()=>{FilterOnPrice(150,500)}} name='Price'/><label className="labelText">₹150 to ₹500</label><br/>
        <input type='radio' className="radioButtons" value="option4" checked={selectedOptionPrice === "option4"} onChange={handleChangePrice} onClick={()=>{FilterOnPrice(500,1000)}} name='Price'/><label className="labelText">₹500 to ₹1000</label><br/>
        <input type='radio' className="radioButtons" value="option5" checked={selectedOptionPrice === "option5"} onChange={handleChangePrice} onClick={()=>{FilterOnPrice(1000,5000)}} name='Price'/><label className="labelText">Above ₹1000</label><br/>
        </div>
        <div className="FilterRemove" onClick={RemoveFilter}>❌</div>
      </section>
      <section className="ProdectsDisplayArea">
      {ProdectItems.length>0?<>
     {
      ProdectItems.map((Prodect)=>{
        return(
          <div key={Prodect.ProductId} className="card" >
            {Prodect.ProductQuantity==1 ? <div className="OutofStockProdect"><p className="OutofStockProdectTextRorate">Out of Stock</p></div> :<></>}
            <div className="itemImg"><img src={Prodect.ProductImage} alt="https://i.pinimg.com/474x/47/ec/e9/47ece9d66364baa9c686c5ce5ff6299d.jpg"/></div>
           <div className="ItemDeatils">
            <div className="itemName">{Prodect.ProductName}</div>
            <div className="itemcost">₹{Prodect.ProductPrice}/- Per kg</div>
           </div>
           <div className="ItemDeatils2">
            <div className="Description">{Prodect.ProductDescription}</div>
           </div>
           <div className="Rx3d">
            <div id="dimension1" style={{transform: Prodect.ProductAddToCart ? 'rotateX(0deg)' : 'rotateX(-90deg)',bottom: Prodect.ProductAddToCart ? '0%' : '60%',}} onClick={()=>{ToRemoveProdectFromCart(Prodect.ProductId)}}>In Cart</div>
            <div id="dimension2" style={{transform: Prodect.ProductAddToCart ? 'rotateX(-90deg)' : 'rotateX(0deg)',top: Prodect.ProductAddToCart ? '60%' : '0%',}} onClick={()=>{AddProdectToCart(Prodect.ProductId)}}>Add to Cart</div>
           </div>
          </div>
        )
      })
     }</>:<div style={{fontSize:"30px",color:"red"}}>NO Items Found</div>}
     </section>
    </main>    
  )
}