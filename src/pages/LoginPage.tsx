import Login from "../security/Login";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <p>Here you will find a login formula</p>
      {Login()}
    </div>
  );
}
