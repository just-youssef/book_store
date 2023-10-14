"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "./ProfileCard";
import LoadPage from "./LoadPage";


const ProfileId = ({ currentUser, profileUserId }) => {
    const [profileUser, setProfileUser] = useState({});
    const [profileUserBooks, setProfileUserBooks] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
          const res1 = await fetch(`/api/users/${profileUserId}`);
          const res1Data = await res1.json();
          setProfileUser(res1Data);
    
          const res2 = await fetch(`/api/users/${profileUserId}/books`);
          const res2Data = await res2.json();
          setProfileUserBooks(res2Data);
        };
    
        if (profileUserId) fetchData();
    }, [profileUserId]);

    currentUser?.id === profileUserId && router.push('/profile');

    return (
        <>{!(profileUser.given_name && profileUser.family_name && profileUser.email && profileUser.picture)?
            <LoadPage />
            :
            <ProfileCard
                name={profileUser.given_name+" "+ profileUser.family_name}
                email={profileUser.email}
                img={profileUser.picture}
                data={profileUserBooks}
            />
        }</>
    )
}

export default ProfileId