export const Button = ({
  icon = '',
  text = '',
  onClick = () => { },
  styleComponent = {},
  color = '',
}) => {
  return (
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      style={{ ...styleComponent, backgroundColor: color || undefined }}
      onClick={onClick}
    >
      <p className="text-button_easystock p-0 m-0">{text}</p>
      <i className={`bi bi-${icon} text-2xl leading-none txt_primary_easystock`}></i>
    </button>
  );
};
