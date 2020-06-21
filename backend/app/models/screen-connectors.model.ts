export default class ScreenConnectorsModel {
  constructor(private vga: number, private hdmi: number, private displayPort: number) {}

  getVga(): number {
    return this.vga;
  }

  setVga(vga: number): void {
    this.vga = vga;
  }

  getHdmi(): number {
    return this.hdmi;
  }

  setHdmi(hdmi: number): void {
    this.hdmi = hdmi;
  }

  getDisplayPort(): number {
    return this.displayPort;
  }

  setDisplayPort(displayPort: number): void {
    this.displayPort = displayPort;
  }

}
