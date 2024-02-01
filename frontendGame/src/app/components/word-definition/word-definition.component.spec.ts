import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordDefinitionComponent } from './word-definition.component';

describe('WordDefinitionComponent', () => {
  let component: WordDefinitionComponent;
  let fixture: ComponentFixture<WordDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordDefinitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
