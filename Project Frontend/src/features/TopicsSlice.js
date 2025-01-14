import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  trendingTopics: [],
  channelWiseTrendingTopics: [],
  loading: false,
  error: null,
};

export const getMostTrendingTopics = createAsyncThunk(
  "topics/mostTrendingTopics",
  async (data) => {
    console.log("The data for body of request is: ", data);
    const res = await fetch(
      "http://127.0.0.1:8000/most-frequent-entity-query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   start_date: "2020-05-01",
        //   end_date: "2024-12-31",
        //   limit: 5,
        // }),
        body: JSON.stringify(data),
      }
    );

    const response = await res.json();

    console.log(response);

    return response;
  }
);

export const getChannelWiseTrendingTopics = createAsyncThunk(
  "topics/channelwiseTrendingTopics",
  async (data) => {
    const res = await fetch(
      "http://127.0.0.1:8000/most-frequent-entity-query-byChannel",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const response = await res.json();

    console.log(response);

    return response;
  }
);

export const TopicsSlice = createSlice({
  name: "trendingTopics",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAction(getMostTrendingTopics.pending), (state) => {
        state.loading = true;
      })
      .addCase(
        createAction(getMostTrendingTopics.fulfilled),
        (state, action) => {
          state.loading = false;
          state.trendingTopics = action.payload;
          // console.log("The topics slice is: " , state.trendingTopics[0].data.length)
          // localStorage.setItem("trendingTopics", JSON.stringify(action.payload)); // Save to localStorage
        }
      )
      .addCase(
        createAction(getMostTrendingTopics.rejected),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(createAction(getChannelWiseTrendingTopics.pending), (state) => {
        state.loading = true;
      })
      .addCase(
        createAction(getChannelWiseTrendingTopics.fulfilled),
        (state, action) => {
          state.loading = false;
          console.log("The channel wise trending topics payload is: " , action.payload)
          state.channelWiseTrendingTopics = action.payload;
          // console.log("The topics slice is: " , state.trendingTopics[0].data.length)
          // localStorage.setItem("trendingTopics", JSON.stringify(action.payload)); // Save to localStorage
        }
      )
      .addCase(
        createAction(getChannelWiseTrendingTopics.rejected),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default TopicsSlice.reducer;
