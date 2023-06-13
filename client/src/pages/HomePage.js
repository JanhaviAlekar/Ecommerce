import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/layout'
import axios from "axios"
import { toast } from 'react-hot-toast'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/prices'
import { useNavigate } from 'react-router'
import { useCart } from '../context/cart'
const HomePage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loadmore, setLoadmore] = useState(false)

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal()
    }, [])
    // get all products
    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

    //lifecycvle method to get product at initial time
    useEffect(() => {
        getAllProducts();
    }, [])

    //get count
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total)
        } catch (error) {
            console.log(error);

        }
    };
    useEffect(() => {
        if (page === 1) return
        loadMore()
    }, [page])
    //load more
    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts([...products, ...data?.products])
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id)
        }
        else {
            all = all.filter(c => c._id === id);
        }
        setChecked(all)
    }
    useEffect(() => {
        if (!checked.length || !radio.length) getAllCategory(); //initial time
    }, [checked.length, radio.lenght]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio])

    const filterProduct = async () => {
        try {
            const { data } = await axios.post('/api/v1/product/product-filter', { checked, radio })
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout title={"SHOP EXCLUSIVELY"}>
            <div className='row mt-3'>
                <div className='col-md-3 text-center'>
                    <h4>Filter by category</h4>
                    <div className='d-flex flex-column'>
                        {categories?.map(c => (
                            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    {/* //price filter */}
                    <h4 className='mt-4'>Filter by Prices</h4>
                    <div className="d-flex align-items-start flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex  flex-column">
                        <button className="btn btn-danger ms-1" onClick={() => window.location.reload()}>
                            RESET FILTER </button>
                    </div>
                </div>
                <div className='col-md-9 text-center'>
                    <h1>All products</h1>
                    <div className='d-flex flex-wrap'>{
                        products?.map(p => (

                            <div className="d-flex justify-content-between">
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name}></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 30)}</p>
                                        <p className="card-text">{p.price}</p>
                                        <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)}>More details</button>
                                        <button
                                            className='btn btn-secondary ms-1'
                                            onClick={() => {
                                                setCart([...cart, p])
                                                localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                                toast.success('Item added to cart');
                                            }}
                                        >Add to cart</button>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                    </div>
                    <div className='m-2 p-3'>
                        {products && products.length < total && (
                            <button className='btn btn-warning'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1)
                                }}>
                                {loading ? "Loading..." : "Loadmore"}
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </Layout >
    )
}

export default HomePage