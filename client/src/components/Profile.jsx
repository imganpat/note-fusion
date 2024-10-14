import Cookies from "js-cookie";

const Profile = () => {
  const username = Cookies.get("username");
  const email = Cookies.get("email");
  return (
    <div className="flex h-screen w-screen items-center justify-center text-3xl">
      Hello {username}
      {email}
    </div>
  );
};

export default Profile;
