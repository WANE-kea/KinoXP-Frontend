import Logout from "../security/Logout";

export default function LogoutPage() {
  return (
    <div>
      <h1>Logout</h1>
      <p>Here you will find a logout formula</p>
      {Logout()}
    </div>
  );
}
