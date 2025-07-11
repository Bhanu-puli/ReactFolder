import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiDeleteBin6Fill } from "react-icons/ri";
import Footer from "./footer";
import './FarmerProfilepage.css'
import soldlogo from '/soldlogo.png'
import FarmerLogo from '/farmer Bazaar Logo.jpeg';


export const FarmerProfilepage=()=>{
  const navigate = useNavigate();
  const location = useLocation();
  var Email = [location.state];
  Email=Email[0];
  console.log(Email)
  const [FarmerProfile, setFarmerProfile] = useState([]);
  const [SaleProdectData, setSaleProdectData] = useState([]);
  const [OrdertData, setOrdertData] = useState([]);
  useEffect(() => {
    const cards = document.querySelectorAll(".SaleItemObj");
    cards.forEach((card) => {
      VanillaTilt.init(card, {
        max: 2,
        speed: 400, 
      });
    });
  });
  useEffect(() => {
    console.log("FarmerData")
    axios.post("http://localhost:9000/FarmerData-Dispaly-display-api",[Email] )
        .then((res) => {
            console.log(res.data);
            setFarmerProfile(res.data);
        })
        .catch((err) => console.log(err))
    console.log("Sale information")
    axios.post("http://localhost:9000/Sale-information-display-api",[Email] )
        .then((res) => {
            console.log(res.data);
            setSaleProdectData(res.data);
        })
        .catch((err) => console.log(err))
    axios.post("http://localhost:9000/Order-Display-api",[Email] )
        .then((res) => {
            console.log(res.data);
            setOrdertData(res.data);
        })
        .catch((err) => console.log(err))
  },[]); 
  const SaleData=()=>{
    
  }
  console.log(SaleProdectData);

const ToSaleProdect =()=>{
  navigate("/FarmersellingProdect", { state: Email });
}



  return(
   <>
    <div className="loginHeader">
      <div className="loginHeaderImg" ><img src={FarmerLogo}/></div>
      <div  className="loginHeaderCont" >FARMER BAZAAR</div>
    </div>
    <div className="FarmerProfilepageHeading">
      <div>DETAILS OF THE FARMER</div>
      <div className="logoutbutton" onClick={()=>{navigate("/FarmerOnePage", { state:  "Register"  });}}>Logout</div>

      </div>

    <div className="FarmerDeatils">
      <div className="FarmerDeatilsOne">
        <div className="FarmerProfilePic"><img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"></img></div>
        <div className="FarmerProfileName">{FarmerProfile[0] && FarmerProfile[0].Name || "Name"}</div>
      </div>
      <div className="FarmerDeatilsTwo">
        <table className="FarmerDeatilsTable"><tbody>
            <tr><td className="FarmerDeatilsTableHead">PhoneNumber</td><td className="FarmerDeatilsTableData">{FarmerProfile[0] && FarmerProfile[0].PhoneNumber || "0"}</td></tr><br/>
            <tr><td className="FarmerDeatilsTableHead">Email</td><td className="FarmerDeatilsTableData">{FarmerProfile[0] && FarmerProfile[0].Email || "@.com"}</td></tr><br/>
            <tr><td className="FarmerDeatilsTableHead">Address</td><td className="FarmerDeatilsTableData">{FarmerProfile[0] && FarmerProfile[0].Address || "xxxx"}</td></tr><br/>
            <tr><td className="FarmerDeatilsTableHead">ProduceType</td><td className="FarmerDeatilsTableData">{FarmerProfile[0] && FarmerProfile[0].ProduceType || "xxxx"}</td></tr><br/>
            <tr><td className="FarmerDeatilsTableHead">Experience</td><td className="FarmerDeatilsTableData">{FarmerProfile[0] && FarmerProfile[0].Experience || "0"}Years</td></tr>
        </tbody></table>
      </div>
      <div className="FarmerDeatilsThree"><img className="FarmerProfileSafty" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYbXFxxrIap_cSd7yzJAMTHlHLUbtEXsUWqQ&s"></img></div>
    </div>

    <section className="VendibleSection">
      <div className="SaleHeading" onClick={SaleData}>Vendible</div>
      <div className="SaleItemsList">
        {
          SaleProdectData.map((saleItem)=>{
          if(!saleItem.Sold)
          return(
            <div key={saleItem.ProductId || 0} className="SaleItemObj">
            <div className="SaleItemImg"><img src={saleItem.ProductImage || ""} /></div>
              <div className="SaleItemDetilsName">{saleItem.ProductName || "Loading..."}</div>
              <div className="SaleItemDetilsPrize">₹{saleItem.ProductPrice || "Loading..."}/- PerKg</div>
            <div className="SaleItemTotalQuantity">{saleItem.ProductQuantity || "Loading..."}kg</div>
            <div className="SaleItemTotalCost">₹{saleItem.ProductTotal || "Loading..."}/-</div>
            {/* <div className="SaleItemRemove" onClick={()=>Deleteitem(UserName,cartItem.ProductId)}><RiDeleteBin6Fill/></div> */}
            </div>
          )
          })
        }
      </div>
      <div className="ButtonofAddSaleItem" onClick={ToSaleProdect}>ADD</div>
    </section>
<br/>
    <section  className="VendSection">
      <div  className="VendHeading">Vend</div>
      <div className="SaleItemsList pr">
        {
          SaleProdectData.map((saleItem)=>{
          if(saleItem.Sold)
          return(
            <div key={saleItem.ProductId || 0} className="SaleItemObj">
            <div className="SaleItemImg"><img src={saleItem.ProductImage || ""} /></div>
              <div className="SaleItemDetilsName">{saleItem.ProductName || "Loading..."}</div>
              <div className="SaleItemDetilsPrize">₹{saleItem.ProductPrice || "Loading..."}/- PerKg</div>
            <div className="SaleItemTotalQuantity">{saleItem.ProductQuantity || "Loading..."}kg</div>
            <div className="SaleItemTotalCost">₹{saleItem.ProductTotal || "Loading..."}/-</div>
            <div className="soldlogo"><img src={soldlogo} /></div>

            {/* <div className="SaleItemRemove" onClick={()=>Deleteitem(UserName,cartItem.ProductId)}><RiDeleteBin6Fill/></div> */}
            </div>
          )
          })
        }
      </div>
    </section>
    <br/>
    <section  className="VendSection">
      <div  className="VendHeading">Orders</div>
      <div className="SaleItemsList pr">
        {
          OrdertData.map((saleItem,index)=>{
          return(
            <div key={index} className="SaleItemObj">
             <div className="userDeatils">
              <div>{saleItem.FirstName}</div>
              <div>{saleItem.PhoneNumber}</div>
              <div>{saleItem.Address}</div>
             </div>
             <div className="ProdectData">
             <div>{saleItem.ProductName}</div>
             <div>₹{saleItem.ProductPrice}/- kg</div>

             {/* </div>
             <div className="ProdectData"> */}
             <div>{saleItem.ProductQuantity}kg</div>
             <div>Total = {saleItem.ProductTotal}/-</div>
             </div>
            {/* <div className="SaleItemRemove" onClick={}> {saleItem.Delivery ? "Delivery":"Done" }</div> */}
            <div className="DeliveryButn"> {saleItem.Delivery ? "Done":"Delivery"}</div>
            </div>
          )
          })
        }
      </div>
    </section>
    <br/>
    <Footer/>
   </>
  )
}