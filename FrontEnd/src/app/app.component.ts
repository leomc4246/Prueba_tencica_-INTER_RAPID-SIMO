import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './shared/material/material.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  
  standalone: true,
  imports: [ RouterModule, MaterialModule ]   
})
export class AppComponent {}
