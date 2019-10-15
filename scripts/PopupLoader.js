class PopupLoader {
  constructor(windowPopup) {
    this.popup = windowPopup;
  }

  open() {
    this.popup.classList.add('popup_is-opened');
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
  }
}
