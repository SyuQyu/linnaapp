import { StoreSlice } from "@zustand";

interface OfficeProps {
  office_id?: number;
  office_name?: string;
  office_lang?: string;
  office_long?: string;
  // Add more properties as needed
}

interface StateDataProps {
  loading: boolean;
  error: string;
  success: boolean;
}

export interface OfficeSlice {
  offices: any | null;
  specificOffice: any | null;
  stateData: StateDataProps;
  getOffices: () => Promise<void>;
  getOfficeById: (office_id: number) => Promise<void>;
  createOffice: (data: OfficeProps) => Promise<void>;
  updateOffice: (office_id: number, data: OfficeProps) => Promise<void>;
  deleteOffice: (office_id: number) => Promise<void>;
}

const createOfficeSlice: StoreSlice<OfficeSlice> = (set, get) => ({
  offices: null,
  specificOffice: null,
  stateData: {
    loading: false,
    error: "",
    success: false,
  },
  getOffices: async () => {
    try {
      set({ stateData: { loading: true, error: "", success: false } });
      const response = await fetch(process.env.API_URL + "/office/all");
      const offices = await response.json();
      set({ offices, stateData: { loading: false, error: "", success: true } });
    } catch (error: any) {
      console.error("Get offices failed:", error);
      set({
        stateData: { loading: false, error: error.message, success: false },
      });
    }
  },
  getOfficeById: async (office_id: number) => {
    try {
      set({ stateData: { loading: true, error: "", success: false } });
      const response = await fetch(
        process.env.API_URL + `/office/${office_id}`,
      );
      const office = await response.json();
      set({
        specificOffice: office,
        stateData: { loading: false, error: "", success: true },
      });
    } catch (error: any) {
      console.error("Get office by ID failed:", error);
      set({
        stateData: { loading: false, error: error.message, success: false },
      });
    }
  },
  createOffice: async (data: OfficeProps) => {
    try {
      set({ stateData: { loading: true, error: "", success: false } });
      const response = await fetch(process.env.API_URL + "/office", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status === "success") {
        await get().getOffices();
        set({ stateData: { loading: false, error: "", success: true } });
      } else {
        set({
          stateData: { loading: false, error: result.message, success: false },
        });
      }
    } catch (error: any) {
      console.error("Create office failed:", error);
      set({
        stateData: { loading: false, error: error.message, success: false },
      });
    }
  },
  updateOffice: async (office_id: number, data: OfficeProps) => {
    try {
      set({ stateData: { loading: true, error: "", success: false } });
      const response = await fetch(
        process.env.API_URL + `/office/${office_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();
      if (result.status === "success") {
        await get().getOffices();
        set({ stateData: { loading: false, error: "", success: true } });
      } else {
        set({
          stateData: { loading: false, error: result.message, success: false },
        });
      }
    } catch (error: any) {
      console.error("Update office failed:", error);
      set({
        stateData: { loading: false, error: error.message, success: false },
      });
    }
  },
  deleteOffice: async (office_id: number) => {
    try {
      set({ stateData: { loading: true, error: "", success: false } });
      const response = await fetch(
        process.env.API_URL + `/office/${office_id}`,
        {
          method: "DELETE",
        },
      );
      const result = await response.json();
      if (result.status === "success") {
        await get().getOffices();
        set({ stateData: { loading: false, error: "", success: true } });
      } else {
        set({
          stateData: { loading: false, error: result.message, success: false },
        });
      }
    } catch (error: any) {
      console.error("Delete office failed:", error);
      set({
        stateData: { loading: false, error: error.message, success: false },
      });
    }
  },
});

export default createOfficeSlice;
