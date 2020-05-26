import React, { Component } from "react"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"

import img from "../images/micky.jpg"
import Grid from "@material-ui/core/Grid"
import Badge from "@material-ui/core/Badge"
import Skeleton from '@material-ui/lab/Skeleton';
import "./animations.css"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "../pages/index.css"
class Contestant extends Component {
  constructor(props) {
    super(props)

    this.state = {
      img: null,
    }
  }


  render() {
   
    return (
      <Grid item xs={6} sm={3} className="fade-in">
        <Badge
          overlap="circle"
          badgeContent=""
          
          color='secondary'
          invisible={this.props.selected === true ? false : true}
        >
          <Card
            className="pollCard"
            onClick={() => this.props.click(this.props.id)}
            elevation={20}
            style={{ opacity: this.props.selected === true ? 0.4 : 1 }}
          >
            <CardActionArea >
              <LazyLoadImage
                className='cardimg'
                alt={img}
                placeholder={<Skeleton variant="rect"  />}
               
                src={this.props.imgurl}
              />
              <CardContent className='card-content'> 
               {this.props.name}
               </CardContent> 
            </CardActionArea>
          </Card>
        </Badge>
      </Grid>
    )
  }
}

export default Contestant
