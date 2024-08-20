import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Database, push, ref, set } from '@angular/fire/database';
import { Storage, ref as storageRef, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-upload-template',
  templateUrl: './upload-template.component.html',
  styleUrls: ['./upload-template.component.css']
})
export class UploadTemplateComponent {
  private db: Database = inject(Database);
  private storage: Storage = inject(Storage);
  productForm: FormGroup;
  selectedFile: File | null = null;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  isSubmitted: boolean =false;

  constructor(private fb: FormBuilder, private location: Location) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      detailsUrl: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.valid && this.selectedFile) {
      const { name, description, detailsUrl, category } = this.productForm.value;

      // Upload the image to Firebase Storage
      const storageRefPath = `images/${this.selectedFile.name}`;
      const fileRef = storageRef(this.storage, storageRefPath);
      const uploadTask = uploadBytesResumable(fileRef, this.selectedFile);

      // Wait for the upload to complete
      try {
        await uploadTask;
        // Get download URL
        const imageUrl = await getDownloadURL(fileRef);

        // Save the product data to Realtime Database
        const productData = {
          name,
          description,
          imageUrl,
          detailsUrl,
          category
        };
        const productRef = ref(this.db, 'products');  // Save under "products" node
        await push(productRef, productData);
        console.log('Product submitted successfully!');
        this.location.back();
        this.isSubmitted =true;


      } catch (error) {
        console.error('Upload failed:', error);
      }
    } else {
      console.error('Form is invalid or no file selected');
    }
  }

  uploadWarning(){
    alert('Make sure the details enetered are correct as it cannot be reversed.')
  }
}
