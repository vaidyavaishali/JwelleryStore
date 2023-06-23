import { Helmet } from "react-helmet-async";
import { store } from "../Context/store";
import { useContext } from "react";
import { Row, Col, ListGroup, ListGroupItem, Button, Card } from "react-bootstrap";
// import MessageBox from "./MessageBox";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
export const CardPage = () => {
    const navigate = useNavigate()
    const { state, dispatch: cxtDispatch } = useContext(store);
    const {
        cart: { cartItems },

    } = state

    const updateCardHandeler = async (item, quantity) => {
        const { data } = await axios.get(`/products/${item._id}`)
        if (data.countInStock < quantity) {
            toast.error('Sorry Product Out stock')
            return;
        }
        cxtDispatch({
            type: "CART_ADD_ITEM",
            payload: { ...item, quantity },
            // data.countInStock : data.countInStock-1

        })
    }
    const removeItem = (items) => {
        cxtDispatch({ type: 'CARD_REMOVE_ITEM', payload: items })
    }

    const checkout = () => {
        navigate("/signin?redirect=/shipping")
    }



    return (
        <div>
            <Helmet>
                <title>Shpping Card</title>
            </Helmet>
            <h1>Shpping Card</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        // <MessageBox>
                        <div>
                            Card is Empty

                            <Link to="/"> <Button variant="primary">Go to Shopping</Button> </Link>

                        </div>
                        // </MessageBox>
                    ) :
                        (
                            <ListGroup>
                                {cartItems.map((items) => (
                                    <ListGroup.Item>
                                        <Row className="align-items-center">
                                            <Col>
                                                <img src={items.image}
                                                    alt={items.name}
                                                    style={{ width: "100px" }}
                                                    className="img-fluid rounded img-thumbnail"
                                                />{' '}
                                                <Link to={`/products/unique_indentity/${items.unique_indentity}`}>{items.name}</Link>
                                            </Col>
                                            <Col md={3} >
                                                <Button variant="light" disabled={items.quantity === 1} onClick={() => updateCardHandeler(items, items.quantity - 1)}>
                                                    <i className="fas fa-minus-circle"></i>
                                                </Button>{" "}
                                                <span>{items.quantity}</span>
                                                <Button variant="light" disabled={items.quantity === items.countInStock} onClick={() => updateCardHandeler(items, items.quantity + 1)}>
                                                    <i className="fas fa-plus-circle"></i>
                                                </Button>
                                            </Col>
                                            <Col md={3}>${items.price}</Col>
                                            <Col md={2}>
                                                <Button variant="light" onClick={() => removeItem(items)}>
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                ))}
                            </ListGroup>
                        )
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        SubTotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} {" "} items :${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)})
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button type="button" variant="primary" disabled={cartItems.length === 0} onClick={checkout}>
                                            Proceed to Checkout</Button>

                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}
