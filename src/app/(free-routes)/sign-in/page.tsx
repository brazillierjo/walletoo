import { LeftSide } from "@/src/components/SignIn/LeftSide";
import { RightSide } from "@/src/components/SignIn/RightSide";

const SignIn: React.FC = () => {
  return (
    <div className="flex-wrap p-4 md:flex lg:p-8">
      <LeftSide />
      <RightSide />
    </div>
  );
};

export default SignIn;
