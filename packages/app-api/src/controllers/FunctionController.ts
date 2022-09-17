import { IsUUID, ValidateNested } from 'class-validator';
import { ITakaroQuery } from '@takaro/db';
import { APIOutput, apiResponse } from '@takaro/http';
import {
  AssignFunctionDTO,
  FunctionCreateDTO,
  FunctionOutputDTO,
  FunctionService,
  UpdateFunctionDTO,
} from '../service/FunctionService';
import { AuthenticatedRequest, AuthService } from '../service/AuthService';
import {
  Body,
  Get,
  Post,
  Delete,
  JsonController,
  UseBefore,
  Req,
  Put,
  Params,
} from 'routing-controllers';
import { CAPABILITIES } from '../db/role';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Type } from 'class-transformer';
import { ParamId } from '../lib/validators';

@OpenAPI({
  security: [{ domainAuth: [] }],
})
class FunctionOutputDTOAPI extends APIOutput<FunctionOutputDTO> {
  @Type(() => FunctionOutputDTO)
  @ValidateNested()
  data!: FunctionOutputDTO;
}

class FunctionOutputArrayDTOAPI extends APIOutput<FunctionOutputDTO[]> {
  @ValidateNested({ each: true })
  @Type(() => FunctionOutputDTO)
  data!: FunctionOutputDTO[];
}

class FunctionSearchInputAllowedFilters {
  @IsUUID()
  id!: string;
}

class FunctionSearchInputDTO extends ITakaroQuery<FunctionOutputDTO> {
  @ValidateNested()
  @Type(() => FunctionSearchInputAllowedFilters)
  filters!: FunctionSearchInputAllowedFilters;
}

@JsonController()
export class FunctionController {
  @UseBefore(AuthService.getAuthMiddleware([CAPABILITIES.READ_FUNCTIONS]))
  @ResponseSchema(FunctionOutputArrayDTOAPI)
  @Post('/function/search')
  async search(
    @Req() req: AuthenticatedRequest,
    @Body() query: FunctionSearchInputDTO
  ) {
    const service = new FunctionService(req.domainId);
    return apiResponse(await service.find(query));
  }

  @UseBefore(AuthService.getAuthMiddleware([CAPABILITIES.READ_FUNCTIONS]))
  @ResponseSchema(FunctionOutputDTOAPI)
  @Get('/function/:id')
  async getOne(@Req() req: AuthenticatedRequest, @Params() params: ParamId) {
    const service = new FunctionService(req.domainId);
    return apiResponse(await service.findOne(params.id));
  }

  @UseBefore(AuthService.getAuthMiddleware([CAPABILITIES.MANAGE_FUNCTIONS]))
  @ResponseSchema(FunctionOutputDTOAPI)
  @Post('/function')
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() data: FunctionCreateDTO
  ) {
    const service = new FunctionService(req.domainId);
    return apiResponse(await service.create(data));
  }

  @UseBefore(AuthService.getAuthMiddleware([CAPABILITIES.MANAGE_FUNCTIONS]))
  @ResponseSchema(FunctionOutputDTOAPI)
  @Put('/function/:id')
  async update(
    @Req() req: AuthenticatedRequest,
    @Params() params: ParamId,
    @Body() data: UpdateFunctionDTO
  ) {
    const service = new FunctionService(req.domainId);
    return apiResponse(await service.update(params.id, data));
  }

  @UseBefore(AuthService.getAuthMiddleware([CAPABILITIES.MANAGE_FUNCTIONS]))
  @ResponseSchema(APIOutput)
  @Delete('/function/:id')
  async remove(@Req() req: AuthenticatedRequest, @Params() params: ParamId) {
    const service = new FunctionService(req.domainId);
    const deletedRecord = await service.delete(params.id);
    return apiResponse(deletedRecord);
  }

  @UseBefore(AuthService.getAuthMiddleware([CAPABILITIES.MANAGE_FUNCTIONS]))
  @ResponseSchema(APIOutput)
  @Post('/function/assign')
  async assign(
    @Req() req: AuthenticatedRequest,
    @Body() data: AssignFunctionDTO
  ) {
    const service = new FunctionService(req.domainId);
    await service.assign(data);
    return apiResponse(null);
  }
}
