import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
// import './Items1'
import TableScrollbar from 'react-table-scrollbar';
import './Items.css'
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
function Items() {

    const companyGST = localStorage.getItem("userGST")
    const [loading, set_laoding] = useState(true)
    const [data, set_data] = useState([])
    const [filtered_data,set_filtered_data]=useState([])
    const [search_input,set_search_input]=useState("")
    const [init,set_init]=useState(false);

    useEffect(async () => {
        set_laoding(true)
        console.log("init",init)
        if(!init){
            const PORT = 4000
            const url = `http://localhost:${PORT}`
            await axios.post(`${url}/user/getItems`, {
                gstNo: companyGST,
            }).then((response) => {
                console.log(response.data)
                set_data(response.data)
                console.log(data,filtered_data)
                set_filtered_data(response.data)
                console.log(data,filtered_data)

                set_init(true)
                set_laoding(false)
            }).catch(() => {
                console.log('nnnn')

                set_laoding(false)
                alert("something went wrong")
            })
        }
        else{

            console.log(data)
            console.log(search_input)
            set_filtered_data(data?.filter((d)=>d.itemName.toLowerCase().includes(search_input.toLowerCase())))
            console.log(filtered_data)
            // set_data(filteredData)
            set_laoding(false)
        }
    


    }, [search_input])

    // if(search_input.length>0){
    //     data.filter((d)=>{
    //         data= d.itemName.match(search_input);
    //     })
    // }
    const handleDeleteItem = async (e,id) => {
        e.preventDefault()

        // console.log(id)
        // alert(id)
        // [req.body.gstNo,req.body.itemName,req.body.itemQty,req.body.pricePerQty,req.body.description],

        const PORT = 4000
        const url = `http://localhost:${PORT}`


        console.log(`${url}/user/deleteItem`)
          await axios.post(`${url}/user/deleteItem`,{
            gstNo:companyGST,
            itemID:id
          }).then((response)=>{
            console.log(response);
              if(response.data==="Item deleted"){
                  alert("deleted")
                window.location.reload()
              }else{
                alert(response.data.sqlMessage)

                  console.log(response)
                // alert(response)
                // window.location.reload()

              }
          })

    }
    const renderContent = (
        <div>
            <link rel="stylesheet" type="text/css" href="oders.css" />
            <h1>
                <span className="yellow">Items</span></h1>
            <div className="grid">
                <form action method="get" className="search">
                    <div className="form__field">
                        <input type="search" 
                        name="search" 
                        value={search_input} 
                        placeholder="Write Item Name" 
                        className="form__input" 
                        onChange={(text)=>{
                            set_search_input(text.target.value);
                }} />
                        {/* <input type="submit" defaultValue="Search" className="button" /> */}
                    </div>
                </form>
            </div>
            <nav role="navigation">



                <div id="menuToggle">
                    {/*
A fake / hidden checkbox is used as click reciever,
so you can use the :checked selector on it.
*/}
                    <input type="checkbox" />
                    {/*
Some spans to act as a hamburger.

They are acting like a real hamburger,
not that McDonalds stuff.
*/}
                    <span />
                    <span />
                    <span />
                    {/*
Too bad the menu has to be inside of the button
but hey, it's pure CSS magic.
*/}
                    <ul id="menu">
                        <a><li><Link to="/"> Home </Link></li></a>
                        <a><li><Link to="/user/addItem"> Add Item</Link></li></a>

                        {/* <a href="#"><li>Rename Item</li></a> */}
                        {/* <a><li><Link to="/user/addItem"> Add Item</Link></li>   </a> */}

                        {/* <a href="#"><li>Edit Item</li></a> */}
                    </ul>
                </div>
            </nav>
            <div className="frame" />
            <table className="container">
                <thead>
                    <tr>
                        <th><h1>SNo.</h1></th>
                        <th><h1>ID</h1></th>
                        <th><h1>Name</h1></th>
                        <th><h1>Quantity</h1></th>
                        <th><h1>Price</h1></th>
                        <th><h1>Description</h1></th>
                        {/* <th><h1>Buy / Sell</h1></th> */}
                        <th><h1>Delete </h1></th>
                    </tr>
                </thead>

                <tbody>
                    {filtered_data.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.itemName}</td>
                                <td>{item.itemQty} units</td>
                                <td>&#8377;{item.pricePerQty} </td>
                                <td>{item.description}</td>
                                <td><div className="table__button-group">
                                    {/* <input type="submit" className="button" value="Edit" onClick={e=>handleDeleteItem(e,item.id)}/> */}
                                    <input type="button" className="button"value="Delete" onClick={e=>handleDeleteItem(e,item.id)}/>
                                    {/* <a href="#">Edit</a> */}
                                    {/* <a href="#" onClick={handleDeleteItem(item.id)}>Delete</a> */}
                                </div>
                                </td>
                            </tr>)
                    })}

                </tbody>
            </table>
        </div>
    )


    return (
        <div>
            {loading ? <Loading /> : renderContent}
        </div>
    )
}

export default Items