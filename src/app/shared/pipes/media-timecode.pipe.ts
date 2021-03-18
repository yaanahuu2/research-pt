import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mediaTimecode'
})
export class MediaTimecodePipe implements PipeTransform {

  transform(currentTime: number): string {
    var mN = Math.floor(currentTime / 60);
    var sN = Math.floor(currentTime - Number(mN) * 60);
    var m: string = this.formatNumberWithLeadingZeroes(mN);
    var s: string = this.formatNumberWithLeadingZeroes(sN);
    return `${m}:${s}`;
  }

  private formatNumberWithLeadingZeroes(n: number): string {
    return n < 10 ? "0" + String(n) : String(n);
  }

}
