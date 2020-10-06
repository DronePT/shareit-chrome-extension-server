import { Document } from 'mongoose';
import { IPostDocument } from './post.types';

export async function setUpdatedAt(this: IPostDocument): Promise<void> {
  const now = new Date();
  if (!this.updatedAt || this.updatedAt < now) {
    this.updatedAt = now;
    await this.save();
  }
}

export async function sameTitle(this: IPostDocument): Promise<Document[]> {
  return this.model('post').find({ title: this.title });
}

export async function sameUser(this: IPostDocument): Promise<Document[]> {
  return this.model('post').find({ sharedBy: this.sharedBy });
}
