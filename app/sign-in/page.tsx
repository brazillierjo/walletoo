import LeftSide from "@/ui/components/SignIn/LeftSide";
import RightSide from "@/ui/components/SignIn/RightSide";

export default function SignIn() {
    return (
        <div className='min-h-screen flex-wrap md:flex'>
            <LeftSide />
            <RightSide />
        </div>
    );
}
