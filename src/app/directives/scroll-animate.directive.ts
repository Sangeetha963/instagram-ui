import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
})
export class ScrollAnimateDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.checkAndAnimate();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkAndAnimate();
  }

  private checkAndAnimate() {
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const isInView = rect.top <= windowHeight - 100 && rect.bottom >= 100;

    if (isInView) {
      this.renderer.addClass(element, 'animate-zoom');
    } else {
      this.renderer.removeClass(element, 'animate-zoom');
    }
  }
}
