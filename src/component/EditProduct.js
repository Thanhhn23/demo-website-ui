import React, { useState, useEffect } from "react";
import { getCookieValue } from "../function/cookie";
import '../Product.css'



function EditProduct({ id, closeModal }) {

    const token = getCookieValue('token');
    const [product, setProduct] = useState([]);

    const [name, setName] = useState('');
    const [currentPrice, setCurrentPrice] = useState(0);
    const [originalPrice, setOriginalPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [pageUrl, setPageUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const [isEditable, setIsEditable] = useState(false);



    function handleEditSave() {
        
        //console.log('Save');
        const id = product[0].id;
        const obj = {
            name: name,
            current_price: currentPrice,
            original_price: originalPrice,
            category: category,
            image_url: imageUrl,
            page_url: pageUrl,
            last_modified_date: new Date(Date.now())
        };

        fetch(`https://demo-website-api.vercel.app/api/v1/products/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: token,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSuccessMessage(true);
                closeModal();
            })
            .catch(e => {
                console.log(e);
                setErrorMessage(true);
            })
    }

    function handleFieldClick() {
        setIsEditable(true);
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeCurPrice(e) {
        setCurrentPrice(e.target.value);
    }

    function handleChangeOriPrice(e) {
        setOriginalPrice(e.target.value);
    }

    function handleChangeCategory(e) {
        setCategory(e.target.value);
    }

    function handleChangeImage(e) {
        setImageUrl(e.target.value);
    }

    function handleChangePage(e) {
        setPageUrl(e.target.value);
    }



    useEffect(() => {
        fetch(`https://demo-website-api.vercel.app/api/v1/products/${id}`, {
            method: 'GET',
            headers: {
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setName(data[0].name);
                setCurrentPrice(data[0].current_price);
                setOriginalPrice(data[0].original_price);
                setCategory(data[0].category);
                setImageUrl(data[0].image_url);
                setPageUrl(data[0].page_url);
                //console.log(data[0]);                

                window.web_event.track("product", "view", {
                    items:  [{type: "product" , main_category: "Test_Parent", brand: "LEVENTS" ,...data[0]}],
                    // dims: {
                    //     customers: {
                    //         customer_id: "201"
                    //     }
                    // },
                    extra: {
                        title: "sac du phong",                       
                        keywords: "wifi"
                    }
                })
                window.web_event.track("product", "add_to_cart", {
                    items:  [{type: "product" , main_category: "Test_Parent", brand: "LEVENTS" ,...data[0]}]                    
                })

                // window.web_event.track("lead_form", "submit", {
                //     items: [{
                //         type: "lead",
                //         id: "ID_123",
                //         name: "Thanh",
                //         showroom: "Ho Chi Minh",
                //         car_model: "Mercedes",
                //         phone: "0344795807",
                //         h_datetime: "2023-08-19 00:00:00",
                //         lead_time: "2023-08-19 00:00:00",
                //         coupon_label: "label",
                //         h_checkbox: ["Chất lượng sản phẩm", "Nhân viên bán hàng", "Nhân viên bán hàng không thân thiện|không nhiệt tình| Thái độ rất giống nhân viên ngân hàng nhà nước | Cần các bạn cải thiện nếu không sẽ mất khách "]
                //     }],
                //     dims: {},
                //     extra: {}
                // });
                // window.web_event.track("zoo", "process", {
                //     items:  [{}],
                //         dims: {"product":{parent_item_id : "1", ...data[0], comment:"chiều ngày 05/09 nhé. Có 3 vấn đề cần nói ở đây:\n- Thứ nhất: câu \"5 phân hay 1 chỉ đều giống nhau cả thôi\". \n- Thứ 2: hía NH? V phía bạn thì sao? \n- Thứ 3:ới. Nên nhìn nhận lại cái gọi là \"dich vu tot\"", comment_array_string: ["abc","123 \n def"]}},
                //         extra: {
                //             title: "sac du phong",                       
                //             keywords: "wifi"
                //         }
                // })

                // window.web_event.track("product", "purchase", {
                //     items: [{type: "product" , main_category: "Test_Parent", brand: "LEVENTS" ,...data[0]}],
                //     dims: {},
                //     extra: {revenue: data[0].current_price}
                // })

                
                /** start tracking event: thanh_test_new_event */
                    // window.web_event.track("motel", "booking", {
                    //     items: [{}],
                    //     dims: {},
                    //     extra: {}
                    // });
    /** end block */
  

                
            });
               

           

    }, [])

    return (
        <div className="edit-product-container">            
            {product && product.length > 0 ? (
                <div key={product[0].id}>
                    <div className="edit-product-id">Product ID: {product[0].id}</div>
                    <div>
                        <label className="edit-product-label">Name </label>
                        <input type="text" id="name" value={name} readOnly={!isEditable} onClick={handleFieldClick} onChange={handleChangeName} className="edit-product-input"/>
                    </div>
                    <div>
                        <label className="edit-product-label">Current Price </label>
                        <input type="number" id="current-price" value={currentPrice} readOnly={!isEditable} onClick={handleFieldClick} onChange={handleChangeCurPrice} className="edit-product-input"/>
                    </div>
                    <div>
                        <label className="edit-product-label">Original Price </label>
                        <input type="number" id="original_price" value={originalPrice} readOnly={!isEditable} onClick={handleFieldClick} onChange={handleChangeOriPrice} className="edit-product-input"/>
                    </div>
                    <div>
                        <label className="edit-product-label">Category </label>
                        <input type="text" id="category" value={category} readOnly={!isEditable} onClick={handleFieldClick} onChange={handleChangeCategory} className="edit-product-input"/>
                    </div>
                    <div>
                        <label className="edit-product-label">Image URL </label>
                        <input type="text" id="image_url" value={imageUrl} readOnly={!isEditable} onClick={handleFieldClick} onChange={handleChangeImage} className="edit-product-input"/>
                    </div>
                    <div>
                        <label className="edit-product-label">Page URL </label>
                        <input type="text" id="page_url" value={pageUrl} readOnly={!isEditable} onClick={handleFieldClick} onChange={handleChangePage} className="edit-product-input"/>           </div>

                    <button onClick={() => handleEditSave()} className="edit-product-message">Save</button>
                    <button onClick={() => closeModal()} className="edit-product-message">Close</button>
                    {successMessage && <p>Success</p>}
                    {errorMessage && <p>Invalid data. Please try again</p>}
                </div>

            ) : (
                <div>Loading...</div>
            )}
            
        </div>
        
    )
}

export default EditProduct;