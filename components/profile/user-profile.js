import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { getSession } from "next-auth/client";
import { useState, useEffect } from "react";

function UserProfile(props) {
  // Redirect away if NOT auth
  //   const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     getSession().then((session) => {
  //       if (!session) {
  //         window.location.href = "/auth";
  //       } else {
  //         setIsLoading(false);
  //       }
  //     });
  //   }, []);

  //   if (isLoading) {
  //     return <p className={classes.profile}>Loading</p>;
  //   }
  const changePassword = async (passwordData) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePassword} />
    </section>
  );
}

export default UserProfile;
