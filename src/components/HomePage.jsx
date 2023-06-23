import { useEffect, useReducer, useState } from "react"
// import data from "../data.js"
import Product from "./Product"
import axios from "axios"
import reducer from "../reducer"
import { Col, Container, Row } from "react-bootstrap"
import MessageBox from "./MessageBox"
import LoadingPage from "./LoadingPage"
import { Helmet } from "react-helmet-async"
const HomePage = () => {
    const [{ loading, error, product }, dispatch] = useReducer((reducer), {
        product: [],
        loading: true,
        error: ""
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            try {
                const result = await axios.get("/products")
                dispatch({ type: "FETCH_SUCCESS", payload: result.data })
            } catch (e) {
                dispatch({ type: "FETCH_FAIL", payload: e.message })
            }
        }
        fetchData();
    }, [])
    return (
        <div>
            <Helmet>
                <title>BLUESTONE Jwellers</title>
            </Helmet>
            <h2 style={{ marginTop: "2%" }}> <i>Featured Products</i> </h2>
            <div className="products">
                {loading ? <LoadingPage /> :
                    error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
                        <Row>
                            {product.map((product, i) => (
                                <Col sm={6} md={4} lg={3} key={i}>
                                    <Product product={product}></Product>
                                </Col>
                            ))}
                        </Row>
                    )}
            </div>


        </div>
    )
}
export default HomePage