import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, QueryRunner, Repository } from 'typeorm';

import { ApplicationConfig } from '@/config/application.config';
import { Media } from '@/entity/media.entity';
import { AppLogger } from '@/shared/logger/app-logger';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';

@Injectable()
export class MediaService {
  private readonly region;
  private readonly accessKeyId;
  private readonly secretAccessKey;
  private readonly publicBucketName;

  constructor(
    @InjectRepository(Media) private mediaRepository: Repository<Media>,
    private log: AppLogger,
  ) {
    this.region = ApplicationConfig.S3.region;
    this.accessKeyId = ApplicationConfig.S3.accessKeyId;
    this.secretAccessKey = ApplicationConfig.S3.secretAccessKey;
    this.publicBucketName = ApplicationConfig.S3.publicBucketName;
  }

  async save(media: Media, transaction?: QueryRunner) {
    if (transaction) {
      return await transaction.manager.save(this.mediaRepository.create(media));
    }
    return await this.mediaRepository.save(this.mediaRepository.create(media));
  }

  getLinkMediaKey(media_key) {
    const s3 = this.getS3();
    try {
      return s3.getSignedUrl('getObject', {
        Key: media_key,
        Bucket: this.publicBucketName,
        Expires: 60 * 60 * 12,
      });
    } catch (error) {
      this.log.error('Error getting media key #', error);
    }
  }

  async upload(file) {
    const objectId = randomUUID();
    const arr_name = file.originalname.split('.');
    const extension = arr_name.pop();
    const name = arr_name.join('.');
    const key = objectId + '/' + this.slug(name) + '.' + extension;
    const data = {
      name: name,
      file_name: String(file.originalname),
      mime_type: file.mimetype,
      size: file.size,
      key: key,
    };
    await this.uploadS3(file.buffer, key, file.mimetype);
    return await this.mediaRepository.create(data);
  }

  private async uploadS3(file_buffer, key, content_type) {
    const s3 = this.getS3();
    const params = {
      Bucket: this.publicBucketName,
      Key: key,
      Body: file_buffer,
      ContentType: content_type,
      ACL: 'public-read',
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  private getS3() {
    return new S3({
      region: this.region,
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    });
  }

  async updateACL(media_id: number) {
    const media = await this.mediaRepository.findOneBy({
      id: media_id,
    } as FindOptionsWhere<Media>);
    const s3 = this.getS3();
    s3.putObjectAcl(
      {
        Bucket: this.publicBucketName,
        Key: media.key,
        ACL: 'public-read',
      },
      (err, _) => {
        this.log.error('Update media# ', err);
      },
    );
    return (
      s3.endpoint.protocol +
      '//' +
      this.publicBucketName +
      '.' +
      s3.endpoint.hostname +
      '/' +
      media.key
    );
  }

  private slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from =
      'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;';
    const to =
      'AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------';
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }
}
