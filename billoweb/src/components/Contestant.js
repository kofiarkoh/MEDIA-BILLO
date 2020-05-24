import React, { Component } from "react"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import img from "../images/micky.jpg"
import checkicon from "../images/checkedicon.png"
import Grid from "@material-ui/core/Grid"
import { navigate } from "gatsby"
import Badge from "@material-ui/core/Badge"

import "../pages/index.css"
class Contestant extends Component {
  render() {
    return (
      <Grid item xs={6} sm={3}>
        <Badge
          overlap="circle"
          badgeContent=""
          color="secondary"
          invisible={this.props.selected == true ? false : true }
        >
          <Card
            className="pollCard"
            onClick={() => this.props.click(this.props.id)}
            style={{ opacity: this.props.selected == true ? 0.5 : 1 }}
          >
            <CardActionArea>
              <CardMedia component="img" image={img} />
              <CardContent>
                <Typography>{this.props.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Badge>
      </Grid>
    )
  }
}

export default Contestant
