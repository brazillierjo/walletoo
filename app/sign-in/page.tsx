import LeftSide from "@/components/SignIn/LeftSide";
import RightSide from "@/components/SignIn/RightSide";

export default function SignIn() {
    return (
        <div className='min-h-screen flex-wrap bg-white md:flex md:bg-slate-300'>
            <LeftSide />
            <RightSide />
        </div>
    );
}
