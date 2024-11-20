const Profile = () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  return (
    // <div className="flex items-center justify-center bg-red-400 text-3xl">
    //   hello
    // </div>

    <div className="flex h-full flex-1 flex-col items-center justify-center">
      {/* <div className="rounded-lg bg-red-400 p-5 text-3xl"> */}
      <h2 className="text-lg">
        Hello, {username.toUpperCase()} {/* </div> */}
      </h2>
    </div>
  );
};

export default Profile;
