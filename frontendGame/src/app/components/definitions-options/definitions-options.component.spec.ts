import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitionsOptionsComponent } from './definitions-options.component';

describe('DefinitionsOptionsComponent', () => {
  let component: DefinitionsOptionsComponent;
  let fixture: ComponentFixture<DefinitionsOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefinitionsOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefinitionsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
