import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./Userpage.scss";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Optionbar from "../../components/Optionbar/Optionbar";
import UserInfoModal from "../../components/UserInfoModal/UserInfoModal";

export default function Userpage(props) {
  //All the States
  const [visibility, setVisibility] = useState(false);
  const [userInfoModalVisibility, setUserInfoModalVisibility] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [planes, setPlanes] = useState();
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState();

  const handleToggle = (toggleValue) => {
    setToggle(!toggleValue);
    console.log(toggle);
  };

  //Modal Show and Hidden Functions
  const showModal = () => {
    setVisibility(true);
  };

  const hideModal = () => {
    setVisibility(false);
  };

  const showUserInfoModal = () => {
    setUserInfoModalVisibility(true);
  };

  const hideUserInfoModal = () => {
    setUserInfoModalVisibility(false);
  };

  const headerToken = {
    headers: { "auth-token": localStorage.getItem("token") },
  };

  //Axios call URL
  const planeURL = "http://localhost:5000/api/planes";
  const userInfo__URL = "http://localhost:5000/api/users";
  const userId = props[0].match.params.id;

  //Axios Call Function
  const axiosPlaneCall = () => {
    axios
      .get(planeURL)
      .then((res) => {
        setPlanes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const axiosUserRoleCall = () => {
    axios.get(userInfo__URL).then((res) => {
      let data = res.data;
      console.log(data);
      setUserRole(data);
      // data.forEach((data) => {
      //   console.log(data.name);
      //   setUserRole([
      //     ...userRole,
      //     {
      //       name: data.name,
      //       role: data.role,
      //     },
      //   ]);
      // });
    });
  };

  const axiosUserIdCall = () => {
    axios
      .get(`${userInfo__URL}/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("Fetch User ID info error");
      });
  };

  //User Edit Page Submit Function
  const submitHandler = (state) => {
    console.log("submit");
    hideUserInfoModal();
    axios
      .put(
        `${userInfo__URL}/${userId}`,
        {
          name: state.name,
          email: state.email,
          phone: state.phone,
          dateOfBirth: state.dateOfBirth,
          role: state.role,
        },
        headerToken
      )
      .then((res) => {
        alert("User Info has been edited");
        axiosUserIdCall();
      })
      .catch((err) => {
        console.log("err");
      });
  };

  useEffect(() => {
    axiosUserIdCall();
    axiosPlaneCall();
    axiosUserRoleCall();
    console.log("User Page useEffect");
  }, [setUser]);

  if (!localStorage.getItem("token")) {
    alert("Your token has expired");
    return <Redirect to={`/`} />;
  }
  return (
    <div className="userpage">
      <div class={toggle ? "app__sidebar--open" : "app__sidebar--close"}>
        <Sidebar handleToggle={handleToggle} toggle={toggle} />
      </div>
      <div
        class={
          toggle
            ? "app__content app__content--open "
            : "app__content app__content--close"
        }
      >
        <Navbar
          handleToggle={handleToggle}
          toggle={toggle}
          name={user && user.name}
          props={props[0]}
          history={props[0].history}
          showUserInfoModal={showUserInfoModal}
        />
        <button onClick={showModal} className="main">
          Create a Reservation
        </button>
        <Optionbar
          planes={planes}
          user={userRole}
          showBookingModal={showModal}
          visibility={visibility}
          hideModal={hideModal}
        />
        {/* <Modal visibility={visibility} hideModal={hideModal} /> */}
        <UserInfoModal
          visibility={userInfoModalVisibility}
          hideModal={hideUserInfoModal}
          user={user}
          submitHandler={submitHandler}
        />
      </div>
    </div>
  );
}
