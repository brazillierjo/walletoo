import LeftSide from "@/ui/components/SignIn/LeftSide";
import RightSide from "@/ui/components/SignIn/RightSide";

const SignIn: React.FC = () => {
    return (
        <div className='min-h-screen flex-wrap md:flex'>
            <LeftSide />
            <RightSide />
        </div>
    );
};

export default SignIn;
