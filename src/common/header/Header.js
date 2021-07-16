import React, { Component, useState } from 'react';
import './Header.css';
import Modal from 'react-modal';
import { render } from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/logo.svg';
import { Tabs, Tab, AppBar, Button, Typography, Box, FormControl, TextField, InputLabel, FormHelperText, Input } from '@material-ui/core';
// import { withStyles } from "@material-ui/core/styles";

// export const useStyles = makeStyles( theme => {
//     paper: {
//       position: 'absolute',
//       width: 400,
//       backgroundColor: theme.palette.background.paper,
//       border: '2px solid #000',
//       boxShadow: theme.shadows[5],
//       padding: theme.spacing(2, 4, 3),
//     }
//   });

//   const [modalStyle] = useState(getModalStyle);
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function TabPanel(props) {
    const { index, value, children } = props;
    return (
        <div>
            <div hidden={value !== index}>
                {value === index && (
                    <div>{children}</div>
                )}
            </div>
        </div>
    );
}

// class Header extends Component {
function Header(props){
//     constructor() {
//         super();
//         this.state = {
//             showModal: false,
//             showLoginFOrm: false,
//         };
//         // TabPanel(props) = this.bind(props);
//         this.handleOpenModal = this.handleOpenModal.bind(this);
//         this.handleCloseModal = this.handleCloseModal.bind(this);
//     }

//     showLogin = () => {
//         this.setState({
//             showLoginFOrm: true
//         })
//     }

//     showRegister = () => {
//         this.setState({
//             showLoginFOrm: false
//         })
//     }

//     handleOpenModal() {
//         this.setState({ showModal: true });
//     }

//     handleCloseModal() {
//         this.setState({ showModal: false });
//     }
const [showModal, setShowModal] = React.useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [registerUserForm, setRegisterUserForm] = React.useState({
        first_name: "",
        last_name: "",
        email_address: "",
        password: "",
        mobile_number: ""
    });
    const [reqfirstname, setReqFirstName] = React.useState("dispNone");
    const [reqlastname, setReqLastName] = React.useState("dispNone");
    const [reqemail, setReqEmail] = React.useState("dispNone");
    const [reqpass, setReqPass] = React.useState("dispNone");
    const [reqmobile, setReqMobile] = React.useState("dispNone");
    const [username, setUsername] = React.useState("");
    const [requsername, setReqUserName] = React.useState("dispNone");
    const [password, setPassword] = React.useState("");
    const [reqpassword, setReqPassword] = React.useState("dispNone");
    const [showdisplay, setShowDisplay] = React.useState("dispNone");

    Modal.setAppElement('#root');
    const openModal = () => {
        setShowModal(true);
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const inputChangedHandler = (event) => {
        const state = registerUserForm;
        state[event.target.name] = event.target.value;

        setRegisterUserForm({ ...state });

    }
    const inputUserNameHandler = (event) => {
        setUsername(event.target.value);
    }
    const inputPasswordHandler = (event) => {
        setPassword(event.target.value);
    }
let button;
const [session, setSession] = React.useState(window.sessionStorage.getItem("access-token"));
const validateLoginForm = () => {
    username === "" ? setReqUserName("dispBlock") : setReqUserName("dispNone");
    password === "" ? setReqPassword("dispBlock") : setReqPassword("dispNone");
    if(username === "" || password === ""){
        return;
    }else{
        return true;
    }

}

const validateRegisterForm = () => {
    registerUserForm.email_address === "" ? setReqEmail("dispBlock") : setReqEmail("dispNone");
    registerUserForm.first_name === "" ? setReqFirstName("dispBlock") : setReqFirstName("dispNone");
    registerUserForm.last_name === "" ? setReqLastName("dispBlock") : setReqLastName("dispNone");
    registerUserForm.mobile_number === "" ? setReqMobile("dispBlock") : setReqMobile("dispNone");
    registerUserForm.password === "" ? setReqPass("dispBlock") : setReqPass("dispNone");

    if(
        registerUserForm.email_address === "" ||
        registerUserForm.first_name === "" ||
        registerUserForm.last_name === "" ||
        registerUserForm.mobile_number === "" ||
        registerUserForm.password === ""
    ){
        return;
    }else{
        return true;
    }
}

const onLoginFormSubmitted = () => {
    if (validateLoginForm()) {
        fetch(props.baseUrl + 'auth/login',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Basic " + window.btoa(username + ":" + password)
                }
            }).then(response => {
                if (response.status === 200) {
                    window.sessionStorage.setItem("access-token", response.headers.get("access-token"));
                    setSession(window.sessionStorage.getItem("access-token"));
                    closeModal();
                }
            }).catch(err => {
                console.log(err.message);
            });
    }
}

const onFormSubmitted = async (event) => {
    if(validateRegisterForm()){
        const rawResponse = await fetch(props.baseUrl + '/signup',
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerUserForm)
        }
        );
        const data = await rawResponse.json();
        if(data.status === "ACTIVE"){
            setShowDisplay("dispBlock");
        }
    }
}

