/** Handy demo endpoints — not pre-filled into the editor. */
export const SAMPLE_USERS_URL = "https://jsonplaceholder.typicode.com/users";

export const SAMPLE_REQUESTS = [
  {
    id: "jsonplaceholder-users",
    label: "Users API",
    hint: "JSONPlaceholder",
    url: SAMPLE_USERS_URL,
  },
] as const;
