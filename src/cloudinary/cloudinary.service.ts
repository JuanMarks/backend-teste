// src/cloudinary/cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { v2, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('No result returned from Cloudinary'));
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

    async deleteImageByUrl(url: string): Promise<any> {
    // Extract public_id from the URL
    const matches = url.match(/\/([^\/]+)\.[a-zA-Z]+$/);
    if (!matches) {
      throw new Error('Invalid Cloudinary URL');
    }
    const publicId = matches[1];
    return v2.uploader.destroy(publicId);
  }
}