const handleChange = (event, newValue) => {
    setValue(newValue);
};
if (props.detailButton) {
    button = <Button variant="contained" color="primary" onClick={bookShowHandler}>Book Show</Button>;
}
const bookShowHandler = () => {
    if(session){
        window.location.href = `/bookshow/${props.movieid}`;
    }else{
        openModal();
    }
}
const logoutHandler = async () => {
    const rawResponse = await fetch(props.baseUrl + '/auth/logout',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Basic " + window.btoa(username + ":" + password)
            }
        });
    window.sessionStorage.removeItem("access-token");
    setSession(window.sessionStorage.getItem("access-token"));
    const data = await rawResponse.json();
    console.log(data);
}
    // render() {
        // const classes = useStyles();
        return (
            <div className="header">

                    <img src={logo} alt="" img />
                    <span style={{ float: "right" }}>
                {button}
                {session ? <Button variant="contained" color="default" style={{ marginLeft: "10px" }} onClick={logoutHandler}>Logout</Button> : <Button variant="contained" color="default" style={{ marginLeft: "10px" }} onClick={openModal}>Login</Button>
                }
            </span>
                {/* <div className="login-button">
                    <Button variant="contained" onClick={this.handleOpenModal}>{props.log_value}</Button>
                    <Modal
                        isOpen={this.state.showModal}
                        contentLabel="Minimal Modal Example"
                        style={modalStyle} 
                        className={classes.paper}
                        style={customStyles}
                    >
                        <AppBar position="static">
                            <Tabs centered>
                                <Tab label="Login" onClick={this.showLogin}
                                {...a11yProps(0)} 
                                />

                                <Tab label="Register" onClick={this.showRegister}
                                {...a11yProps(1)}  
                                />
                            </Tabs>
                        </AppBar>
                        {this.state.showLoginFOrm
                            ?

                            <React.Fragment>
                                <FormControl Validate autoComplete="off" 
                                class="login-options"
                                 size='small'
                                 >
                                <InputLabel htmlFor="my-input"> 
                                <TextField
                                        error 
                                        id="standard-error" 
                                        label="Error"
                                        helperText="Enter Username"  
                                        required 
                                        id="standard-secondary" 
                                        label="Username"
                                         color="secondary" 
                                         class = "username" />
                                        Email address
                                        </InputLabel>
                                   
 
                                    <TextField 
                                    error 
                                    id="standard-error" 
                                    label="Error"
                                    helperText="Enter Password"  
                                    required
                                        id="standard-password-input"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        class = "password"
                                    />
                                </FormControl>
                                <Button class="ok-login" variant="contained" onClick={this.handleCloseModal}>{props.log_value}</Button>
                            </React.Fragment> : <div>This is Register Page</div>
                        }
                    </Modal>
                </div> */}
                { showModal ? (<Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Tabs
                    value={value}
                    indicatorColor="secondary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                >
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <div style={{ margin: "20px", padding: "0 20px" }}>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="username">
                                Username
                            </InputLabel>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                onChange={inputUserNameHandler}
                            />
                            <FormHelperText className={requsername}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="password">
                                Password
                            </InputLabel>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                onChange={inputPasswordHandler}
                            />
                            <FormHelperText className={reqpassword}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <br />
                        <div style={{ textAlign: "center" }}>
                            <Button variant="contained" color="primary" onClick={onLoginFormSubmitted}>Login</Button>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div style={{ margin: "20px", padding: "0 20px" }}>

                        <FormControl required className="formControl">
                            <InputLabel htmlFor="first_name">
                                First Name
                            </InputLabel>
                            <Input
                                id="first_name"
                                name="first_name"
                                type="text"
                                onChange={inputChangedHandler}
                            />
                        </FormControl>
                        <FormHelperText className={reqfirstname}>
                                <span className="red">Required</span>
                        </FormHelperText><br /><br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="last_name">
                                Last Name
                            </InputLabel>
                            <Input
                                refs="last_name"
                                id="last_name"
                                name="last_name"
                                type="text"
                                onChange={inputChangedHandler}
                            />
                            <FormHelperText className={reqlastname}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="email">
                                Email
                            </InputLabel>
                            <Input
                                refs="email"
                                id="email"
                                name="email_address"
                                type="text"
                                onChange={inputChangedHandler}
                            />
                            <FormHelperText className={reqemail}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="password">
                                Password
                            </InputLabel>
                            <Input
                                refs="password"
                                id="password"
                                name="password"
                                type="text"
                                onChange={inputChangedHandler}
                            />
                            <FormHelperText className={reqpass}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="contact">
                                Contact No.
                            </InputLabel>
                            <Input
                                refs="mobile_number"
                                id="mobile_number"
                                name="mobile_number"
                                type="number"
                                onChange={inputChangedHandler}
                            />
                            <FormHelperText className={reqmobile}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <FormHelperText className={showdisplay} style={{fontSize:"14px", color:"black"}}>Registration Successful. Please Login!</FormHelperText>
                        <br />
                        <div style={{ textAlign: "center" }}>
                            <Button variant="contained" color="primary" onClick={onFormSubmitted}>Register</Button>
                        </div>
                    </div>
                </TabPanel>

            </Modal>) : null}
            </div>
        );
    }
// }
const props = { 'log_value': "Login" };

// render(<Header {...props} />, document.getElementById('main'))

export default Header;