
import { UserLogin } from "api calls/auth";
import Loading from "components/Loaders/Loading";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// reactstrap components
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import routes from "routes.js";
import { sweetAlertMsg } from "votingapis/api_const";

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
