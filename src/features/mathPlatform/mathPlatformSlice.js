import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabaseClient";

// Async thunk to fetch projects from Supabase
export const fetchProjects = createAsyncThunk(
  "mathPlatform/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("Math Platform")
        .select("id, name_ar")
        .order("id");

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to add a new project to Supabase
export const addSection = createAsyncThunk(
  "mathPlatform/addSection",
  async ({ name_ar }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("Math Platform")
        .insert([{ name_ar }])
        .select();

      if (error) {
        throw error;
      }
      return data[0]; // Return the newly inserted section
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete a project from Supabase
export const deleteSection = createAsyncThunk(
  "mathPlatform/deleteSection",
  async (id, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("Math Platform")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }
      return id; // Return the ID of the deleted section
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch sections for a given project ID
export const fetchSectionsByProjectId = createAsyncThunk(
  "mathPlatform/fetchSectionsByProjectId",
  async (projectId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("sections")
        .select("id, title")
        .eq("project_id", projectId)
        .order("id");

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch resources for a given section ID
export const fetchResourcesBySectionId = createAsyncThunk(
  "mathPlatform/fetchResourcesBySectionId",
  async (sectionId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("resources")
        .select("id, name, type, url")
        .eq("section_id", sectionId)
        .order("id");

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Upload a resource file to storage and create DB record
export const uploadResourceToSection = createAsyncThunk(
  "mathPlatform/uploadResourceToSection",
  async ({ sectionId, file, name, type, folder }, { rejectWithValue }) => {
    try {
      const bucket = "uploads"; // ensure this bucket exists in Supabase
      const fileExt = file.name.split(".").pop();
      const baseFolder = folder || `${sectionId}`;
      const filename = `${baseFolder}/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filename, file, {
          upsert: false,
          contentType: file.type || undefined,
        });
      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filename);
      let publicUrl = publicUrlData?.publicUrl;
      if (
        publicUrl &&
        publicUrl.includes("/storage/v1/object/") &&
        !publicUrl.includes("/storage/v1/object/public/")
      ) {
        publicUrl = publicUrl.replace(
          "/storage/v1/object/",
          "/storage/v1/object/public/"
        );
      }

      const { data, error } = await supabase
        .from("resources")
        .insert([{ section_id: sectionId, name, type, url: publicUrl }])
        .select();
      if (error) throw error;
      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete resource (DB + storage)
export const deleteResourceById = createAsyncThunk(
  "mathPlatform/deleteResourceById",
  async ({ resourceId, url }, { rejectWithValue }) => {
    try {
      // best-effort: delete file from storage if URL is ours
      try {
        const urlObj = new URL(url);
        const path = decodeURIComponent(urlObj.pathname);
        // Support both public and private URL formats
        let key = path.split("/object/public/")[1];
        if (!key) key = path.split("/object/")[1];
        if (key) {
          const [bucket, ...rest] = key.split("/");
          const objectPath = rest.join("/");
          if (bucket && objectPath) {
            await supabase.storage.from(bucket).remove([objectPath]);
          }
        }
      } catch {
        // ignore storage delete errors
      }

      const { error } = await supabase
        .from("resources")
        .delete()
        .eq("id", resourceId);
      if (error) throw error;
      return resourceId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to add a new section to a project in Supabase
export const addSectionToProject = createAsyncThunk(
  "mathPlatform/addSectionToProject",
  async ({ projectId, title }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("sections")
        .insert([{ project_id: projectId, title }])
        .select();

      if (error) {
        throw error;
      }
      return data[0]; // Return the newly inserted section
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete a section from a project in Supabase
export const deleteSectionFromProject = createAsyncThunk(
  "mathPlatform/deleteSectionFromProject",
  async (sectionId, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("sections")
        .delete()
        .eq("id", sectionId);

      if (error) {
        throw error;
      }
      return sectionId; // Return the ID of the deleted section
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  projects: [],
  currentSections: [], // New state to store sections for the current project
  currentResources: [], // New state to store resources for the current section
  loading: false,
  error: null,
};

const mathPlatformSlice = createSlice({
  name: "mathPlatform",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSection.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload); // Add new section to state
        state.error = null;
      })
      .addCase(addSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        ); // Remove deleted section from state
        state.error = null;
      })
      .addCase(deleteSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSectionsByProjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentSections = []; // Clear previous sections when fetching new ones
      })
      .addCase(fetchSectionsByProjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSections = action.payload;
        state.error = null;
      })
      .addCase(fetchSectionsByProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentSections = [];
      })
      .addCase(fetchResourcesBySectionId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentResources = []; // Clear previous resources when fetching new ones
      })
      .addCase(fetchResourcesBySectionId.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResources = action.payload;
        state.error = null;
      })
      .addCase(fetchResourcesBySectionId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentResources = [];
      })
      .addCase(uploadResourceToSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadResourceToSection.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResources.push(action.payload);
        state.error = null;
      })
      .addCase(uploadResourceToSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteResourceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResourceById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResources = state.currentResources.filter(
          (r) => r.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteResourceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSectionToProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSectionToProject.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSections.push(action.payload); // Add new section to currentSections
        state.error = null;
      })
      .addCase(addSectionToProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSectionFromProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSectionFromProject.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSections = state.currentSections.filter(
          (section) => section.id !== action.payload
        ); // Remove deleted section from currentSections
        state.error = null;
      })
      .addCase(deleteSectionFromProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = mathPlatformSlice.actions;
export default mathPlatformSlice.reducer;
