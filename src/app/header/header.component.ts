import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  increaseFont() {
    const html: HTMLHtmlElement = document.querySelector('html');
    const styles: CSSStyleDeclaration = getComputedStyle(html)
    const maxFontSize: number = 20;
    const fontSize: number = parseInt(styles.fontSize);
    if (fontSize < maxFontSize) {
      html.style.fontSize = `${fontSize + 1}px`;
    }
  }

  decreaseFont() {
    const html: HTMLHtmlElement = document.querySelector('html');
    const styles: CSSStyleDeclaration = getComputedStyle(html)
    const minFontSize: number = 12;
    const fontSize: number = parseInt(styles.fontSize);
    if (fontSize > minFontSize) {
      html.style.fontSize = `${fontSize - 1}px`;
    }
  }

  restoreFont() {
    const html: HTMLHtmlElement = document.querySelector('html');
    const defaultFontSize: number = 16;
    html.style.fontSize = `${defaultFontSize}px`;
  }

}
