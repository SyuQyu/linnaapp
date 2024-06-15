import { StoreSlice } from "@zustand";

interface UserProps {
  email?: string;
  password?: string;
  full_name?: string;
  role_id?: number;
  phone_number?: string;
  department_id?: number;
  office_id?: number;
  gender?: string;
  address?: string;
  leave_quota?: number;
  verified?: boolean;
}

interface stateDataProps {
  loading: boolean;
  error: string;
  success: boolean;
}

export interface UserSlice {
  userData: any | null;
  AllUsers: any | null;
  specificUser: any | null;
  setUserData: (user: any) => void;
  resetUserData: () => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: UserProps) => Promise<void>;
  logout: () => void;
  updateUser: (data: UserProps, id: any, self?: boolean) => Promise<void>;
  checkToken: () => Promise<boolean>;
  stateData: stateDataProps;
  getAllUsers: () => Promise<void>;
  getByIdUsers: (id: number) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

const createUserSlice: StoreSlice<UserSlice> = (set, get) => ({
  userData: null,
  AllUsers: null,
  stateData: {
    loading: false,
    error: "",
    success: false,
  },
  specificUser: null,
  setUserData: (user: any) => set({ userData: user }),
  resetUserData: () => set({ userData: null }),
  getAllUsers: async () => {
    try {
      const response = await fetch(process.env.API_URL + "/user/all");
      const users = await response.json();
      set({ AllUsers: users });
    } catch (error) {
      console.error("Get all users failed:", error);
    }
  },
  getByIdUsers: async (id: number) => {
    try {
      const response = await fetch(process.env.API_URL + `/user/${id}`);
      const user = await response.json();
      set({ specificUser: user });
    } catch (error) {
      console.error("Get user by id failed:", error);
    }
  },
  login: async (credentials) => {
    try {
      set({ stateData: { loading: true, error: "", success: false } });
      console.log("credentials:", credentials);
      // Make API call to your backend to authenticate user
      const response = await fetch(process.env.API_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      console.log("response:", response);
      const userData = await response.json();
      console.log("userData:", userData.status);
      if (userData.status === "success") {
        set({ stateData: { loading: false, error: "", success: true } });
      } else {
        set({
          stateData: {
            loading: false,
            error: userData.message,
            success: false,
          },
        });
      }
      set({ userData });
      // Update Zustand state with user data
    } catch (error: any) {
      console.error("Login failed:", error);
      set({ stateData: { loading: false, error: error, success: false } });
      // Handle register error
    }
  },

  register: async (data) => {
    try {
      set({ stateData: { loading: true, error: "", success: false } });
      // Make API call to your backend to register user
      const response = await fetch(process.env.API_URL + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const userData = await response.json();
      if (userData.status === "success") {
        set({ stateData: { loading: false, error: "", success: true } });
      } else {
        set({
          stateData: {
            loading: false,
            error: userData.message,
            success: false,
          },
        });
      }
    } catch (error: any) {
      console.error("Register failed:", error);
      set({ stateData: { loading: false, error: error, success: false } });
      // Handle register error
    }
  },

  updateUser: async (data, id, self) => {
    try {
      console.log("data:", data, "id:", id);
      set({ stateData: { loading: true, error: "", success: false } });
      // Make API call to your backend to update user data
      const response = await fetch(
        process.env.API_URL + `/auth/updateUser/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      // const userData = await response.json();
      const userData = await response.json();
      console.log("userData update:", userData);
      if (userData.status === "success") {
        set({ stateData: { loading: false, error: "", success: true } });
        console.log("self:", self, "userData:", userData?.user);
        if (self) {
          get().setUserData({
            ...userData,
            user: {
              ...userData.user,
              full_name: userData?.user?.full_name,
              email: userData?.user?.email,
              phone_number: userData?.user?.phone_number,
              // department: userData?.user?.department,
              address: userData?.user?.address,
              gender: userData?.user?.gender,
            },
          });
        } else {
          await get().getAllUsers();
        }
      } else {
        set({
          stateData: {
            loading: false,
            error: userData.message,
            success: false,
          },
        });
      }
      // Update Zustand state with updated user data
    } catch (error) {
      console.error("Update user failed:", error);
      // Handle update user error
    }
  },
  deleteUser: async (id) => {
    try {
      set({ stateData: { loading: true, error: "", success: false } });
      // Make API call to your backend to delete user
      const response = await fetch(process.env.API_URL + `/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = await response.json();
      console.log("userData delete:", userData);
      if (userData.status === "success") {
        await get().getAllUsers();
        set({ stateData: { loading: false, error: "", success: true } });
      } else {
        set({
          stateData: {
            loading: false,
            error: userData.message,
            success: false,
          },
        });
      }
      // Update Zustand state with updated user data
    } catch (error) {
      console.error("Delete user failed:", error);
      // Handle delete user error
    }
  },

  logout: () => {
    // Clear user data from Zustand state
    set({ userData: null });
    set({ stateData: { loading: false, error: "", success: false } });
    set({ AllUsers: null });
    set({ specificUser: null });
  },

  checkToken: async () => {
    try {
      // Make API call to your backend to check token validity
      const response = await fetch(process.env.API_URL + "/auth/checkToken");
      const isValidToken = await response.json();
      return isValidToken;
    } catch (error) {
      console.error("Error checking token:", error);
      return false;
    }
  },
});

export default createUserSlice;
