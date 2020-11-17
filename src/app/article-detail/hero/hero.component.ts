import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Article } from 'src/app/interfaces/article';
import { Comment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  @Input() article: Article;

  rating: number;
  ratings: number[];

  comments$: Observable<Comment[]> = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = params.get('articleId');
      return this.commentService.getCommentsByArticleId(id);
    })
  );

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.comments$.subscribe((comments) => {
      console.log(comments);

      this.ratings = comments.map((comment) => comment.rating);
      console.log(this.ratings);
    });
  }

  get averageRating() {
    if (!this.ratings?.length) {
      return null;
    }
    const sumRating: number = this.ratings.reduce((sum, num) => {
      return sum + num;
    });
    return Math.round((sumRating / this.ratings.length) * 10) / 10;
  }
}
