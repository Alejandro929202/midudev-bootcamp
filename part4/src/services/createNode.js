import axios from 'axios'

export const createNote = ({title, body, userID}) => {
axios.post('https://jsonplaceholder.typicode.com/posts', {title, body, userID})
    .then(response => {
      const {data} = response;
      return data;
    });
}