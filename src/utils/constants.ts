import type { PopupName } from "./types";

const API_TOKEN = "fc6ccfde-fe04-415f-bbb0-fdc81fe0b438"
const API_URL = "https://around-api.es.tripleten-services.com/v1"
const popupTitles: Record<PopupName, string> = {
  "edit-profile": "Editar perfil",
  "add-card": "Nuevo lugar",
  avatar: "Cambiar foto de perfil",
  "confirm-delete": "¿Estás seguro?",
  image: "",
};
export { API_TOKEN, API_URL, popupTitles };
