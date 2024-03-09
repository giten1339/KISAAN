import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getSessionInfo() {
   const serverSession = await getServerSession(authOptions);
   return serverSession;
}
