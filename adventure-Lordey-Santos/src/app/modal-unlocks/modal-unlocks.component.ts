import { Component } from '@angular/core';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-modal-unlocks',
  template: `
      <div (click)="onContainerClicked($event)" class="modal fade" tabindex="-1"
      [ngClass]="{'in': visibleAnimate}"
            [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity':
      visibleAnimate ? 1 : 0}">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <ng-content select=".app-modal-header"></ng-content>
              </div>
              <div class="modal-body">
                <ng-content select=".app-modal-body"></ng-content>
              </div>
              <div class="modal-footer">
                <ng-content select=".app-modal-footer"></ng-content>
              </div>
            </div>
          </div>
        </div>
    `
})

export class ModalUnlocksComponent {
  public visibleAnim = false;
  public visible = false;
  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnim = true, 100);
  }
  public hide(): void {
    this.visibleAnim = false;
    setTimeout(() => this.visible = false, 300);
  }
  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
}
