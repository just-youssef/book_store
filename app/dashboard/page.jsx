import { Dashboard } from "@components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const DashBoardPage = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  // console.log(user);
  return (
  <>{
    !user?
    <div className='flex justify-center'>
      <p className="text-4xl font-semibold">You are not Signed In!</p>
    </div>
    :
    <Dashboard user={user} />
  }</>
  )
}

export default DashBoardPage