import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-agenda-item-print',
  templateUrl: './agenda-item-print.component.html'
})
export class AgendaItemPrintComponent implements OnInit, OnChanges {

  @Input() printName: string | null = null;

  houseDocumentType: 'print' | 'document' = null;   // ST = tisk, SD = dokument - první 2 znaky
  houseDocumentNumber: string = null;   // číslo sněmovního tisku / dokumentu - další 4 znaky

  // pak jeden znak pomlčka

  houseMeetingType: 'firstReading' | 'secondReading' | 'thirdReading' | 'legislativeEmergency' | 'senateReturned' | 'presidentReturned' = null; // 5 znaků
  // 5 znaků
  // "1. čt" - první čtení, "2. čt" - druhé čtení, "3. čt" - třetí čtení, "leg.n" - legislativní nouze, "vr.sen" - vráceno senátem, "vr.pre" - vráceno prezidentem, "" anebo nic

  constructor() { }

  ngOnInit() {
    this._parseName();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.printName) {
      this.printName = changes.printName.currentValue;
      this._parseName();
    }
  }

  private _parseName() {

    if (this.printName == null || this.printName.length === 0) { 
      this.houseDocumentType = null;
      this.houseDocumentNumber = null;
      this.houseMeetingType = null;
      return; 
    }

    let printNameWithoutBrackets = this._trimBrackets();
    this._parseHouseDocumentType(printNameWithoutBrackets);
    this._parsehouseDocumentNumber(printNameWithoutBrackets);
    this._parsehouseMeetingType(printNameWithoutBrackets);
  }

  private _trimBrackets() {
    return this.printName.substring(1, this.printName.length - 1);
  }

  private _parseHouseDocumentType(printName: string) {
    let input = printName.substring(0, 2).trim();
    switch (input) {
      case 'ST':
        this.houseDocumentType = 'print';
        break;
      case 'SD':
        this.houseDocumentType = 'document';
    }
  }

  private _parsehouseDocumentNumber(printName: string) {
    let input = printName.substring(2, 6).trim();
    this.houseDocumentNumber = input;
  }

  private _parsehouseMeetingType(printName: string) {
    let input = printName.substring(7, this.printName.length).trim();
    switch (input) {
      case '1. čt':
        this.houseMeetingType = 'firstReading';
        break;
      case '2. čt':
        this.houseMeetingType = 'secondReading';
        break;
      case '3. čt':
        this.houseMeetingType = 'thirdReading';
        break;
      case 'leg.n':
        this.houseMeetingType = 'legislativeEmergency';
        break;
      case 'vr.sen':
        this.houseMeetingType = 'senateReturned';
        break;
      case 'vr.pre':
        this.houseMeetingType = 'presidentReturned';
    }
  }
}
