import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { Badge } from 'src/app/models/badge.model';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {

  @Input() badge: Badge;
  @Input() canEdit: boolean = true;
  @Output() onBadgeUpdate = new EventEmitter<Badge>();

  isProBadge: boolean;
  isMegaProBadge: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isProBadge = (this.badge.img.indexOf('4') != -1);
    this.isMegaProBadge = (this.badge.img.indexOf('5') != -1);
  }

  badgeToggler(): void {
    if (this.canEdit) {
      this.badge.owned = !this.badge.owned;
      this.onBadgeUpdate.emit(this.badge);
    }
  }

}
