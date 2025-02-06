const Profile = () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <h2 className="text-lg">Hello, {username.toUpperCase()}</h2>
    </div>
  );
};

export default Profile;
