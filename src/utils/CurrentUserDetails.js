// using localStorage to store the user data
// later we can use state management library to store the user data.

export const setCurrentUser = (user) => {
   localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem("currentUser");
  return userData ? JSON.parse(userData) : null;
};

export const isUserOnBoarded = () => {
  const userData = getCurrentUser();
  return (userData?.activityLevel && userData?.gender);
}

export const removeCurrentUser = () => {
  localStorage.removeItem("currentUser");
};

export const getUserGoal = () => {
  const userData = getCurrentUser();
  return userData?.goal;
};

export const updateCurrentUser = (updatedUser) => {
  const userData = getCurrentUser();
  const updatedUserData = { ...userData, ...updatedUser };
  setCurrentUser(updatedUserData);
};
