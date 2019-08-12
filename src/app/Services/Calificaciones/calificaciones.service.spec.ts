import { TestBed } from '@angular/core/testing';

import { CalificacionesService } from './calificaciones.service';

describe('CalificacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalificacionesService = TestBed.get(CalificacionesService);
    expect(service).toBeTruthy();
  });
});
