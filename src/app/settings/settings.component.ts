import { Component } from '@angular/core';
declare const SaxonJS: any;
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  xmlFile: File | null = null;
  xsltFile: File | null = null;
  transformedHtml: string = '';

  // Handle XML file upload
  onXmlFileSelected(event: any): void {
    this.xmlFile = event.target.files[0];
  }

  // Handle XSLT file upload
  onXsltFileSelected(event: any): void {
    this.xsltFile = event.target.files[0];
  }

  // Load file content as text
  loadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  // Transform XML using XSLT
  async transform(): Promise<void> {
    if (!this.xmlFile || !this.xsltFile) {
      alert('Please upload both XML and XSLT files.');
      return;
    }

    try {
      // Load XML and XSLT files
      const xmlContent = await this.loadFile(this.xmlFile);
      const xsltContent = await this.loadFile(this.xsltFile);

      // Parse the XSLT stylesheet
      const xsltProcessor = SaxonJS.transform({
        stylesheetText: xsltContent,
        sourceText: xmlContent,
        destination: 'serialized'  // Get the transformation result as serialized HTML
      });

      // Set the transformed HTML
      this.transformedHtml = xsltProcessor.principalResult as string;
    } catch (error) {
      console.error('Transformation error:', error);
      alert('There was an error during the transformation.');
    }
  }
}
