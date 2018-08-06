import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconXCircle,IconCheckCircle,IconCamera } from 'angular-feather';

const icons = [
	IconXCircle,IconCheckCircle,IconCamera
];
@NgModule({
  imports: [
    CommonModule
  ],
  exports:icons,
  declarations: []
})
export class IconsModule { }
