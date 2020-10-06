import { IPost, IPostDocument, IPostModel } from './post.types';

export async function findOneOrCreate(
  this: IPostModel,
  post: Partial<IPost>,
): Promise<IPostDocument> {
  const record = await this.findOne({ url: post.url })
    .populate({ path: 'sharedBy', select: { name: 1, avatar: 1 } })
    .populate({ path: 'likes', select: { name: 1, avatar: 1 } });
  if (record) {
    return record;
  } else {
    const created = await this.create<Partial<IPost>>(post);

    const populatedPost = (await this.findById(created._id)
      .populate({ path: 'sharedBy', select: { name: 1, avatar: 1 } })
      .populate({ path: 'likes', select: { name: 1, avatar: 1 } })) as IPostDocument;

    return populatedPost;
  }
}
