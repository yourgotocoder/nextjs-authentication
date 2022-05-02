import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useSession, getSession } from "next-auth/client";
import { useState, useEffect } from "react";

function UserProfile() {
    // Redirect away if NOT auth
    const [isLoading, setIsLoading] = useState();
    const [loadedSession, setLoadedSession] = useState();

    useEffect();
    const [session, loading] = useSession();

    if (loading) {
        return <p className={classes.profile}>Loading</p>;
    }
    return (
        <section className={classes.profile}>
            <h1>Your User Profile</h1>
            <ProfileForm />
        </section>
    );
}

export default UserProfile;
