import { useNavigate, useParams } from "react-router-dom"
import reducer from "../reducer";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useReducer } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row, Card, Badge } from "react-bootstrap"
import Rating from "./Rating";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import getError from "../utils";
import MessageBox from "./MessageBox";
import LoadingPage from "./LoadingPage";
import { store } from "../Context/store";
import { toast } from "react-toastify";

const ProductPage = () => {
    const navigate = useNavigate()
    const params = useParams();
    const { unique_indentity } = params;
    const [{ loading, error, product }, dispatch] = useReducer((reducer), {
        product: [],
        loading: true,
        error: ""
    })
    // console.log(product)
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            try {
                const result = await axios.get(`/products/unique_indentity/${unique_indentity}`)
                dispatch({ type: "FETCH_SUCCESS", payload: result.data })

            } catch (error) {
                dispatch({ type: "FETCH_FAIL", payload: getError(error) })
            }
        }
        fetchData();
    }, [unique_indentity])

    const { state, dispatch: cxtDispatch } = useContext(store);
    const { cart } = state;
    const addToCard = async() => {
        const existItems = cart.cartItems.find((ele) => (ele._id) === product._id)
        const quantity = existItems ? existItems.quantity + 1 : 1
        const {data} = await axios.get(`/products/${product._id}`)
        if(data.countInStock < quantity){
         toast.error('Sorry Product Out stock')
            return;
        }
        cxtDispatch({
            type: "CART_ADD_ITEM",
            payload: { ...product, quantity },

        })
        navigate("/card")
    }

    return (
        <>
            {loading ? (<LoadingPage />) :
                error ? (<MessageBox>{error}</MessageBox>) : (
                    <div className="p-4">
                        <Row>
                            <Col md={6}>
                                <img src={product.image} alt={product.name} className="img-large" />
                            </Col>
                            <Col md={3}>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Helmet>
                                            <title>{product.name}</title>
                                        </Helmet>
                                        <h1>{product.name}</h1>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Rating rating={product.rating}
                                            numReviews={product.numReviews}
                                        />

                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <p>${product.price}</p>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <p>{product.description}</p>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>$ {product.price}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>{product.countInStock > 0 ?
                                                        <Badge bg="success">In Stock</Badge> :
                                                        <Badge bg="danger">Unavailable</Badge>
                                                    }</Col>
                                                </Row>

                                            </ListGroup.Item>
                                            {
                                                product.countInStock > 0 && (
                                                    <ListGroup.Item>
                                                        <div className="d-grid">
                                                            <Button variant="primary" onClick={addToCard}>Add To card</Button>
                                                        </div>
                                                    </ListGroup.Item>
                                                )
                                            }

                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>

                        </Row>

                    </div>
                )}
        </>
    )
}
export default ProductPage