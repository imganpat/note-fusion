const Profile = () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  return (
    <div className="flex h-full items-center justify-center text-3xl">
      Hello {username}
      {email}
    </div>
  );
};

export default Profile;
