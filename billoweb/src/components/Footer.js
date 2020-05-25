import React, { Component } from "react"
import FacebookIcon from "@material-ui/icons/Facebook"
import InstagramIcon from "@material-ui/icons/Instagram"
import YouTubeIcon from "@material-ui/icons/YouTube"
import TwitterIcon from "@material-ui/icons/Twitter"
import "./footer.css"
class Footer extends Component {
  render() {
    var date = new Date()
    return (
      <div className="footer">
        <div className="footer-icons">
          <div>
            <a
              href="https://facebook.com/Media-Billo-103633607802708/?refid=46&__xts__%5B0%5D=12.Abo4yBTOYdbad-Tyt_wgEdWemSzmywJ0j5zM3vvuMfwEPwUIsqCXp7yQoDtiZ40gdHehMPr775MhdX85KtiYj65nNxYMMv6ma8FRrrcJRcrStKy71yICGHNagrIyw_oLNdA_rQ8hrAumPVUtwbEqhm-xARv8trBM8l83IUiBz591SbVUOIZxtro2l_jEzlLd_Ljg32ViVfjXKv_Z0zvqZcb0Er66cLaLHdwxbDD66wJjRCmSW9A8_Dw_DUUMJ3d6LE8hSOU2lw90lAD6A7nqjBE3iAl1YXETc33qClZ_rV4w2D1d5xVEdqMZTcRC-Vv2SViJa4OCXjpEqv3zyi6liHrHnAMj1z_8_BdvztTf3_Chb-tk9byfTiAdTazOzug_zpYaxgNFmVGo7DjVAGC2tubvpiRj8sC5SykAH9kuHPJGIfR_WgwdcB5q8ZcCgjZEBAvES_2-TKTAknCb626Kf_1WQFfUHDdI64eOcL0yVmnl5gOV1vKqjT4UoUs_ZkSR7ZlKyObN9KUAX3Z-iTwxyU1LaSsHnhAQcSQUsKwQ-RDRhiZb0qVv1Fe4c1H1TmleXhQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon className="fb" />
            </a>
          </div>
          <div>
            <a
              href="https://www.instagram.com/thebillostv/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="instagram" />
            </a>
          </div>
          <div>
            <a
              href="https://twitter.com/BilloMedia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon className="twitter" />
            </a>
          </div>
          <div>
            <a
              href="https://youtube.com/channel/UCakamJ5QsCd1tdRK9q8TcrA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon className="youtube" />
            </a>
          </div>
        </div>
        <div className="footer-note">
          <span>
            &copy; {date.getFullYear()} MediaBillo
            <br />
            <span className="micky-brand">
              Powered by MickySoft Technologies
            </span>
          </span>
        </div>
      </div>
    )
  }
}

export default Footer
