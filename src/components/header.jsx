import * as React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid'
import { Button, Box, Divider } from '@mui/material'
import logo from '../Assests/Imp/FinalLogo.png';
import axios from 'axios';

const useStyles = makeStyles({
    container: {
        backgroundColor: '#398378',
        padding: '30px',
        color: 'white'
    },
    Image: {
        width: '250px',
    },
    Beginbutton1: {
        marginTop: '24px',
        backgroundColor: 'black !important',
        color: 'white !important',
        textTransform: 'capitalize !important'
    },
    fixHeight: {
        height: '400px',
        overflowY: 'scroll'
    }
});

function Header() {
    const [data, setData] = useState([])
    const [send, setSend] = useState(0)
    const [sendMessage, setSendMessage] = useState('')

    const handleChange = (e) => {
        // console.log(e.target.value);
        setSendMessage(e.target.value);
    }
    const private_key = "991d211a-0d4b-4500-9d5c-8ba5dc13f694"    //very sensitive need to store in backend
    const projectId = "2b8b731d-add1-4a1d-82f6-4d33842a509a"      //very sensitive need to store in backend

    // post user need to do after login in backend Api
    const userData = {
        username: 'kavin1',
        first_name: 'kavin1',
        last_name: 'cs',
        secret: 'pass123'
    };

    const headers = {
        'PRIVATE-KEY': private_key
    };

    // post a new user 
    const postUser = () => {
        axios.post('https://api.chatengine.io/users/', userData, { headers })
            .then(response => {
                console.log('User created:', response.data);
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    }

    //get All user
    const getUser = () => {
        axios.get('https://api.chatengine.io/users/', { headers })
            .then(response => {
                console.log('User created:', response.data);
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    }

    // create Chat
    const createChat = () => {
        axios.put('https://api.chatengine.io/chats/', { "usernames": ["kavin", "kavin1"], "title": "kavin", "is_direct_chat": true },
            { headers: { "Project-ID": projectId, "User-Name": 'kavin', "User-Secret": "pass123" } }    //header's are very sensitive need to store in backendApi  
        )
            .then(response => {
                console.log('User created:', response.data);
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    }

    //send message to chat
    const sendChat = () => {
        axios.post('https://api.chatengine.io/chats/199632/messages/', { "text": sendMessage },
            { headers: { "Project-ID": projectId, "User-Name": 'kavin1', "User-Secret": "pass123" } }
        )
            .then(response => {
                console.log('User created:', response.data);
                setSend(send + 1);
                setSendMessage('')

            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    }

    //get a messgae to chat 
    useEffect(() => {
        // const getChat = () => {
        axios.get('https://api.chatengine.io/chats/199632/messages/',
            { headers: { "Project-ID": projectId, "User-Name": 'kavin', "User-Secret": "pass123" } }
        )
            .then(response => {
                // console.log('User created:', response.data);
                setData(response?.data);
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
        // }
    }, [])


    // console.log(data, "data");

    const classes = useStyles();
    return (
        <>

            {/* This thing will do after the login of portal moreever use in backend */}
            <Button className={classes.Beginbutton} onClick={postUser}>post user</Button> <br />
            <Button className={classes.Beginbutton} onClick={getUser}>get user</Button> <br />

            {/* Accepting the request  */}
            <Button className={classes.Beginbutton} onClick={createChat}>create a chat</Button> <br />

            {/* chat send message  */}


            {/* <Button className={classes.Beginbutton} onClick={getChat}> get chat</Button> <br /> */}

            <div className='container-fluid mt-4'>
                <Grid container spacing={2}>
                    <Grid item md={3}>
                       <div className='card p-4'>
                         <div>
                            multiple requests
                         </div>
                         <hr/>
                         <div>
                            Directed chats
                         </div>
                       </div>
                    </Grid>
                    <Grid item md={9}>
                        <div className='card p-4'>
                            <div className={classes.fixHeight}>
                                {data.map((item, index) => {
                                    return <div className='d-flex justify-content between' key={index}>
                                        {item?.sender_username === "kavin1" ?
                                            <div className='mt-4'>
                                                <p>{item.created}</p>
                                                <p className='fw-bold'>{item.text}</p >
                                            </div>
                                            : <div className='d-flex flex-column align-items-end w-100 mt-4' >
                                                <p>{item.created}</p>
                                                <p className='fw-bold'>{item.text}</p >
                                            </div>}
                                    </div>
                                })}
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1" className='fw-bold'>COMPOSE MESSAGE</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => handleChange(e)}></textarea>
                            </div>
                            <div className="d-flex flex-column align-items-end mt-3">
                                <Button variant='contained' className={classes.Beginbutton1} onClick={sendChat}> send chat</Button>
                            </div>

                        </div>
                    </Grid>
                </Grid>



            </div>
        </>
    )
}

export default Header