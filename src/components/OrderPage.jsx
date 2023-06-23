import { useContext, useEffect, useReducer } from "react"
import LoadingPage from "./LoadingPage"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import MessageBox from "./MessageBox"
import { useNavigate, useParams } from "react-router-dom";
import { store } from "../Context/store";
import getError from "../utils";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col, Card, ListGroupItem, Button } from "react-bootstrap";
import { toast } from "react-toastify";
// import { Button } from "bootstrap";
function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'PAYMENT_REQUEST':
            return { ...state, loadingPay: true };
        case 'PAYMENT_SUCCESS':
            return { ...state, loadingPay: false, successPay: true };
        case 'PAYMENT_FAILED':
            return { ...state, loadingPay: false };
        case 'PAYMENT_RESET':
            return { ...state, loadingPay: false, successPay: false };

        default:
            return state;
    }
}


const OrderPage = () => {
    const navigate = useNavigate()

    const params = useParams();
    const { id: orderId } = params;
    const { state } = useContext(store);
    const { cart } = state
    const { userInfo } = state
    const [{ loading, error, order, successPay, loadingPay }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: "",
        loadingPay: false,
        successPay: false
    })

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    function CreateNewOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: order.totalPrice },
                    },
                ],
            })
            .then((orderID) => {
                return orderID;
            });
    }

    const ApprovedOrder = (data, actions) => {
        return actions.order.capture().then(
            async (details) => {
                try {
                    dispatch({ type: 'PAYMENT_REQUEST' });
                    const { data } = await axios.put(`/api/orders/${order._id}/payment`,
                        details, {
                        headers: { authorization: `Bearer ${userInfo.token}` }
                    })
                    dispatch({ type: 'PAYMENT_SUCCESS', payload: data });
                    // alert("payment success")
                    toast("payment success")
                }
                catch (e) {
                    dispatch({ type: "PAYMENT_FAILED", payload: getError(e) });
                    toast.error(getError(e))
                    // alert(getError(e))
                }
            }
        )
    }

    const Error = (e) => {
        toast.error(e)
        // alert(e)
    }

    // const MakePayment = () => {
    //     if (order.isPaid === false) {

    //         alert("Are You Sure..!!")
    //        OrderPage.isPaid = true
    //        order.isPaid = true
    //     }
        // order.isPaid = false

    // }

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        if (!userInfo) {
            return navigate('/login')
        }
        if (!order._id || successPay || order._id && order._id !== orderId) {
            fetchOrder()
            if (successPay) {
                dispatch({ type: "PAYMENT_RESET" });
            }
        }
        else {
            const loadScript = async () => {
                const { data: clientId } = await axios.get('/api/keys/paypal', {
                    headers: { authorization: `Bearer ${userInfo.token}` },

                });
                paypalDispatch({ type: "RESET_OPTION", value: { 'paypal-client-id': clientId, currency: "USD" } })
                paypalDispatch({ type: "setLoadingStatus", value: "pending" })


            }
            loadScript()
        }
    }, [userInfo, navigate, order, orderId, paypalDispatch, successPay])


    return (
        <div>
            {loading ? <LoadingPage></LoadingPage> : error ?
                <MessageBox variant="danger">{error}</MessageBox> : (
                    <div>
                        <Helmet>
                            <title>Order Page</title>

                        </Helmet>
                        {/* <ListGroup></ListGroup> */}

                        <Row>
                            <Col md={8}>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>Shipping</Card.Title>
                                        <Card.Text>
                                            <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                            <strong>Address: </strong> {cart.shippingAddress.address},
                                            {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                                            {cart.shippingAddress.country}
                                        </Card.Text>
                                        {order.isDelivered ? (
                                            <MessageBox variant="success">
                                                Delivered at {order.deliveredAt}
                                            </MessageBox>
                                        ) : (
                                            <MessageBox variant="warning">Not Delivered</MessageBox>
                                        )}
                                        {/* <Link to="/shipping">Edit</Link> */}
                                    </Card.Body>
                                </Card>

                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>Payment</Card.Title>
                                        <Card.Text>
                                            <strong>Method:</strong> {cart.paymentMethod}
                                        </Card.Text>
                                        {OrderPage.isPaid ? (
                                            <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                                        ) : (<MessageBox variant="warning">Not Paid</MessageBox>
                                        )}

                                        {/* <Link to="/payment">Edit</Link> */}
                                    </Card.Body>
                                </Card>

                                <Card className="mb-3">

                                    <Card.Body>
                                        <Card.Title>Items</Card.Title>
                                        <ListGroup variant="flush">
                                            {order.orderItems.map((item) => (
                                                <ListGroup.Item key={item._id}>
                                                    <Row className="align-items-center">
                                                        <Col md={6}>
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="img-fluid rounded img-thumbnail"
                                                                width="100px"
                                                            ></img>{' '}
                                                            <Link to={`/product/${item.unique_indentity}`}>{item.name}</Link>
                                                        </Col>
                                                        <Col md={3}>
                                                            <span>{item.quantity}</span>
                                                        </Col>
                                                        <Col md={3}>${item.price}</Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>Order Summary</Card.Title>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Items</Col>
                                                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Shipping</Col>
                                                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Tax</Col>
                                                    <Col>${order.taxPrice.toFixed(2)}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        <strong>Order Total</strong>
                                                    </Col>

                                                    <Col>
                                                        <strong>${order.totalPrice.toFixed(2)}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {!order.isPaid && (
                                                <ListGroup.Item>
                                                    {isPending ? (<LoadingPage />) :
                                                        <div>

                                                            <div>
                                                                <PayPalButtons>
                                                                    CreateNewOrder= {CreateNewOrder}
                                                                    ApprovedOrder = {ApprovedOrder}
                                                                    Error = {Error}
                                                                </PayPalButtons>
                                                            </div>

                                                            {/* <div>
                                                                <Button className="primary" onclick={MakePayment()}>
                                                                    Make Payment
                                                                </Button>
                                                            </div> */}
                                                        </div>

                                                    }
                                                    {loadingPay && (<LoadingPage></LoadingPage>)}
                                                </ListGroup.Item>
                                            )}
                                        </ListGroup>

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                    </div>
                )
            }
        </div>
    )
}
export default OrderPage