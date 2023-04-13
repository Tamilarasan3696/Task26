import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";


export default function EditMember() {
    const { userid } = useParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get(`
        https://6437ab94894c9029e8c2db12.mockapi.io/users/${userid}`)
            .then((us) => { setUser(us.data) })
    });
    return user ? <EditUserForm user={user} setUser={setUser}/> : "Please wait........!!!"
}

function EditUserForm({ user}) {
    const [poster, setPoster] = useState(user.poster);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [contact, setContact] = useState(user.contact);

    const navigate = useNavigate();

    return (
        <div className="add-user-form" style={{ marginLeft: '50px', marginTop: '50px' }}>
            <h1 style={{ color: "green", fontWeight: 'bolder', fontFamily: 'cursive' }}>Edit and Save ✨</h1><br />
            <TextField
                label="image"
                variant="outlined"
                onChange={(event) => setPoster(event.target.value)}
                type="text"
                placeholder="Enter image url"
                value={poster}
                style={{ width: '800px' }}
            /><br /><br />
            <TextField
                label="Name"
                variant="outlined"
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Enter your name"
                value={name}
                style={{ width: '800px' }}
            /><br /><br />
           
            <TextField
                label="Email"
                variant="outlined"
                onChange={(event) => setEmail(event.target.value)}
                type="text"
                placeholder="Enter valid email"
                value={email}
                style={{ width: '800px' }}
            /><br /><br />
           
            <TextField
                label="Contact number"
                variant="outlined"
                onChange={(event) => setContact(event.target.value)}
                type="text"
                placeholder="Enter your Contact Number"
                value={contact}
                style={{ width: '800px' }}
            /><br /><br />
            <Button
                color="success"
                variant="contained"
                onClick={
                    () => {
                        const updatedUser = {
                            poster: poster,
                            name: name,
                            email: email,
                            contact: contact,
                        };
                        
                        fetch(` https://6437ab94894c9029e8c2db12.mockapi.io/users/${user.id}`, {
                            method: "PUT",
                            body: JSON.stringify(updatedUser),
                            headers: { "Content-Type": "application/json" },
                        })
                            .then((data)=>data.json())
                            .then(()=>navigate("/"));
                        }
                }
            >
            SAVE USER
        </Button>

    <Button color="success"
        variant="contained"
        onClick={() => { navigate(-1) }}
    >
        <ArrowBackIosIcon /> BACK
    </Button>
        </div >
    )
}
