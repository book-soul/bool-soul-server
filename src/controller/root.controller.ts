import { Controller, Get } from '@nestjs/common';

@Controller()
export class RootController {

    @Get()
    index(): string {
        return 'ok';
    }

}
