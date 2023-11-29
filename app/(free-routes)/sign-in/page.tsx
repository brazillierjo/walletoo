import { LeftSide } from "@/src/components/SignIn/LeftSide"
import { RightSide } from "@/src/components/SignIn/RightSide"

const SignIn: React.FC = () => {
  return (
    <div className="min-h-screen flex-wrap md:flex">
      <LeftSide />
      <RightSide />
    </div>
  )
}

export default SignIn
