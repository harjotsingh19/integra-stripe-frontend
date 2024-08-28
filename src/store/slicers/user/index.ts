// import { createSlice } from '@reduxjs/toolkit';

// interface IInitialStateProps {
//   userList?: any;
//   interestedUserList?: any;
//   totalCount: number;
//   interestedUserTimeStamp: number;
//   revenuAddedUsersList: any;
//   revenuAddedUserCount: number;
// }

// const initialState: IInitialStateProps = {
//   userList: [],
//   interestedUserList: [],
//   totalCount: 0,
//   interestedUserTimeStamp: 0,
//   revenuAddedUsersList: [],
//   revenuAddedUserCount: 0,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,

//   reducers: {
//     getAll: (state, data) => {
//       state.userList = data?.payload?.records;
//       state.totalCount = data?.payload?.totalCount;
//     },
//   },
// });

// export const { getAll } = userSlice.actions;
// export default userSlice.reducer;
