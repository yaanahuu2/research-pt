import { MediaTimecodePipe } from './media-timecode.pipe';

describe('MediaTimecodePipe', () => {
  it('create an instance', () => {
    const pipe = new MediaTimecodePipe();
    expect(pipe).toBeTruthy();
  });
});
