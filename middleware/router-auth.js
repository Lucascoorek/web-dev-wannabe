export default function ({ store, redirect }) {
  if (!store.state.auth.user.email) {
    redirect("/start");
  }
}
