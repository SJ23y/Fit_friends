import './loader.css';

function Loader(): JSX.Element {
  return (
    <div className="lds-roller">
      Loading ...
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
