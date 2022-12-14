// let Database = {
//   cindy: {
//     reminders: [
//       { id: 1, title: "abc", description: "abcabc", completed: false },
//     ],
//   },
//   alex: {
//     reminders: [],
//   },
// };

// module.exports = Database;

const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    reminders: [
      { id: 1, title: "its jim", description: "abcabc", completed: false },
    ],
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    reminders: [
      { id: 1, title: "its jongy", description: "abcabc", completed: false },
    ],
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    reminders: [
      { id: 1, title: "chen here", description: "abcabc", completed: false },
    ],
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    return null;
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

module.exports = { database, userModel };
