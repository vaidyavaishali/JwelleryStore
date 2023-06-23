import { useLocation, useNavigate } from "react-router-dom"
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {toast} from "react-toastify"
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { store } from "../Context/store";
import getError from "../utils";

const SigninPage = () => {
    const [input, setInput] = useState({ email: "", password: "" })
    const { search } = useLocation();
    const navigate = useNavigate()
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const { state, dispatch: ctxDispatch } = useContext(store)
    const {userInfo} = state
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/users/signin", input)
            ctxDispatch({ type: "USER_SIGNIN", payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/');
        } catch (e) {
            toast.error(getError(e))
            // alert()
            console.log(e)
        }
    }

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);

        }
    }, [navigate, redirect, userInfo])

    return (
        <Container className="small-container" style={{ "max-width": "500px" }}>
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1 className="my-3">Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => { setInput({ ...input, email: e.target.value }) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => { setInput({ ...input, password: e.target.value }) }} />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Sign In</Button>
                </div>
                <div className="mb-3">
                    New User? {' '}
                    <Link to={`/signup?redirect=${redirect}`}>Create An Account</Link>
                </div>
            </Form>
        </Container>
    )
}
export default SigninPage