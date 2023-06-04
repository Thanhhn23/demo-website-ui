import React from 'react';
import '../App.css'
import ProductDetail from './ProductDetail';


const ProductTable = ({ products }) => {

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductDetail key={product.id} product={product}></ProductDetail>
      ))}
    </div>
  )
};

export default ProductTable;
