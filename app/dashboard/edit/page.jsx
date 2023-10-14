import { EditDashboard } from "@components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const EditDashBoardPage = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  // console.log(user);
  return <EditDashboard user={user} />
}

export default EditDashBoardPage