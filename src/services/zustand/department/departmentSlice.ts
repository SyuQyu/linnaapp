import { StoreSlice } from "@zustand";

interface DepartmentProps {
  department_id?: number;
  department_name?: string;
}

interface stateDataProps {
  loading: boolean;
  error: string;
  success: boolean;
}

export interface DepartmentSlice {
  departments: any | null;
  specificDepartment: any | null;
  stateData: stateDataProps;
  getDepartments: () => Promise<void>;
  getDepartmentById: (department_id: number) => Promise<void>;
  createDepartment: (data: DepartmentProps) => Promise<void>;
  updateDepartment: (
    department_id: number,
    data: DepartmentProps,
  ) => Promise<void>;
  deleteDepartment: (department_id: number) => Promise<void>;
}

const createDepartmentSlice: StoreSlice<DepartmentSlice> = (set, get) => ({
  departments: null,
  specificDepartment: null,
  stateData: {
    loading: false,
    error: "",
    success: false,
  },
  getDepartments: async () => {
    try {
      set({ stateData: { loading: true, error: "", success: false } });
      const response = await fetch(process.env.API_URL + "/department/all");
      const departments = await response.json();
      console.log("Departments:", departments);
      set({
        departments,
        stateData: { loading: false, error: "", success: true },
      });
    } catch (error: any) {
      console.error("Get departments failed:", error);
      set({
        stateData: { loading: false, error: error.message, success: false },
      });
    }
  },
  getDepartmentById: async (id: number) => {
    try {
      set({ stateData: { loading: true, error: "", success: false } });
      const response = await fetch(process.env.API_URL + `/department/${id}`);
      const department = await response.json();
      set({
        specificDepartment: department,
        stateData: { loading: false, error: "", success: true },
      });
    } catch (error: any) {
      console.error("Get department by id failed:", error);
      set({
        stateData: { loading: false, error: error.message, success: false },
      });
    }
  },
  createDepartment: async (data: DepartmentProps) => {
    try {
      set({ stateData: { loading: true, error: "", success: false } });
      const response = await fetch(process.env.API_URL + "/department", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status === "success") {
        await get().getDepartments();
        set({ stateData: { loading: false, error: "", success: true } });
      } else {
        set({
          stateData: { loading: false, error: result.message, success: false },
        });
      }
    } catch (error: any) {
      console.error("Create department failed:", error);
      set({
        stateData: { loading: false, error: error.message, success: false },
      });
    }
  },
  updateDepartment: async (id: number, data: DepartmentProps) => {
    try {
      set({ stateData: { loading: true, error: "", success: false } });
      const response = await fetch(process.env.API_URL + `/department/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status === "success") {
        await get().getDepartments();
        set({ stateData: { loading: false, error: "", success: true } });
      } else {
        set({
          stateData: { loading: false, error: result.message, success: false },
        });
      }
    } catch (error: any) {
      console.error("Update department failed:", error);
      set({
        stateData: { loading: false, error: error.message, success: false },
      });
    }
  },
  deleteDepartment: async (id: number) => {
    try {
      set({ stateData: { loading: true, error: "", success: false } });
      const response = await fetch(process.env.API_URL + `/department/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.status === "success") {
        await get().getDepartments();
        set({ stateData: { loading: false, error: "", success: true } });
      } else {
        set({
          stateData: { loading: false, error: result.message, success: false },
        });
      }
    } catch (error: any) {
      console.error("Delete department failed:", error);
      set({
        stateData: { loading: false, error: error.message, success: false },
      });
    }
  },
});

export default createDepartmentSlice;
