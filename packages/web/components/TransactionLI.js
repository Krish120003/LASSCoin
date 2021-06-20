export default function TransactionLI(props) {
  return (
    <li>
      <span>
        <h6>Height {props.height}</h6>
        <p>{props.timestamp}</p>
      </span>
      <span>{props.value}</span>
    </li>
  );
}
