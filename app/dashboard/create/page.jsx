import { CreateDashboard } from "@components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const CreateDashBoardPage = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  // console.log(user);
  return <CreateDashboard user={user} />
}

export default CreateDashBoardPage