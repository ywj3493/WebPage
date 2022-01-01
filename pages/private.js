import { getSession } from "next-auth/client";
export default function Private(props) {
  return (
    <>
      <div>Private Page</div>
      <div>You are {props.data}</div>
    </>
  );
}
//important! in next : it called before creation of web page
export async function getServerSideProps(ctx) {
  //next-auth saves token and session data in ctx, ctx has all the req, res, session...
  //by checking authentication here in serverside props you don't have blink in the pages
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
