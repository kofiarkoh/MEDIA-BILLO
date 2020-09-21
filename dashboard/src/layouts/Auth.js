/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, CardHeader } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";
import { UserLogin } from "api calls/auth";
import { sweetAlertMsg } from "votingapis/api_const";
import Loading from "components/Loaders/Loading";

class Auth extends React.Component {
  state = {
    username: '',
    password:'',
    isloading:false
  }
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  loginUser = ()=>{
    //this.props.history.push('/admin')
    const {username,password} = this.state

    var login = UserLogin(username,password)
    this.setState({isloading:true})
    login.then((resp)=>{
      console.log(resp)
      this.setState({isloading:false})
      if (resp.resp_code === 200) {
        //login success
        sessionStorage.setItem('token',resp.message.token)
        sessionStorage.setItem('accessLevel',resp.message.status)
        sweetAlertMsg('please wait','success')
        setTimeout(() => {
          this.props.history.push('/admin')
        }, 1500);
       // 
      }else{
        sweetAlertMsg(resp.message,'error')
      }
    }).catch((e)=>{
      this.setState({isloading:false})
      sweetAlertMsg(e,'error')
    })
    //console.log(this.props)
  }
  
  render() {
    const {username,password} = this.state
    return (
      <>
        <div className="main-content">
        {/*   <AuthNavbar /> */}
          <div className="header bg-gradient-info py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                  <h1 className="text-white">MEDIA BILO ADMIN PORTAL</h1>
                    <h1 className="text-white">Welcome!</h1>
                   
                    <Card>
                      <CardHeader>
                      <Loading loading={this.state.isloading}/>
                      </CardHeader>
                  
                      <CardBody>
                       
                        <Form>
                          <FormGroup>
                            <Label>Username</Label>
                            <Input type='text' value={username} onChange={(e)=>this.setState({username:e.target.value})}/>
                          </FormGroup>
                          <FormGroup>
                            <Label>Password</Label>
                            <Input type='password' value={password} onChange={(e)=>this.setState({password:e.target.value})}/>
                          </FormGroup>
                          <Button disabled={this.state.isloading} type='button' onClick={()=>this.loginUser()}>Login</Button>
                 </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Switch>
                {this.getRoutes(routes)}
                <Redirect from="*" to="/auth/login" />
              </Switch>
            </Row>
          </Container>
        </div>
        {/* <AuthFooter /> */}
      </>
    );
  }
}

export default Auth;
