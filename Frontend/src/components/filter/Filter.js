import React, { useEffect,useState } from 'react'
import '../../styles/filter.css'
import Header from '../Common/Header'
import { useParams } from 'react-router-dom'

export default function Filter() {
    const {type}=useParams()
    const [restaurant,setRestaurant]=useState([])
    const [pageCount,setPageCount]=useState(0)
    const [currentPage,setCurrentPage]=useState(1)
    const [filter,setFilter]= useState({
        city_id:'',
        cuisine:[],
        lcost:'',
        hcost:'',
        sort: 1
    })

    console.log("fafadf",type)
    


    useEffect(()=>{
        fetch(`https://zomato-sk-edureka.herokuapp.com/restaurant/filter/${currentPage}`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(filter)
        }).then(response=>response.json())
        .then(data=>{setRestaurant(data.data);setPageCount((data.totalRecords)/2)})
    },[filter,currentPage])

   

    const handleLocation=(id)=>{    
        console.log(id)  
        filter.city_id=id;
        setFilter({...filter})
    }
    const handleSort=(sort)=>{
        filter.sort=sort;
        setFilter({...filter})
    }

    const handleCost=(lcost,hcost)=>{
        filter.lcost=lcost;
        filter.hcost=hcost;
        setFilter({...filter})
    }
    const handleCuisine=(e)=>{
       if(e.target.checked)
       filter.cuisine.push(e.target.name)
       else{
        let index=filter.cuisine.indexOf(e.target.name)
        if(index>-1 )
        filter.cuisine.splice(index,1)
       }
       setFilter({...filter})
    }
   

    const PaginationItems=[];
   
    for(let i=1;i<=pageCount;i++)
      PaginationItems[i]= <button className="next" key={i} onClick={()=>setCurrentPage(i)}>{i}</button>



  return (
    <div>

        <Header/>


         <div className="heading">{type} Places in Mumbai</div>
         <div className="filterBox">
             <p className="filter">Filters</p>
             <div className="filterHead">Select Location</div>
             <select name="location" id="options"  onChange={(e)=>handleLocation(e.target.value)}>              
                    <option className="optionStyle">Select Location</option>
                    <option value="1" className="optionStyle" >Delhi</option>
                    <option value="2" className="optionStyle" >Mumbai</option>
                    <option value="3" className="optionStyle" >Pune</option>
                    <option value="4" className="optionStyle" >Bangalore</option>
                    <option value="5" className="optionStyle" >Chandigarh</option>
                    <option value="6" className="optionStyle" >Chennai</option>                   
               </select>

        <div className="filterHead">Cuisine</div>
        <form className="filter-content">
            <input type="checkbox" name="North Indian" className="filter-cont" onChange={(e)=>handleCuisine(e)}/>
            <label for="Cuisine" className="labelStyle"> North Indian</label><br/>
            <input type="checkbox" name="South Indian" className="filter-cont"  onChange={(e)=>handleCuisine(e)}/>
            <label for="Cuisine" className="labelStyle"> South Indian</label><br/>
            <input type="checkbox" name="Chinese" className="filter-cont"  onChange={(e)=>handleCuisine(e)}/>
            <label for="Cuisine" className="labelStyle"> Chinese</label><br/>
            <input type="checkbox" name="Fast Food" className="filter-cont"  onChange={(e)=>handleCuisine(e)}/>
            <label for="Cuisine" className="labelStyle"> Fast Food</label><br/>
            <input type="checkbox" name="Street Food" className="filter-cont"  onChange={(e)=>handleCuisine(e)}/>
            <label for="Cuisine" className="labelStyle"> Street Food</label><br/>
        </form>

        <div className="filterHead">Cost For Two</div>

        <div className="filter-content">
            <input type="radio" className="filter-cont" name="cost" onChange={()=>handleCost(0,500)}/>
            <label for="cost" className="labelStyle"> Less than ` 500</label><br/>
            <input type="radio" className="filter-cont"  name="cost" onChange={()=>handleCost(500,1000)}/>
            <label for="cost" className="labelStyle"> ` 500 to ` 1000</label><br/>
            <input type="radio" className="filter-cont"  name="cost" onChange={()=>handleCost(1000,1500)}/>
            <label for="cost" className="labelStyle"> ` 1000 to ` 1500</label><br/>
            <input type="radio" className="filter-cont"  name="cost" onChange={()=>handleCost(1500,2000)}/>
            <label for="cost" className="labelStyle"> ` 1500 to ` 2000</label><br/>
            <input type="radio" className="filter-cont"  name="cost" onChange={()=>handleCost(2000,10000)}/>
            <label for="cost" className="labelStyle"> ` 2000+</label><br/>
        </div>
        <p className="filter">Sort</p>
        
        <div className="filter-content">
            <input type="radio" className="filter-cont" name="sort" checked={filter.sort==1} onChange={()=>handleSort(1)}/>
            <label for="sort"> Price low to high</label><br/>
            <input type="radio" className="filter-cont" name="sort" checked={filter.sort==-1} onChange={()=>handleSort(-1)}/>
            <label for="sort"> Price high to low</label><br/>
         </div>

         </div>
        
         <div style={{display: "inline-block", verticalAlign: "top"}}>
        {
            restaurant.length>0 ? restaurant.map((item,index)=>
                    <div className="item col-12 col-sm-12 col-md-8" key={index}>
                    <div style={{display: "inline-block"}}>
                        <img className="image1" src={item.thumb}/>
                    </div>
                    <div className="itemdesc">
                        <div className="t1">{item.name}</div>
                        <div className="t2">{item.locality}</div>
                        <div className="t3">{item.address}</div>
                    </div>
                    <hr/>
                    <div>
                        <table>
                            <tr style={{textAlign: "left"}}>
                                <th>CUISINES:</th>
                                <td>{item.Cuisine.length&& item.Cuisine.map(item=> item.name+". ")}</td>
                            </tr>
                            <tr>
                                <th>COST FOR TWO:</th>
                                <td>&#8377;{item.cost}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                ):  <div>No data</div>
        }
<div className="nextdiv">
    <button className="next " onClick={()=>{if(currentPage>1)setCurrentPage(currentPage-1)}}> &lt;&lt; </button>
    {PaginationItems}
    <button className="next"  onClick={()=>{if(currentPage<pageCount)setCurrentPage(currentPage+1)}}> &gt;&gt;</button>
</div>

 
    </div>
    

</div>





  )
}
