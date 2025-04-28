import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getUserSession = async (context: GetServerSidePropsContext) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return {
            redirect: { destination: "/login", permanent: false },
        };
    }

    const adminList = process.env.ADMINEMAIL?.split(",");

    if (!adminList?.includes(session.user?.email ?? "")) {
        return {
            redirect: { destination: "/logout", permanent: false },
        };
    }

    const userItem = {
        name: session.user?.name || "Unknown",
        email: session.user?.email || "",
        image: session.user?.image || "",
    };

    return {
        props: userItem,
    };
};
