import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Wallet() {
    const session = await getServerSession();

    if (!session || !session.user) redirect("/sign-in");

    return <div>Wallet</div>;
}
