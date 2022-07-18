import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  user: any={ title: "Sakib Ahmed", email: "33saki33@gmail.com"};
  posts: any[]=[{title: "Sakib Ahmed", status: "This is a status test"}, 
                {title: "Mahid Hoq", status: "asfasfjaisuhfaishfaishfuauishfjauischascybausychaisdhaisuhfauishf"},
                {title: "Tsukushima", status: "Tired"},
                {title: "Kakashi", status: "Yo"}]
  constructor() { }

  ngOnInit(): void {
  }

}
