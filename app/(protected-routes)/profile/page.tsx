"use client";
import { userDataAtom } from "@/src/atoms/userData.atoms";
import { useAtom } from "jotai";
import MyAccountCard from "@/src/components/Profile/MyAccountCard";

const Profile: React.FC = () => {
    const [userData] = useAtom(userDataAtom);

    if (!userData) return <div className='flex p-4 lg:p-8'>Chargement...</div>;

    return (
        <div className='flex w-full flex-col gap-6'>
            <h1 className='shrink text-xl font-bold'>Mon compte</h1>

            <MyAccountCard userProfile={userData} />
        </div>
    );
};

export default Profile;
