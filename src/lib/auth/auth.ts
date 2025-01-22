// import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

// export async function getServerSideProps(context: any) {
//   const supabase = createPagesServerClient(context);
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   // Fetch user data if needed
//   const { data: user, error } = await supabase
//     .from("users")
//     .select("*")
//     .eq("id", session.user.id)
//     .single();

//   return {
//     props: {
//       user: user || session.user, // Pass user data to the page
//     },
//   };
// }
