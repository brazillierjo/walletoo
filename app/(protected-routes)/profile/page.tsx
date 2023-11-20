import { MyAccountCard } from "@/src/components/Profile/MyAccountCard";

const Profile: React.FC = () => {
    return (
        <div className='flex w-full flex-col gap-6'>
            <h1 className='shrink text-xl font-bold'>Mon compte</h1>

            <MyAccountCard />
        </div>
    );
};

export default Profile;
