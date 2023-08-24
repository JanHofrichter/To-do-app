export default function ButtonComp({ label, func, buttonClass }) {
  return (
    <div>
      <button className={buttonClass} onClick={() => func()}>
        {label}
      </button>
    </div>
  );
}
