// const { Helmet } = require("react-helmet-async")
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Button, Form } from "react-bootstrap"
import { useContext } from "react"
import { store } from "../Context/store"
import { useNavigate } from "react-router-dom"
import CheckoutSteps from "./CheckoutSteps"
const AddressPage = () => {
    const { state, dispatch: cxtDispatch } = useContext(store);
    const {userInfo,cart : {shippingAddress}} = state
    const navigate = useNavigate()
    const [shipping, setShippingData] = useState({ fullName: shippingAddress.fullName || "", address: shippingAddress.address || "", city: shippingAddress.city || "", postal_code:shippingAddress.postal_code|| "", country: shippingAddress.country || "" })

    useEffect(()=>{
        if(!userInfo){
            navigate("/signin");

        }
    },[userInfo, navigate])

    const SubmitData = (e) => {
        e.preventDefault();
        cxtDispatch({
            type: 'SHIPPING_ADDRESS',
            payload: {
                fullName: shipping.fullName,
                address: shipping.address,
                city: shipping.city,
                postal_code: shipping.postal_code,
                country: shipping.country,
            },
        })
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName: shipping.fullName,
                address: shipping.address,
                city: shipping.city,
                postal_code: shipping.postal_code,
                country: shipping.country,
            })
        );
        navigate('/payment');
    }
    return (
        <>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <h1 className="text-center">Shipping Address</h1>
            <Form onSubmit={SubmitData} className="small-container" style={{ width: "50%", margin: "auto" }}>
                <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control value={shipping.fullName} onChange={(e) => {
                        setShippingData({
                            ...shipping, fullName:
                                e.target.value
                        })
                    }}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control value={shipping.address} onChange={(e) => {
                        setShippingData({
                            ...shipping, address
                                : e.target.value
                        })
                    }}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control value={shipping.city} onChange={(e) => {
                        setShippingData({
                            ...shipping, city
                                : e.target.value
                        })
                    }}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control value={shipping.postal_code} onChange={(e) => {
                        setShippingData({
                            ...shipping, postal_code
                                : e.target.value
                        })
                    }}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control value={shipping.country} onChange={(e) => {
                        setShippingData({
                            ...shipping, country
                                : e.target.value
                        })
                    }}></Form.Control>
                </Form.Group>
                <div className="mb-3">
                    <Button variant="primary" type="submit">
                        Continue
                    </Button>
                </div>
            </Form>
        </>
    )
}
export default AddressPage