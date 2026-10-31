type ConfirmDeleteProps = {
  onConfirm: () => void;
};

function ConfirmDelete(props: ConfirmDeleteProps) {
  return (
    <button className="button popup__button" type="button" onClick={props.onConfirm}>
      Sí
    </button>
  );
}

export default ConfirmDelete;