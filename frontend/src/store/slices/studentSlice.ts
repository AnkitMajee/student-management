import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../api/supabase';
import type { Student, StudentFormData } from '../../types';

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
};

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        courses:student_courses(
          course:courses(*)
        )
      `);

    if (error) throw error;
    return data;
  }
);

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (studentData: StudentFormData) => {
    const { data, error } = await supabase
      .from('students')
      .insert([{
        name: studentData.name,
        cohort_id: studentData.cohort_id,
      }])
      .select()
      .single();

    if (error) throw error;

    // Add course associations
    if (studentData.course_ids.length > 0) {
      const courseAssociations = studentData.course_ids.map(courseId => ({
        student_id: data.id,
        course_id: courseId,
      }));

      const { error: courseError } = await supabase
        .from('student_courses')
        .insert(courseAssociations);

      if (courseError) throw courseError;
    }

    return data;
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
        state.error = null;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch students';
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      });
  },
});

export default studentSlice.reducer;