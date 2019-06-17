import { Component, OnInit } from '@angular/core';
import { DataStoreService } from './../data-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public services:DataStoreService) { }

  ngOnInit() {
  }

}
