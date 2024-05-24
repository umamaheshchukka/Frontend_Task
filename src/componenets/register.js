import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function RegisterForm() {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [serverError, setServerError] = useState([])
    const [formErrors, setFormErrors] = useState({})
    const errors = {}
    const navigate = useNavigate()
    const validationErrors = () => {
        if (userName.trim().length == 0) {
            return errors.userName = 'enter valid userName'
        }
        if (email.trim().length == 0) {
            return errors.email = 'enter  valid email'
        }
        if (password.trim().length < 5) {
            return errors.password = 'password must be strong'
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            userName,
            email,
            password,
        }
        console.log(formData)
        validationErrors()
        if (Object.keys(errors).length == 0) {
            try {
                await axios.post("http://127.0.0.1:3069/api/user/register", formData)
                setUserName("")
                setEmail('')
                setPassword('')
                setServerError([])
                setFormErrors({})
                alert('succesfully registerd')
                navigate("/login")
            } catch (err) {
                console.log(err)
                setServerError(err.response?.data?.errors);
            }
        } else {
            setFormErrors(errors)
        }
    }
    return (
        <div>
            <h3>RegisterForm </h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Enter user name</label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => { setUserName(e.target.value) }}
                    id="name"
                />
                {formErrors.userName && <span style={{ color: 'red' }}>{formErrors.userName}</span>}<br />
                <label htmlFor="email">Enter email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    id="email" />
                {formErrors.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}<br />
                <label htmlFor="password">Enter password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    id="password"
                />
                {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}<br />
                {serverError.length > 0 && serverError.map((ele, i) => {
                    return <li key={i} style={{ color: "red" }}>{ele.msg}</li>
                })}
                <input type="submit" />
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    )
}