import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Angular Material */
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatSelectModule }      from '@angular/material/select';
import { MatInputModule }       from '@angular/material/input';
import { MatButtonModule }      from '@angular/material/button';
import { MatCardModule }        from '@angular/material/card';
import { MatToolbarModule }     from '@angular/material/toolbar';
import { MatIconModule }        from '@angular/material/icon';
import { MatTableModule }       from '@angular/material/table';
import { MatListModule }        from '@angular/material/list';
import { MatExpansionModule }   from '@angular/material/expansion';
import { MatDividerModule }     from '@angular/material/divider';
import { MatDialogModule }      from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule }     from '@angular/material/tooltip';

/** Conjunto único de módulos Material que compartiremos */
const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatListModule,
  MatExpansionModule,
  MatDividerModule,
  MatDialogModule,
  MatProgressBarModule,
  MatTooltipModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,  
  ],
  exports: [
    ...MATERIAL_MODULES,   
  ],
})
export class MaterialModule {}
