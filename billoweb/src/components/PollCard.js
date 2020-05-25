import React, { Component } from "react"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import img from "../images/sampleimg.jpeg"
import Grid from "@material-ui/core/Grid"
import { navigate } from "gatsby"

import '../pages/index.css'
class PollCard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isRouting :false
    }
  }
  
  goToContestants = (eventname) =>{
    this.props.showloading()
    sessionStorage.setItem('eventname',eventname)
   navigate('/pickcontestant')
    //{ state: {'eventname':eventname}}
  }
  render() {
    return (
      <>
          
      <Grid item xs={12} sm={4}  >
        <Card className="pollCard" onClick={()=>this.goToContestants(this.props.name)}>
          <CardActionArea>
            <CardMedia component="img" image={img} />
            <CardContent className='card-content'>
              <Typography>{this.props.name}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      </>
    )
  }
}

export default PollCard
