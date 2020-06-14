// export default function ({ redirect, store, app }) {
//   // if (!store.state.auth.user.email) {
//   //   redirect("/start");
//   // }
//   app.$fireAuth.onAuthStateChanged((user) => {
//     if (!user) {
//       redirect("/start");
//     }
//   });
// }

// export default function ({ store, error }) {
//   if (!store.state.auth.user.email) {
//     error({
//       message: "You are not connected",
//       statusCode: 403,
//     });
//   }
// }

export default function ({ app, redirect }) {
  if (app.$fireAuth) {
    app.$fireAuth.onAuthStateChanged((user) => {
      if (!user) {
        // this.$store.commit({ type: "auth/addUser", email: user.email });
        redirect("/");
      }
    });
  }
}
