import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {
  private router: Router;

  constructor(private router1: Router) {
    this.router = router1;
  }

  ngOnInit() {
  }

  goToRendezvous() {
    this.router.navigate(['/priseRdvStd']);
  }
}
