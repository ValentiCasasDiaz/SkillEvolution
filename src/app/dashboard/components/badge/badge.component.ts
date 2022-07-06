import { Component, OnInit, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {

  @Input() img: string;
  canEdit: boolean = true; //TODO: es un Input

  badgeEnabled: boolean = false;
  isProBadge: boolean;
  isMegaProBadge: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isProBadge = (this.img.indexOf('4') != -1);
    this.isMegaProBadge = (this.img.indexOf('5') != -1);
  }

  badgeToggler(): void {
    if (this.canEdit)
      this.badgeEnabled = !this.badgeEnabled;
  }

}
