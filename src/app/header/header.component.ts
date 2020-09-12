import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  highContrast: boolean = false;

  @Output() changeValue = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Responsável por aumentar o tamanho da fonte da página.
   */
  increaseFont() {
    const html: HTMLHtmlElement = document.querySelector('html');
    const styles: CSSStyleDeclaration = getComputedStyle(html);
    const maxFontSize: number = 20;
    const fontSize: number = parseInt(styles.fontSize);
    if (fontSize < maxFontSize) {
      html.style.fontSize = `${fontSize + 1}px`;
    }
  }

  /**
   * Responsável por diminuir o tamanho da fonte da página.
   */
  decreaseFont() {
    const html: HTMLHtmlElement = document.querySelector('html');
    const styles: CSSStyleDeclaration = getComputedStyle(html);
    const minFontSize: number = 12;
    const fontSize: number = parseInt(styles.fontSize);
    if (fontSize > minFontSize) {
      html.style.fontSize = `${fontSize - 1}px`;
    }
  }

  /**
  * Responsável por restaurar o tamanho padrão da fonte da página.
  */
  restoreFont() {
    const html: HTMLHtmlElement = document.querySelector('html');
    const defaultFontSize: number = 16;
    html.style.fontSize = `${defaultFontSize}px`;
  }

  /**
  * Responsável por habilitar o alto contraste da página.
  */
  activeHighContrast() {
    this.highContrast = !this.highContrast;
    this.changeValue.emit({ newValue: this.highContrast });
  }

  highContrastTooltip() {
    if (!this.highContrast) {
      return 'Habilitar alto contraste'
    }

    return 'Desabilitar alto contraste'
  }

}
