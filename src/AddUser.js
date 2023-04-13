import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import "yup-phone";

import axios from "axios";


const userValidationSchema = yup.object({
    poster: yup.string()
        .min(4, "Paste a valid url")
        .required("Image is mandatory "),
    name: yup.string()
        .min(2, "Please enter valid name")
        .required("Name is mandatory "),
   
    email: yup.string()
        .min(10, "Please enter valid email")
        .required("Email is mandatory "),
    
    contact: yup.string().phone("IN").required('Number is mandatory')
    
});

export default function AddMember({ detail, setDetail }) {
    const formik = useFormik({
        initialValues: {
            poster: "",
            name: "",
            email: "",
            contact: "",
            id:"",
        },
        validationSchema: userValidationSchema,
        onSubmit: (newUser) => {
            createUser(newUser);
        },
    });
    const navigate = useNavigate();

    const createUser = (newUser) => {
        console.log("createUser", newUser);
        axios.post("https://6437ab94894c9029e8c2db12.mockapi.io/users",(newUser))
        .then((res)=>{console.log(res.data)
        navigate('/')
        setDetail([...detail,newUser])
        })
        
    };
    return (
        <form onSubmit={formik.handleSubmit} style={{ marginLeft: '100px', marginTop: '50px' }} className="add-user-form">
            <h1 style={{ color: "green", fontWeight: 'bolder'}}>Fill the below details to add a Member</h1><br />
            <TextField
                id="poster"
                name="poster"
                label="Image"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.poster}
                style={{ width: '800px' }}
            /><br />
            {formik.touched.poster && formik.errors.poster ? formik.errors.poster : ""}
            <br />
            <TextField
                id="name"
                name="name"
                label="name"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                style={{ width: '800px' }}
            /><br />
            {formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""}
            <br />
        
            <TextField
                id="email"
                name="email"
                label="email"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                style={{ width: '800px' }}
            /><br />
            {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
          <br/>
            <TextField
                id="contact"
                name="contact"
                label="contact"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contact}
                style={{ width: '800px' }}
            /><br />
            {formik.touched.contact && formik.errors.contact
                ? formik.errors.contact
                : ""}
            <br />
            <TextField
                id="id"
                name="id"
                label="id"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.id}
                style={{ width: '800px' }}
            /><br />
            {formik.touched.id && formik.errors.id
                ? formik.errors.id
                : ""}
            <br />
            <Button
                type="submit"
                variant="contained"
                color="success"
                onClick={createUser}
            >
                Add New User
            </Button>

            
        </form>
    );
}