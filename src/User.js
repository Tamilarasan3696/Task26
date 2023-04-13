import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBack';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Dashboard() {
    const [detail, setDetail] = useState([]);
    const getDetail = () => {
        axios.get("https://6437ab94894c9029e8c2db12.mockapi.io/users")
        .then((res)=>setDetail(res.data))
        .catch((err)=>console.log(err));
    }

    const navigate = useNavigate();

    useEffect(() => getDetail(), [])
    return (
        <div className='row' >

            
        <h1> <Tooltip title="Go Back" arrow><Button variant="contained" color="success" onClick={() => navigate(-1)}>
                <ArrowBackIosIcon />
            </Button></Tooltip>List of User </h1>


            <div class="col-md-12" style={{ justifyItems: 'center' }}>
                {detail.map((object, index) => (
                    <container>
                        <row>
                            <Card key={index} style={{ width: '18rem', display: 'inline-flex', marginLeft: '50px', marginTop: '50px' }}>
                                <Card.Img variant="top" src={object.poster} />
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Id  : {object.id}</ListGroup.Item>
                                    <ListGroup.Item>Name : {object.name}</ListGroup.Item>
                                   
                                    <ListGroup.Item>Email : {object.email}</ListGroup.Item>
                                   
                                    <ListGroup.Item>Contact : {object.contact}</ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    

                                    <Tooltip title="Edit" arrow><Button variant="success"><EditIcon onClick={() => navigate(`/user/edit/${object.id}`)} /></Button></Tooltip>&nbsp;&nbsp;

                                    <Tooltip title="delete" arrow><Button variant="danger" onClick={() => {
                                        axios.delete(`https://6437ab94894c9029e8c2db12.mockapi.io/users/${object.id}`)
                                            .then(() => getDetail());
                                    }}
                                    >
                                        <DeleteIcon /></Button></Tooltip>&nbsp;&nbsp;
                                </Card.Body>
                            </Card>
                        </row>
                    </container>
                ))}
            </div>
        </div>
    );
}
export default Dashboard;