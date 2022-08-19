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
const formElementProfile = popupProfileContainer.querySelector('.popup__form');
const formNameProfile = popupProfileContainer.querySelector('.popup__text_type_name');
const formJobProfile = popupProfileContainer.querySelector('.popup__text_type_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

openProfileFormPopup.addEventListener('mousedown', openProfilePopup);
formElementProfile.addEventListener("submit", submitProfileForm);

const openPlaceFormPopup = document.querySelector('.profile__addbtn');
const popupPlaceContainer = document.querySelector('.popup_place');
const placeSubmitBtn = popupPlaceContainer.querySelector(".popup__submit");
const formElementPlace = popupPlaceContainer.querySelector('.popup__form');
const formTitlePlace = popupPlaceContainer.querySelector('.popup__text_type_title');
const formLinkPlace = popupPlaceContainer.querySelector('.popup__text_type_link');

openPlaceFormPopup.addEventListener('mousedown', function () { openCardPopup(popupPlaceContainer) });
formElementPlace.addEventListener("submit", submitPlaceForm);

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
}

function openProfilePopup() {
    openPopup(popupProfileContainer);
    fillProfileForm();
}

function fillProfileForm() {
    formNameProfile.value = profileName.textContent;
    formJobProfile.value = profileJob.textContent;
}

function openCardPopup() {
    placeSubmitBtn.disabled = true;
    placeSubmitBtn.classList.add("popup__submit_inactive");
    openPopup(popupPlaceContainer);
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeByEscape);
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
    const imageElement = listItem.querySelector(".gallery__image");
    imageElement.src = card.link;
    imageElement.alt = `a photo of ${card.name}`;
    listItem.querySelector(".gallery__text").textContent = card.name;
    const newHeart = listItem.querySelector('.gallery__heart');
    newHeart.addEventListener("click", function clickLike() {
        newHeart.classList.toggle("gallery__heart_clicked");
    });
    const newTrash = listItem.querySelector('.gallery__trash');
    newTrash.addEventListener("click", function (evt) {
        evt.target.closest('.gallery__item').remove();
    });
    const newText = listItem.querySelector('.gallery__text');
    imageElement.addEventListener('click', function () {
        openPopup(popupImageContainer);
        fillPopupImage(imageElement, newText);
    });

    return listItem;
}