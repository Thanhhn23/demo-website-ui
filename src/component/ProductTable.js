import React from 'react';
import '../App.css'
import ProductDetail from './ProductDetail';


const ProductTable = ({ products, setLoadingProductState }) => {

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductDetail key={product.id} product={product}  setLoadingProductState={setLoadingProductState}></ProductDetail>
      ))}
    </div>
  )
};

export default ProductTable;
