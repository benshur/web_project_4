const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

const galleryContainer = document.querySelector('.gallery__container');
const galleryItemTemplate = document.querySelector('#gallery__template').content;
const popupImageContainer = document.querySelector('.popup-image');
const popupImageImage = popupImageContainer.querySelector('.popup-image__image');
const popupImageText = popupImageContainer.querySelector('.popup-image__text');

initialCards.forEach(renderCard);

const openProfileFormPopup = document.querySelector('.profile__editbtn');
const popupProfileContainer = document.querySelector('.popup_profile');
const popupProfileClose = popupProfileContainer.querySelector('.popup__close');
const formElementProfile = popupProfileContainer.querySelector('.popup__form');
const formNameProfile = popupProfileContainer.querySelector('.popup__text_type_name');
const formJobProfile = popupProfileContainer.querySelector('.popup__text_type_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

openProfileFormPopup.addEventListener('click', openProfilePopup);
popupProfileClose.addEventListener('click', function () { closePopup(popupProfileContainer) });
formElementProfile.addEventListener("submit", submitProfileForm);

const openPlaceFormPopup = document.querySelector('.profile__addbtn');
const popupPlaceContainer = document.querySelector('.popup_place');
const popupPlaceClose = popupPlaceContainer.querySelector('.popup__close');
const formElementPlace = popupPlaceContainer.querySelector('.popup__form');
const formTitlePlace = popupPlaceContainer.querySelector('.popup__text_type_title');
const formLinkPlace = popupPlaceContainer.querySelector('.popup__text_type_link');

openPlaceFormPopup.addEventListener('click', function () { openPopup(popupPlaceContainer) });
popupPlaceClose.addEventListener('click', function () { closePopup(popupPlaceContainer) });
formElementPlace.addEventListener("submit", submitPlaceForm);

const placeList = galleryContainer.querySelectorAll('.gallery__item');
const placeLikeBtnArray = galleryContainer.querySelectorAll('.gallery__heart');
const placeImageArray = galleryContainer.querySelectorAll('.gallery__image');
const placeTextArray = galleryContainer.querySelectorAll('.gallery__text');
const placeTrashArray = galleryContainer.querySelectorAll('.gallery__trash');
const popupImageCloseBtn = popupImageContainer.querySelector('.popup-image__close');

popupImageCloseBtn.addEventListener("click", function () { closePopup(popupImageContainer) });

function openProfilePopup() {
    openPopup(popupProfileContainer);
    fillProfileForm();
}

function fillProfileForm() {
    formNameProfile.value = profileName.textContent;
    formJobProfile.value = profileJob.textContent;
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = formNameProfile.value;
    profileJob.textContent = formJobProfile.value;
    closePopup(popupProfileContainer);
}

function submitPlaceForm(evt) {
    evt.preventDefault();
    const card = ({
        name: formTitlePlace.value,
        link: formLinkPlace.value
    });
    renderCard(card);
    closePopup(popupPlaceContainer);
    formElementPlace.reset();
}

function fillPopupImage(newImage, newText) {
    popupImageImage.setAttribute("style", "background-image: url(" + newImage.src + ")");
    popupImageText.textContent = newText.textContent;
}

function renderCard(card) {
    const cardElement = createCard(card);
    galleryContainer.prepend(cardElement);
}

function createCard(card) {
    const listItem = galleryItemTemplate.cloneNode(true);
    listItem.querySelector(".gallery__image").src = card.link;
    listItem.querySelector(".gallery__text").textContent = card.name;
    let newHeart = listItem.querySelector('.gallery__heart');
    newHeart.addEventListener("click", function clickLike() {
        newHeart.classList.toggle("gallery__heart_clicked");
    });
    let newTrash = listItem.querySelector('.gallery__trash');
    newTrash.addEventListener("click", function deletePlace() {
        this.parentNode.remove();
    });
    let newImage = listItem.querySelector('.gallery__image');
    let newText = listItem.querySelector('.gallery__text');
    newImage.addEventListener('click', function () {
        openPopup(popupImageContainer);
        fillPopupImage(newImage, newText);
    });

    return listItem;
}