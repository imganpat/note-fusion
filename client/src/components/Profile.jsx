const Profile = () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <h2 className="text-lg">Hello, {username.toUpperCase()}</h2>
      <div className="flex h-full items-center justify-center text-3xl">
        Hello {username}
        {email}
      </div>
    </div>
  );
};

export default Profile;
