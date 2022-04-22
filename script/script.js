let openPopup = document.querySelector('.profile__editbtn');
let popupContainer = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let formName = document.querySelector('.popup__text_type_name');
let formJob = document.querySelector('.popup__text_type_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

function editPopup() {
    popupContainer.classList.add("popup_opened");
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
}

function editFormClose() {
    popupContainer.classList.remove("popup_opened");
}

function editFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileJob.textContent = formJob.value;
    editFormClose();
}

openPopup.addEventListener("click", editPopup);
popupClose.addEventListener("click", editFormClose);
formElement.addEventListener("submit", editFormSubmit);
