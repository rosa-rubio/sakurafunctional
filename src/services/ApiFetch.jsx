import axios from "axios";

export default function ApiFetch() {
  return axios.get('https://6388b6e5a4bb27a7f78f96a5.mockapi.io/sakura-cards/')
    .then((res) => res.data)
    .catch((e) => {
      throw new Error("Sorry, there has been an error!");
    });
}