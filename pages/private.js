import { getSession } from "next-auth/client";
export default function Private(props) {
  return (
    <>
      <div>Private Page</div>
      <div>You are {props.data}</div>
    </>
  );
}
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "http://localhost:3000",
        permanent: false,
      },
    };
  }
  return {
    props: { data: "authenticated" },
  };
}
