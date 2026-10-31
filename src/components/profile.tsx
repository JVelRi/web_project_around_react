type ProfileProps = {
    name: string;
    about: string;
    avatar: string;
    onEditAvatar: () => void;
    onEditProfile: () => void;
    onAddCard: () => void;
};

function Profile (props: ProfileProps) {
  return (
    <section className="profile page__section">
      <div className="profile__avatar-wrapper">
        <img className="profile__image" src={props.avatar} alt="Avatar" />
        <button
          aria-label="Cambiar foto de perfil"
          className="profile__avatar-edit-button"
          type="button"
          onClick={props.onEditAvatar}
        ></button>
      </div>
      <div className="profile__info">
        <h1 className="profile__title">{props.name}</h1>
        <button
          aria-label="Editar perfil"
          className="profile__edit-button"
          type="button"
          onClick={props.onEditProfile}
        ></button>
        <p className="profile__description">{props.about}</p>
      </div>
      <button
        aria-label="Agregar tarjeta"
        className="profile__add-button"
        type="button"
        onClick={props.onAddCard}
      ></button>
    </section>
  );
}

export default Profile;