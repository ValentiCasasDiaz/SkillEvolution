import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {

  @Input() img: string;
  canEdit: boolean = true; //TODO: es un Input

  badgeEnabled: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  badgeToggler(): void {
    if (this.canEdit)
      this.badgeEnabled = !this.badgeEnabled;
  }

}
