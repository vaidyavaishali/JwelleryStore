import { useLocation, useNavigate } from "react-router-dom"
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"
import { Helmet } from "react-helmet-async";
import axios from "axios";
// import Toast from 'react-bootstrap/Toast';

import { useContext, useEffect, useState } from "react";
import { store } from "../Context/store";
import getError from "../utils";

const SignUpPage = () => {
    const [input, setInput] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    const { search } = useLocation();
    const navigate = useNavigate()
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const { state, dispatch: ctxDispatch } = useContext(store)
    const { userInfo } = state
    const submitHandler = async (e) => {
        e.preventDefault();
        if (input.password !== input.confirmPassword) {
            // alert("password is not matching")
           toast("Password is not Matching")
            return
        }
        try {
            const { data } = await axios.post("/api/users/signup", input)
            ctxDispatch({ type: "USER_SIGNIN", payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/');
        } catch (e) {
            toast.error(getError(e))
            // alert(getError(e))
            console.log(e)
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);

        }
    }, [navigate, redirect, userInfo])

    return (
        <Container className="small-container" style={{ "max-width": "500px" }}>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <h1 className="my-3">Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" required onChange={(e) => { setInput({ ...input, name: e.target.value }) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => { setInput({ ...input, email: e.target.value }) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => { setInput({ ...input, password: e.target.value }) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => { setInput({ ...input, confirmPassword: e.target.value }) }} />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Sign Up</Button>
                </div>
                <div className="mb-3">
                    Existing User? {' '}
                    <Link to={`/signin?redirect=${redirect}`}>Create An Account</Link>
                </div>
            </Form>
        </Container>
    )
}
export default SignUpPage