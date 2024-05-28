import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('textParagraph', { static: false }) textParagraph!: ElementRef;

  ngAfterViewInit(): void {
    const text: HTMLElement = this.textParagraph.nativeElement;
    text.innerHTML = text.innerText.split("").map((char, i) => 
      `<span class="char" style="left: 50%;position: absolute;transform-origin: 0 120px;transform:rotate(${i * 5.1}deg)">${char}</span>`
    ).join("");
  }
}