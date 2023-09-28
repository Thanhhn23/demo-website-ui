import React from "react";
import { useState, useEffect } from "react";
import ProductTable from "./ProductTable";
import AddProduct from "./AddProduct";
import FilterPrice, { filterPrice } from "./FilterPrice";
import Cart from "./Cart"
import '../App.css'
import { getCookieValue } from "../function/cookie";

function Home() {

  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const token = getCookieValue("token");
  const [showCart, setShowCart] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [fPrice, setFPrice] = useState('');
  const [tPrice, setTPrice] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);

  const customerId = localStorage.getItem('_cdp_cusid');



  function handleFilter(fromPrice, toPrice, page, limit) {
    
    const filterPriceProducts = filterPrice(fromPrice, toPrice, page, limit);
    filterPriceProducts.then(res => {
      const finalResult = JSON.stringify(res, null, 2)
      //console.log(typeof JSON.parse(finalResult))
      setProducts(JSON.parse(finalResult))
    })
  }

  const limitOptions = [10, 20, 50, 100];

  useEffect(() => {
    fetchData();
  }, [page, limit, loadingProduct]);


  const getTotalPages = (url) => {
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        //console.log(data)
        const totalPage = Math.ceil(data.length / limit)
        //console.log('total page :  ', totalPage)
        setTotalPage(totalPage -1)
      })
  }


  const fetchData = () => {
    let url = `https://demo-website-api.vercel.app/api/v1/products?page=${page}&limit=${limit}`
    let getPageUrl = `https://demo-website-api.vercel.app/api/v1/products`;
    if (searchQuery) {
      url += `&search=${searchQuery}`;
      getPageUrl += `?search=${searchQuery}`;
    }
    if (fPrice && tPrice){
      url += `&from_price=${fPrice}&to_price=${tPrice}`;
      getPageUrl += `?from_price=${fPrice}&to_price=${tPrice}`
    }
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        //console.log('data items ===============', data.length)
        setProducts(data)
        getTotalPages(getPageUrl);
        window.web_event.track("browsing", "product_search", {
          items: data,
          dims: {},
          extra: {src_search_term: searchQuery}
      })
      })
      .catch(e => {
        console.log('Error:', e)
      });
  };

  function handleLimitChange(e) {
    setLimit(e.target.value);
    setPage(1);
  };

  // function handlePageChange(e){
  //   setPage(e.target.value)
  // };


  function handlePreviousPage() {
    setPage(page - 1);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handleSearchQuery(e) {
    setSearchQuery(e.target.value);
  }

  function handleSearch() {
    fetchData()
    setPage(1)
  }

  function handleViewCart() {
    setShowCart(true);
  }

  function handleCloseCart() {
    setShowCart(false);

  }

  function handleClearSearch() {
    setSearchQuery("");
    setPage(1);
    fetchData();  
    setLoadingProductState();  
  }

  function setLoadingProductState(){
    setLoadingProduct((prev) => !prev)
  }

  function handleClearPrice() {
    setPage(1);
    setLoadingProductState();
    setFPrice('');
    setTPrice('');
  }

  function handleChangePrice(fromPrice, toPrice) {
    setFPrice(fromPrice);
    setTPrice(toPrice);
  }

  function handleShowAddProduct() {
    setShowAddProduct(true);
  }
function handleCloseAddProduct() {
  setShowAddProduct(false);
}


  return (
    <div>
      <h2 className="title">Product List</h2>
      <div className="search-zone">
      <span className="search-container">
        <label htmlFor="search-bar">Search: </label>
        <input type="text" id="search-bar" value={searchQuery} onChange={handleSearchQuery} />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClearSearch}>Clear</button>
      </span>
      <span>
        <FilterPrice handleFilter={handleFilter} page={page} limit={limit} handleClearPrice={handleClearPrice} handleChangePrice={handleChangePrice} />
      </span>
      <span className="page-navigation-container">
          <button onClick={handlePreviousPage} disabled={page === 1}>Prev</button>
          <span> Page {page} </span>
          <button onClick={handleNextPage} disabled={page === totalPage}>Next</button>
        </span>
      <span className="show-row-container">    
          <label htmlFor="show-row">Per page</label>      
          <select type="number" id="show-row" value={limit} onChange={handleLimitChange}>
            {limitOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          
        </span>
        </div>
        
      <div className="view-cart-container">
        <button><i className="fas fa-cart-plus" onClick={handleViewCart}></i></button>
        {showCart && <Cart showCart={showCart} closeCart={handleCloseCart} openCart={showCart}></Cart>}
      </div>
      <div className="add-product-container">
        <button  className="add-product-button" onClick={handleShowAddProduct}><i className="fas fa-octagon-plus"></i>Add a product</button>
        {showAddProduct && <AddProduct showAddProduct={showAddProduct} closeAddProduct={handleCloseAddProduct} openAddProduct={showAddProduct} setLoadingProductState={setLoadingProductState}></AddProduct>}
      </div>
      <div className="product-container">

        <div className="product-table">
          {products && products.length > 0 ? (
            <ProductTable products={products} setLoadingProductState={setLoadingProductState}></ProductTable>
          ):(
            <div>No result found</div>
          )}

<div>
      <antsomi-appinbox
             portalId="33167"
             destinationId="1350042"
             selector="body"
          />     
      </div> 
        </div>
     

      </div>
      
      

    </div>

  )
}

export default Home;