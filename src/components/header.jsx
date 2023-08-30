import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid'
import { Button, Box, Divider, CircularProgress } from '@mui/material'
import logo from '../Assests/Imp/FinalLogo.png';
import axios from 'axios';
import { People } from '@mui/icons-material';
import Person from './person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
        // backgroundColor: 'black !important',
        // color: 'white !important',
        textTransform: 'capitalize !important'
    },
    fixHeight: {
        height: '350px',
        overflowY: 'scroll'
    }
});

function Header() {
    const [data, setData] = useState()
    const [send, setSend] = useState(0)
    const [sendMessage, setSendMessage] = useState('');
    const [chatPerson, setChatPerson] = useState([]);
    const [disabledSend, setDisableSend] = useState(false);
    const [childData, setChildData] = useState();
    const [apiReload, setApiReload] = useState(false)
    const [update, setUpdate] = useState(false);
    const [messageId, setMessageId] = useState('')
    const messagesEndRef = useRef(null);



    const handleChildData = (data) => {
        setChildData(data);
    };

    const handleChange = (e) => {
        // console.log(e.target.value);
        setSendMessage(e.target.value);
    }
    const private_key = "991d211a-0d4b-4500-9d5c-8ba5dc13f694"    //very sensitive need to store in backend
    const projectId = "2b8b731d-add1-4a1d-82f6-4d33842a509a"      //very sensitive need to store in backend

    //credentials this will come from Api 

    const credentials = {
        UserName: "bhava",
        password: "pass123"
    }

    //Requests will equal to the username from chat engine simply by using user u will create chat conversation

    const requests = ["bhava", "vishnu", "varun"]

    // post a new user 
    const userData = {
        username: 'vishnu',
        first_name: 'bhava',
        // last_name: 'T',
        secret: 'pass123'
    };
    const headers = {
        'PRIVATE-KEY': private_key  //project private very much sensitive
    };
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
    const createChat = (user) => {
        axios.put('https://api.chatengine.io/chats/', { "usernames": [credentials.UserName, user], "title": "conversation", "is_direct_chat": true },
            { headers: { "Project-ID": projectId, "User-Name": credentials.UserName, "User-Secret": credentials.password } }    //header's are very sensitive need to store in backendApi  
        )
            .then(response => {
                console.log('chat created:', response.data);
                alert("created now you can chat with requested user")
                //here chat id will created
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    }
    const getChat = () => {
        axios.get('https://api.chatengine.io/chats/',
            { headers: { "Project-ID": projectId, "User-Name": credentials.UserName, "User-Secret": credentials.password } }    //header's are very sensitive need to store in backendApi  
        )
            .then(response => {
                console.log('get chat :', response.data);
                setChatPerson(response.data);
                requests.splice(0, 1)
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    }

    //send message to chat
    const sendChat = () => {
        setDisableSend(true)
        axios.post(`https://api.chatengine.io/chats/${childData}/messages/`, { "text": sendMessage },
            { headers: { "Project-ID": projectId, "User-Name": credentials.UserName, "User-Secret": credentials.password } }
        )
            .then(response => {
                console.log('User created:', response.data);
                setSend(send + 1);
                setSendMessage('');
                setDisableSend(false)
                setApiReload(true);
                setApiReload(false)
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    }

    const editMessage = (messageDetails) => {
        const message_id = messageDetails?.id;
        axios.get(`https://api.chatengine.io/chats/${childData}/messages/${message_id}/`,
            { headers: { "Project-ID": projectId, "User-Name": credentials.UserName, "User-Secret": credentials.password } }
        )
            .then((res) => {
                setSendMessage(res.data.text);
                setMessageId(message_id)
                setUpdate(true)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const updation = () => {
        if (sendMessage) {
            axios.patch(`https://api.chatengine.io/chats/${childData}/messages/${messageId}/`, { "text": sendMessage },
                { headers: { "Project-ID": projectId, "User-Name": credentials.UserName, "User-Secret": credentials.password } }
            )
                .then((res) => {
                    setSendMessage('')
                    setUpdate(false)
                })
                .catch((err) => {
                    console.log(err);
                })

        }
    }

    const deletemessage = (messageDetails) => {
        const message_id = messageDetails?.id;
        axios.get(`https://api.chatengine.io/chats/${childData}/messages/${message_id}/`,
            { headers: { "Project-ID": projectId, "User-Name": credentials.UserName, "User-Secret": credentials.password } }
        )
            .then((res) => {
                // setSendMessage(res.data.text);
                alert("message deleted");
            })
            .catch((err) => {
                console.log(err);
            })
        axios.delete(`https://api.chatengine.io/chats/${childData}/messages/${message_id}/`,
            { headers: { "Project-ID": projectId, "User-Name": credentials.UserName, "User-Secret": credentials.password } }
        )
            .then((res) => {
                console.log(res, "working fine");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //get a messgae to chat 
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`https://api.chatengine.io/chats/${childData}/messages/`,
                { headers: { "Project-ID": projectId, "User-Name": credentials.UserName, "User-Secret": credentials.password } }
            )
                .then(response => {
                    console.log('get msg:', response.data);
                    setData(response?.data);

                })
                .catch(error => {
                    console.error('Error creating user:', error);
                });
        }, 1000); // Poll every 0.5 seconds
        return () => clearInterval(interval);
    })

    useEffect(() => {
        setChatPerson(chatPerson)
        getChat();
    }, [])
    const scrollToBottom = () => {
        messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [data]);

    const acceptRequest = (user) => {
        createChat(user);
        getChat();
    }

    const classes = useStyles();
    return (
        <>

            {/* This thing will do after the login of portal moreever use in backend */}
            <Button className={classes.Beginbutton} onClick={postUser}>post user</Button> <br />
            <Button className={classes.Beginbutton} onClick={getUser}>get user</Button> <br />

            {/* Accepting the request  */}
            <Button className={classes.Beginbutton} disabled onClick={createChat}>create a chat</Button> please don't click this button <br />

            {/* chat send message  */}
            <Button className={classes.Beginbutton} disabled onClick={getChat}>get a chat</Button>  <br />

            {/* <Button className={classes.Beginbutton} onClick={getChat}> get chat</Button> <br /> */}

            <div className='container-fluid mt-4'>
                <Grid container spacing={2}>
                    <Grid item md={2}>
                        <div className='card p-4'>
                            <div>
                                <div className='fw-bold text-center'>Requests</div> <hr />
                                {requests.map((item, index) => (
                                    <div className='mt-2 pointer' key={index}>
                                        <div className='card p-1 text-center' onClick={() => acceptRequest(item)}>{item}</div>
                                    </div>
                                ))}
                            </div>
                        </div> <br />
                        <div className='card p-4'>
                            <div>
                                <div className='fw-bold text-center '>Message</div> <hr />
                                {chatPerson.map((item, index) => (
                                    <Person key={index} details={item} credentials={credentials} sendDataToParent={handleChildData} />
                                ))}
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={10}>
                        <div className='card p-4'>
                            {data ?
                                <div className={classes.fixHeight}>
                                    {data.map((item, index) => {
                                        return <div className='d-flex justify-content between' key={index} >
                                            <>
                                                {item?.sender_username === credentials.UserName ?
                                                    <div className='d-flex flex-column align-items-end w-100 mt-4' >
                                                        <p>{item.created}</p>
                                                        <p className='fw-bold pointer'>
                                                            <DeleteIcon style={{ color: "red" }} onClick={() => deletemessage(item)} />
                                                            &nbsp;<EditIcon style={{ color: "green" }} onClick={() => editMessage(item)} />&nbsp;
                                                            {item.text}</p >
                                                    </div> :
                                                    <div className='mt-4'>
                                                        <p>{item.created}</p>
                                                        <p className='fw-bold '>{item.text}</p >
                                                    </div>
                                                }
                                            </>

                                        </div>
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>
                                : <div className={classes.fixHeight}><>choose any chat....</></div>}

                            <br />
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1" className='fw-bold'>COMPOSE MESSAGE</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={sendMessage} onChange={(e) => handleChange(e)}></textarea>
                            </div>
                            <div className="d-flex flex-column align-items-end mt-3">
                                {data &&
                                    <> {update ? <Button variant='contained' className={classes.Beginbutton1} onClick={updation}>update chat</Button> :
                                        <Button disabled={disabledSend} variant='contained' className={classes.Beginbutton1} onClick={sendChat}> send chat</Button>}
                                    </>
                                }
                            </div>

                        </div>
                    </Grid>
                </Grid>



            </div>
        </>
    )
}

export default Header