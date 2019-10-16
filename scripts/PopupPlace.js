import PopupImage from './PopupImage';

export default class PopupPlace extends PopupImage {
  constructor(windowPopup, openPopupButton, hendlerSubmit) {
    super(windowPopup);

    // текст ошибок в input
    this.ERROR_TEXT = 'Должно быть от 2 до 30 символов';
    this.ERROR_URL = 'Здесь должна быть ссылка';

    // нажатие кнопки для открытия popup
    this.hendlerPopupOpen = this.hendlerPopupOpen.bind(this);
    this.openPopupButton = openPopupButton;
    this.openPopupButton.addEventListener('click', this.hendlerPopupOpen);

    // форма попапа
    this.popupForm = windowPopup.querySelector('.popup__form');
    this.inputs = this.popupForm.querySelectorAll('.popup__input');

    this.hendlerInputForm = this.hendlerInputForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.hendlerInput = this.hendlerInput.bind(this);

    this.popupForm.addEventListener('input', this.hendlerInputForm);
    this.popupForm.addEventListener('submit', this.submitForm);
    this.initalInputsListener();
    // Делаем при нажатии кнопки формы
    this.hendlerSubmit = hendlerSubmit;
  }
  // методы

  // Добавление слушателей для inputs

  initalInputsListener() {
    Object.keys(this.inputs).forEach(index => {
      this.inputs[index].addEventListener('input', this.hendlerInput);
    });
  }

  // очистка отображения ошибок
  clearErrorLabel() {
    Object.keys(this.inputs).forEach(index => {
      this.popupForm.querySelector(`.popup__error_${this.inputs[index].name}`).textContent = '';
    });
  }

  // Валидация инпута с отображением ошибок

  static validInput(input, errorLabel, ERROR_DESCRIPTION) {
    if (input.value.length === 0) {
      document.querySelector(errorLabel).textContent = 'Это обязательное поле';
    } else if (!input.checkValidity()) {
      document.querySelector(errorLabel).textContent = ERROR_DESCRIPTION;
    } else {
      document.querySelector(errorLabel).textContent = '';
      return true;
    }
    return false;
  }
  // обработчик ввода в input

  hendlerInput(event) {
    this.popupForm.querySelector(`.popup__error_${event.target.name}`).textContent = '';
    let errorStr = '';
    if (event.target.type === 'text') errorStr = this.ERROR_TEXT;
    if (event.target.type === 'url') errorStr = this.ERROR_URL;
    PopupPlace.validInput(event.target, `.popup__error_${event.target.name}`, errorStr);
  }
  // обработчик ввода в form

  hendlerInputForm() {
    this.popupForm.querySelector('.popup__button').setAttribute('disabled', true);

    const valid = !Object.keys(this.inputs).some(index => {
      return !this.inputs[index].checkValidity() || this.inputs[index].value === '';
    });

    if (valid) this.popupForm.querySelector('.popup__button').removeAttribute('disabled');
  }
  // Обработчик нажатия кнопки для открытия popup

  hendlerPopupOpen() {
    this.popupForm.reset();
    this.clearErrorLabel();
    this.popupForm.querySelector('.popup__button').setAttribute('disabled', true);
    this.open();
  }

  // Обработчик нажатия кнопки для добавления карточки

  submitForm(event) {
    const { name, link } = this.popupForm.elements;
    const item = {};

    [item.name, item.link] = [name.value, link.value];

    const img = new Image();
    img.onload = () => this.hendlerSubmit(item);
    img.onerror = () => alert('Ошибка загрузки рисунка');
    img.src = item.link;

    event.preventDefault();
    this.popupForm.reset();
    this.close();
  }
}
