import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import pptxgen from 'pptxgenjs'
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ConversorPowerpointService {

  constructor(private spinner: NgxSpinnerService) { }

  public captureScreenPPT(element: any, title: any, optionsPrint = null) {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);

    var options: any;
    const div = document.getElementById(element) as any;

    if (optionsPrint != null) {
      options = optionsPrint;
    } else {
      options = {
        width: 10,   // Altura do Slide em Inches
        height: 7.5, // Altura do Slide em Inches
        x: '0%',     // Posição Horizontal
        y: '0%',     // Posição Vertical
        w: '100%',   // Largura
        h: '100%'    // Altura
      }
    }

    var pptx = new pptxgen()
    pptx.title = title;
    title + '.pptx'
    pptx.defineLayout({ name: 'divSize', width: options.width, height: options.height });

    // Seta o layout com o nome personalizado.
    pptx.layout = 'divSize'


    let slide = pptx.addSlide();
    domtoimage.toPng(div).then((imgData) => {
      slide.addImage({
        data: imgData,
        x: options.x, // Posição Horizontal
        y: options.y, // Posição Vertical
        w: options.w, // Largura
        h: options.h  // Altura
      });

      pptx.writeFile({ fileName: title + '.pptx' });
    });
  }


  public captureScreenPPTAlternative(element: any, title: any, optionsPrint: any = null) {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);

    var options: any;
    const div = document.getElementById(element) as any;
    options = this.formatarTamanhoPpt(element);

    // if (optionsPrint != null) {
    //   options = optionsPrint;
    // } else {
    //   options = {
    //     width: 10,   // Altura do Slide em Inches
    //     height: 7.5, // Altura do Slide em Inches
    //     x: '0%',     // Posição Horizontal
    //     y: '0%',     // Posição Vertical
    //     w: '100%',   // Largura
    //     h: '100%'    // Altura
    //   }
    // }

    var pptx = new pptxgen()
    pptx.title = title;
    pptx.defineLayout({ name: 'divSize', width: options.width, height: options.height });

    // Seta o layout com o nome personalizado.
    pptx.layout = 'divSize'


    let slide = pptx.addSlide();
    html2canvas(div, { scrollY: -window.scrollY, scale: 2 }).then(canvas => {
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      slide.addImage({
        data: imgData,
        x: options.x, // Posição Horizontal
        y: options.y, // Posição Vertical
        w: options.w, //  html2canvas(div, options).then(canvas =>
        h: options.h  // Altura
      });

      pptx.writeFile({ fileName: title + '.pptx' });
    });
  }

  formatarTamanhoPpt(elementId: string) {
    let clientWidth: number = 0;
    let clientHeight: number = 0;
    if (document.getElementById(elementId)) {
      const element = <HTMLElement>document.getElementById(elementId);
      clientWidth = element.clientWidth;
      clientHeight = element.clientHeight;
      clientWidth = clientWidth / 100;
      clientHeight = clientHeight / 100;
      return {
        width: Math.abs(clientWidth), // Largura do Slide em Inches
        height: Math.abs(clientHeight), // Altura do Slide em Inches
        x: '0%', // Posição Horizontal
        y: '0%', // Posição Vertical
        w: '100%', // Largura
        h: '100%' // Altura
      }
    } else return {}
  }
}
