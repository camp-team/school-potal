import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { EditorComponent } from '../editor/editor/editor.component';

@Injectable({
  providedIn: 'root',
})
export class EditorGuard implements CanDeactivate<EditorComponent> {
  canDeactivate(
    component: EditorComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.form.pristine || component.isComplete) {
      console.log('check');

      return true;
    }
    console.log('conf');

    const confirmation = window.confirm(
      '作業中の内容が失われますがよろしいですか？'
    );

    return of(confirmation);
  }
}
