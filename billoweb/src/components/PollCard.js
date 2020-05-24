import React, { Component } from "react"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import img from "../images/sampleimg.jpeg"
import Grid from "@material-ui/core/Grid"
import { navigate } from "gatsby"
class PollCard extends Component {
  goToContestants = (eventname) =>{
    sessionStorage.setItem('eventname',eventname)
    navigate('/pickcontestant')
    //{ state: {'eventname':eventname}}
  }
  render() {
    return (
      <Grid item xs={12} sm={4} >
        <Card className="pollCard" onClick={()=>this.goToContestants(this.props.name)}>
          <CardActionArea>
            <CardMedia component="img" image={img} />
            <CardContent>
              <Typography>{this.props.name}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    )
  }
}

export default PollCard
