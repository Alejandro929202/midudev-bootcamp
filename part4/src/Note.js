export const Note = (props) => {
  console.log({props})
  const {title, body} = props;
    return (
      <li>
        <p> {title} </p>
        <small>
          {body}
        </small>
      </li>
    )
  } 

  