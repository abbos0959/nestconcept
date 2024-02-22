import { Test, TestingModule } from '@nestjs/testing';
// import { YourService } from './your.service';
import { ConfigService } from '@nestjs/config';

describe('YourService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: ConfigService,
          useValue: {
            // Mock methods or properties of ConfigService here as needed
          },
        },
      ],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
