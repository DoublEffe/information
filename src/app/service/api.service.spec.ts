import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({});
    service = new ApiService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('all methods should be called', () => {

    it('should call loadInfoNews', () => {
      httpClientSpy.get('fake newsstories url')
      expect(httpClientSpy.get).toHaveBeenCalled()
      expect(httpClientSpy.get).toHaveBeenCalledWith('fake newsstories url')
    })
    it('should call loadItemNews', () => {
      httpClientSpy.get('fake itemnewsstories url')
      expect(httpClientSpy.get).toHaveBeenCalled()
      expect(httpClientSpy.get).toHaveBeenCalledWith('fake itemnewsstories url')
    })
    it('should call loadInfoNews', () => {
      httpClientSpy.get('fake jobsstories url')
      expect(httpClientSpy.get).toHaveBeenCalled()
      expect(httpClientSpy.get).toHaveBeenCalledWith('fake jobsstories url')
    })
    it('should call loadInfoNews', () => {
      httpClientSpy.get('fake itemjobsstories url')
      expect(httpClientSpy.get).toHaveBeenCalled()
      expect(httpClientSpy.get).toHaveBeenCalledWith('fake itemjobsstories url')
    })
  })
});
