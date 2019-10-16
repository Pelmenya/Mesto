import PopupLoader from './PopupLoader';

export default class PopupImage extends PopupLoader {
  constructor(windowPopup) {
    super(windowPopup);
    this.close = this.close.bind(this);
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
  }
}
