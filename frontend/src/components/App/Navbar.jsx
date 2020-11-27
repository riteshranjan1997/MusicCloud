import React, {useState, useEffect} from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import  {Modal,Popover,Divider,} from "@material-ui/core"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../../redux/Auth/Action";
import LoginModel from "./LoginModel";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    backgroundColor: fade(theme.palette.common.white, 0.15),
  },
  title: {
    display: "none",
    marginLeft: "80px",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imgicon: {
    padding: theme.spacing(0, 1),
    height: "60%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(55)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "10ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [logingModelStatus, setlogingModelStatus] = React.useState(false);

  const handleLoginModelOpen = () => {
    setlogingModelStatus(true);
  };

  const handleLoginModelClose = () => {
    setlogingModelStatus(false);
  };

  const loginModel = <LoginModel />;

  // useEffect(() => {
  //   return axios
  //     .get(
  //       `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressquery}.json?limit=5&access_token=pk.eyJ1Ijoic291bmRhcnlhbWVjc2UiLCJhIjoiY2toMmUxZHBoMGJtdDJ3cGNqOWhmbTJqaiJ9.sZeF_rzMTfs2fPBA4JsHxQ`
  //     )
  //     .then((res) => setsuggestedAddress(res.data.features))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <>
      <Modal
        open={logingModelStatus}
        onClose={handleLoginModelClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
      >
        {loginModel}
      </Modal>
      <div className={classes.grow}>
        <AppBar position="static" style={{ background: "#FF5500" }}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            ></IconButton>
            <img
              src="data:image/png;base64,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"
              className={classes.imgicon}
              alt="library"
            />

            <Typography className={classes.title} variant="h6" noWrap>
              Music Cloud
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            {/* <div>
                {isAuth ? (
                  <div>
                    <OverlayTrigger
                      trigger="click"
                      key="bottom"
                      placement="bottom"
                      overlay={
                        <Popover id={"popover-positioned-bottom"}>
                          <Popover.Content>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className={classes.menuRow}>
                                <Link
                                  to="/account/Past orders"
                                  style={{
                                    color: "#2B8282",
                                    textDecoration: "none",
                                  }}
                                >
                                  <div className={classes.menuDetails}>
                                    <div className={classes.menuIcon}>
                                      <i class="fas fa-history"></i>
                                    </div>
                                    <div>Past orders</div>
                                  </div>
                                </Link>
                                <Link
                                  to="/account/Upcoming orders"
                                  style={{
                                    color: "#2B8282",
                                    textDecoration: "none",
                                  }}
                                >
                                  <div className={classes.menuDetails}>
                                    <div className={classes.menuIcon}>
                                      <i class="fas fa-briefcase"></i>
                                    </div>
                                    <div>Upcoming orders</div>
                                  </div>
                                </Link>
                              </div>
                              <div className={classes.menuRow}>
                                <Link
                                  to="/account/Saved Restaurent"
                                  style={{
                                    color: "#2B8282",
                                    textDecoration: "none",
                                  }}
                                >
                                  <div className={classes.menuDetails}>
                                    <div className={classes.menuIcon}>
                                      <i class="fas fa-bookmark"></i>
                                    </div>
                                    <div>Saved</div>
                                  </div>
                                </Link>
                                <Link
                                  to="/account/Payments"
                                  style={{
                                    color: "#2B8282",
                                    textDecoration: "none",
                                  }}
                                >
                                  <div className={classes.menuDetails}>
                                    <div className={classes.menuIcon}>
                                      <i class="fas fa-money-check"></i>
                                    </div>
                                    <div>Payments</div>
                                  </div>
                                </Link>
                              </div>
                              <div className={classes.menuRow}>
                                <Link
                                  to="/account"
                                  style={{
                                    color: "#2B8282",
                                    textDecoration: "none",
                                  }}
                                >
                                  <div
                                    className={classes.menuDetails}
                                    style={{ marginLeft: "-10px" }}
                                  >
                                    <div className={classes.menuIcon}>
                                      <i class="fas fa-cog"></i>
                                    </div>
                                    <div>Account</div>
                                  </div>
                                </Link>
                                <Link
                                  to="/"
                                  style={{
                                    color: "#2B8282",
                                    textDecoration: "none",
                                  }}
                                >
                                  <div
                                    className={classes.menuDetails}
                                    style={{ marginLeft: "-10px" }}
                                  >
                                    <div className={classes.menuIcon}>
                                      <i class="fas fa-info-circle"></i>
                                    </div>
                                    <div>Help</div>
                                  </div>
                                </Link>
                              </div>
                              <Divider />
                              <div
                                style={{
                                  color: "#2B8282",
                                  textAlign: "center",
                                }}
                                onClick={() => dispatch(logoutUser())}
                              >
                               Not {userData.first_name} ? SignOut
                              </div>
                            </div>
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <Button
                        style={{
                          width: "233px",
                          border: "none",
                          outline: "none",
                          color:"#2B8282",
                        }}
                      >
                        <div style={{display:"flex",alignItems:"center",marginTop:"-5px", fontFamily:"esti"}}>
                          <div><Avatar style={{ backgroundColor: "#2B8282",height:"30px",width:"30px"}}>
                            {userData.first_name[0]}
                          </Avatar></div>
                          <div style={{ marginLeft: "5px", color:"#6b6b83"}}>
                            Hi,{" " + userData.first_name}{" "}
                          </div>                        
                          <div><ExpandMoreIcon style={{color:"#6b6b83" , marginLeft:"20px"}} /></div>
                        </div>
                      </Button>
                    </OverlayTrigger>
                  </div>
                ) : props.login ? (
                  <button
                    className="btn btn-outline-success"
                    onClick={handleLoginModelOpen}
                    style={{color:"#2B8282", marginRight:"20px"}}
                  >
                    Sign in
                  </button>
                ) : null}
              </div> */}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
