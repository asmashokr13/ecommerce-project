import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  name = '';
  email = '';
  message = '';
  submitted = false;

  onSubmit(): void {
    // No backend contact endpoint exists yet — this just confirms receipt client-side.
    this.submitted = true;
    this.name = '';
    this.email = '';
    this.message = '';
  }
}