const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  console.log("user was set successfully");
};

// retrive value in local storage

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// delete Item in local Storage
const deleteUser = () => {
  console.log("user deleting in process");
  localStorage.removeItem("user");
  console.log("user was removed successfully");
};

export { setUser, getUser, deleteUser };
