import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [serverError, setServerError] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const navigate = useNavigate()

  const validationErrors = () => {
    const errors = {}
    if (email.trim().length === 0) {
      errors.email = 'Enter a valid email'
    }
    if (password.trim().length < 5) {
      errors.password = 'Enter a valid password'
    }
    return errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      email,
      password
    };
    const errors = validationErrors()
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3069/Api/user/login', formData)
        const token = response.data.token
        localStorage.setItem('token', token)
        setFormErrors({})
        setEmail("")
        setPassword("")
        setServerError('')
        alert('Login successfully')
        navigate("/chart")
      } catch (err) {
        console.log(err)
        setServerError(err.response?.data?.error)
      }
    } else {
      setFormErrors(errors)
    }
  };

  return (
    <div>
      <h3>Login Form</h3>
      <form onSubmit={handleSubmit}>
        <label>Enter email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => { setEmail(e.target.value); }}
        />
        {formErrors.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}
        <br />
        <label>Enter password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); }}
        />
        {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
        <br />
        {serverError &&<p style={{ color: "red" }}>{serverError}</p>}
        <input
          type="submit"
        />
      </form>
    </div>
  );
}
