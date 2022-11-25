import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ITakaroQuery } from '@takaro/db';
import { APIOutput, apiResponse, PaginatedRequest } from '@takaro/http';
import {
  ModuleCreateDTO,
  ModuleOutputDTO,
  ModuleService,
  ModuleSetBuiltinDTO,
  ModuleUpdateDTO,
} from '../service/ModuleService';
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
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Type } from 'class-transformer';
import { CAPABILITIES } from '../service/RoleService';
import { ParamId } from '../lib/validators';

export class ModuleOutputDTOAPI extends APIOutput<ModuleOutputDTO> {
  @Type(() => ModuleOutputDTO)
  @ValidateNested()
  data!: ModuleOutputDTO;
}

export class ModuleOutputArrayDTOAPI extends APIOutput<ModuleOutputDTO[]> {
  @ValidateNested({ each: true })
  @Type(() => ModuleOutputDTO)
  data!: ModuleOutputDTO[];
}

class ModuleSearchInputAllowedFilters {
  @IsOptional()
  @IsUUID()
  id!: string;

  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsBoolean()
  enabled!: boolean;
}

class ModuleSearchInputDTO extends ITakaroQuery<ModuleSearchInputAllowedFilters> {
  @ValidateNested()
  @Type(() => ModuleSearchInputAllowedFilters)
  filters!: ModuleSearchInputAllowedFilters;
}

class ParamName {
  @IsString()
  name!: string;
}

@OpenAPI({
  security: [{ domainAuth: [] }],
})
@JsonController()
export class ModuleController {
  @UseBefore(AuthService.getAuthMiddleware([CAPABILITIES.READ_MODULES]))
  @ResponseSchema(ModuleOutputArrayDTOAPI)
  @Post('/module/search')
  async search(
    @Req() req: AuthenticatedRequest & PaginatedRequest,
    @Body() query: ModuleSearchInputDTO
  ) {
    const service = new ModuleService(req.domainId);
    const result = await service.find({
      ...query,
      page: req.page,
      limit: req.limit,
    });
    return apiResponse(result.results, {
      meta: { page: req.page, limit: req.limit, total: result.total },
    });
  }

  @UseBefore(AuthService.getAuthMiddleware([CAPABILITIES.READ_MODULES]))
  @ResponseSchema(ModuleOutputDTOAPI)
  @Get('/module/:id')
  async getOne(@Req() req: AuthenticatedRequest, @Params() params: ParamId) {
    const service = new ModuleService(req.domainId);
    return apiResponse(await service.findOne(params.id));
  }

  @UseBefore(AuthService.getAuthMiddleware([CAPABILITIES.MANAGE_MODULES]))
  @ResponseSchema(ModuleOutputDTOAPI)
  @Post('/module')
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() data: ModuleCreateDTO
  ) {
    const service = new ModuleService(req.domainId);
    return apiResponse(await service.create(data));
  }

  @UseBefore(AuthService.getAuthMiddleware([CAPABILITIES.MANAGE_MODULES]))
  @ResponseSchema(ModuleOutputDTOAPI)
  @Put('/module/:id')
  async update(
    @Req() req: AuthenticatedRequest,
    @Params() params: ParamId,
    @Body() data: ModuleUpdateDTO
  ) {
    const service = new ModuleService(req.domainId);
    return apiResponse(await service.update(params.id, data));
  }

  @UseBefore(AuthService.getAuthMiddleware([CAPABILITIES.MANAGE_MODULES]))
  @ResponseSchema(APIOutput)
  @Delete('/module/:id')
  async remove(@Req() req: AuthenticatedRequest, @Params() params: ParamId) {
    const service = new ModuleService(req.domainId);
    const deletedRecord = await service.delete(params.id);
    return apiResponse(deletedRecord);
  }

  @UseBefore(AuthService.getAuthMiddleware([CAPABILITIES.READ_MODULES]))
  @ResponseSchema(ModuleOutputArrayDTOAPI)
  @Get('/modules/builtins')
  async getBuiltins(@Req() req: AuthenticatedRequest) {
    const service = new ModuleService(req.domainId);
    return apiResponse(await service.getBuiltins());
  }

  @UseBefore(AuthService.getAuthMiddleware([CAPABILITIES.MANAGE_MODULES]))
  @ResponseSchema(ModuleOutputDTOAPI)
  @Get('/modules/builtins/:name')
  async getBuiltin(
    @Req() req: AuthenticatedRequest,
    @Params() params: ParamName
  ) {
    const service = new ModuleService(req.domainId);
    return apiResponse(await service.findOne(params.name));
  }

  @UseBefore(AuthService.getAuthMiddleware([CAPABILITIES.MANAGE_MODULES]))
  @ResponseSchema(ModuleOutputDTOAPI)
  @Post('/modules/builtins/:name')
  async setBuiltin(
    @Req() req: AuthenticatedRequest,
    @Params() params: ParamName,
    @Body() data: ModuleSetBuiltinDTO
  ) {
    const service = new ModuleService(req.domainId);
    return apiResponse(await service.setBuiltin(params.name, data));
  }
}
