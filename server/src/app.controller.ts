import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorators';
import { Role } from './auth/enums/roles.enum';
import { Roles } from './auth/decorators/roles.decorator';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/dashboard')
  getDashboard(): string {
    return 'Dashboard';
  }

  @Roles(Role.VENDOR)
  @Get('/dashboard/vendor')
  getVendorDashboard(): string {
    return 'Vendor Dashboard';
  }

  @Roles(Role.BUYER)
  @Get('/dashboard/buyer')
  getBuyerDashboard(): string {
    return 'Buyer Dashboard';
  }

  @Roles(Role.RIDER)
  @Get('/dashboard/rider')
  getRiderDashboard(): string {
    return 'Rider Dashboard';
  }
}
