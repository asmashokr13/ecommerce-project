import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [Navbar],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {}
