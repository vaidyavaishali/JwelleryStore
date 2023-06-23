import { useEffect, useState } from "react"
import CheckoutSteps from "./CheckoutSteps"
import { Helmet } from "react-helmet-async"
import { useContext } from "react"
import { Button, Form } from "react-bootstrap"
import { store } from "../Context/store"
import { useNavigate } from "react-router-dom"
const PaymentMethod = () => {
    const { state, dispatch: cxtDispatch } = useContext(store);
    const {cart : {shippingAddress, paymentMethod}} = state
    const navigate = useNavigate()
    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || "paypal")

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate("/shipping")
        }
    }, [shippingAddress, navigate])

    const SubmitData = (e) => {
        e.preventDefault();
        cxtDispatch({ type: "PAYMENT_METHOD", payload: paymentMethodName })
        localStorage.setItem("paymentMethod", paymentMethodName)
        navigate("/placeorder")
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <Helmet>
                <title>Payment Method</title>
            </Helmet>
            <h1 className="text-center mt-5">Payment Method</h1>
            <Form onSubmit={SubmitData}>
                <div className="mb-3 mt-5">
                    <Form.Check
                        type="radio"
                        id="paypal"
                        label="paypal"
                        value="Paypal"
                        style={{margin:" 0 50%"}}
                        
                        onChange={(e) => { setPaymentMethod(e.target.value) }} />
                      
                 
                </div>
                <div style={{margin:" 0 50%"}}>
                    <Button variant="primary" type="submit">Continue</Button>
                </div>
            </Form>
        </>
    )
}
export default PaymentMethod