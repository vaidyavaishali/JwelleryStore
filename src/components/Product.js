import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { store } from "../Context/store";
import { useContext } from "react";
import Rating from "./Rating";
import {toast} from "react-toastify"
const Product = (props) => {
    const { product } = props;
    const { state, dispatch: cxtDispatch } = useContext(store);
    const {
        cart: { cartItems },} = state


    const addToCardHandeler = async (item) => {
        const existItems = cartItems.find((ele) => (ele._id) === product._id)
        const quantity = existItems ? existItems.quantity + 1 : 1
        const { data } = await axios.get(`/products/${item._id}`)
        if (data.countInStock < quantity) {
            toast('Sorry Product Out stock')
            return;
        }
        cxtDispatch({
            type: "CART_ADD_ITEM",
            payload: { ...item, quantity },

        })
    }

    return (
        <Card key={product.unique_indentity} className="product">
            <Link to={`/products/unique_indentity/${product.unique_indentity}`}>
                <img src={product.image} className="card-img-top" />
            </Link>
            <Card.Body>
                <Link to={`/products/unique_indentity/${product.unique_indentity}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <Card.Text>${product.price}</Card.Text>
                {/* <Button onClick={()=>addToCardHandeler(product)}>Add To Card</Button> */}
                {product.countInStock === 0  ? <Button variant="light" disabled>Out of Stock</Button> : 
                <Button onClick={()=>addToCardHandeler(product)}>Add To Card</Button>
                
                }

            </Card.Body>
        </Card >
    )
}
export default Product