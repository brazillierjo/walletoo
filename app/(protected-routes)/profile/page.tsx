"use client";
import { userDataAtom } from "@/src/atoms/userData.atoms";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import MyAccountCard from "@/src/components/Profile/MyAccountCard";

const Profile: React.FC = () => {
    const [userData, setUserData] = useAtom(userDataAtom);
    const { data: session } = useSession();

    if (!userData) return <div className='flex p-4 lg:p-8'>Chargement...</div>;

    return (
        <div>
            <h1 className='text-navy-700 shrink text-xl font-bold dark:text-white'>Mon compte</h1>

            <MyAccountCard userProfile={userData} />
        </div>
    );
};

export default Profile;
