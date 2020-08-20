import { Injectable } from '@angular/core';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private exportAsService: ExportAsService) { }

  exportElement(elementId: string, fileType: SupportedExtensions, fileName: string = `Export_${new Date().getTime()}`) {
    let exportAsConfig: ExportAsConfig = {
      type: fileType, // the type you want to download
      elementIdOrContent: elementId, // the id of html/table element
    }
    // download the file using old school javascript method
    this.exportAsService.save(exportAsConfig, fileName).subscribe(() => {
      console.log('export start');
      
    });
  }
}
