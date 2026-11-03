type RemoveCardProps = {
  onConfirm: () => void;
};

export default function RemoveCard(props: RemoveCardProps) {
  return (
    <button
      className="button popup__button"
      type="button"
      onClick={props.onConfirm}
    >
      Sí
    </button>
  );
}
