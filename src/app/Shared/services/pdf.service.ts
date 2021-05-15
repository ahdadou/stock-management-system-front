import { CartOrder } from 'src/app/Shared/services/order.service';
import { Injectable } from '@angular/core';
import { Invoice } from 'src/app/Components/testpdf/testpdf.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  invoice: CartOrder;
  constructor() {}

  generatePDF(invoices, client) {
    this.invoice = invoices;
    console.log('from pdf service  : ');

    console.log(client);
    console.log(this.invoice);

    let docDefinition = {
      content: [
        // {
        //   text: 'ELECTRONIC SHOP',
        //   fontSize: 16,
        //   alignment: 'center',
        //   color: '#047886'
        // },
        {
          text: 'FACTURE',
          fontSize: 20,
          bottom: 20,
          bold: true,
          alignment: 'left',
          decoration: 'underline',
          color: 'skyblue',
        },
        {
          margin: [0, 0, 0, 30],
          text: new Date().toDateString(),
          fontSize: 10,
          bottom: 20,
          alignment: 'left',
          color: 'gray',
        },
        {
          columns: [
            {
              text: 'Émetteur',
              bold: true,
              alignment: 'left',
              decoration: 'underline',
            },
            {
              text: 'Destinataire',
              bold: true,
              alignment: 'right',
              decoration: 'underline',
            },
          ],
        },
        {
          margin: [0, 0, 0, 30],
          columns: [
            [
              {
                margin: [0, 10, 0, 0],
                text: 'Ressort Boughaz',
                bold: true,
                alignment: 'left',
              },
              { text: 'Franche zone de tetouan N 15', alignment: 'left' },
              { text: 'RessortBoughaz@gmail', alignment: 'left' },
            ],
            [
              {
                margin: [0, 10, 0, 0],
                text: client.firstname,
                bold: true,
                alignment: 'right',
              },
              { text: client.address, alignment: 'right' },
              { text: client.email, alignment: 'right' },
              { text: client.phone, alignment: 'right' },
            ],
          ],
        },
        {
          text: 'Order Details',
          style: 'sectionHeader',
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Id Produit', style: 'filledHeader' },
                { text: 'Prix unitaire HT', style: 'filledHeader' },
                { text: 'Quantite', style: 'filledHeader' },
                { text: 'TVA', style: 'filledHeader' },
                { text: 'Total HT', style: 'filledHeader' },
              ],
             

              ...this.invoice.lignes.map(p => ([
                p.idProduct, p.prixht,p.quantity,p.tva + '%', p.totalHT
              ])),



             
            ],
          },

          // this.invoice.lignes.forEach(p =>{ {p.idProduct, p.prixht,p.tva, p.quantity, p.totalHT}}),

          // table: {
          //   headerRows: 1,
          //   widths: ['*', 'auto', 'auto', 'auto'],

          //   body: [
          //     ['Product', 'Price', 'Quantity', 'Amount'],
          //     ...this.invoice.products.map(p => ([p.name, p.price, p.qty, (p.price*p.qty).toFixed(2)])),
          //     [{text: 'Total Amount', colSpan: 3}, {}, {}, this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)]
          //   ]
          // }
        },

        {
          margin: [0, 20, 0, 0],
          columns: [
            [
              { text: 'Total HT', style: 'totalstyle' },

              { text: 'Total TTC', style: 'totalstyle' },
            ],
            [
              {
                text: this.invoice.lignes
                  .reduce((sum, p) => sum + p.totalHT, 0)
                  .toFixed(2) + 'DH',
                style: 'totalstyle2',
              },

              {
                text: this.invoice.lignes
                  .reduce((sum, p) => sum + p.totalTTC, 0)
                  .toFixed(2) + 'DH',
                style: 'totalstyle2',
              },
            ],
          ],
        },
      ],
      styles: {
        filledHeader: {
          bold: true,
          fontSize: 14,
          color: 'white',
          fillColor: '#AAAAAA',
          alignment: 'center',
        },
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
        totalstyle: {
          bold: true,
          fontSize: 14,
          color: 'black',
          alignment: 'right',
        },
        totalstyle2: {
          bold: true,
          fontSize: 14,
          color: 'gray',
          alignment: 'right',
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
