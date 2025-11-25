import { Module } from '@nestjs/common';
import { CommentContext } from './comment.context';

@Module({
    providers: [CommentContext],
    exports: [CommentContext],
})
export class CommentContextModule {}

