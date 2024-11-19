export const fetchUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`User Called Api Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log("Error fetching data", error);
    throw error;
  }
};

export const fetchUserDetail = async (id) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    if (!response.ok) {
      throw new Error(`"User not found", ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log("Failed to fetcj details", error);
    throw error;
  }
};
