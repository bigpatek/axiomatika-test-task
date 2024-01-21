import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-EditDialog',
  templateUrl: './EditDialog.component.html',
  styleUrls: ['./EditDialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }



  ngOnInit() {
  }

}
