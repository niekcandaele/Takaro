import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ITakaroQuery } from '@takaro/db';
import { APIOutput, apiResponse } from '@takaro/http';
import { PlayerOutputDTO, PlayerService } from '../service/PlayerService.js';
import { AuthenticatedRequest, AuthService } from '../service/AuthService.js';
import { Body, Get, Post, JsonController, UseBefore, Req, Params, Res, Delete } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Type } from 'class-transformer';
import { ParamId } from '../lib/validators.js';
import { PERMISSIONS } from '@takaro/auth';
import { Response } from 'express';
import { ParamIdAndRoleId } from './UserController.js';
import { RoleService } from '../service/RoleService.js';

export class PlayerOutputDTOAPI extends APIOutput<PlayerOutputDTO> {
  @Type(() => PlayerOutputDTO)
  @ValidateNested()
  declare data: PlayerOutputDTO;
}

export class PlayerOutputArrayDTOAPI extends APIOutput<PlayerOutputDTO[]> {
  @ValidateNested({ each: true })
  @Type(() => PlayerOutputDTO)
  declare data: PlayerOutputDTO[];
}

class PlayerSearchInputAllowedFilters {
  @IsOptional()
  @IsUUID()
  id!: string;

  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  steamId!: string;

  @IsOptional()
  @IsString()
  epicOnlineServicesId!: string;

  @IsOptional()
  @IsString()
  xboxLiveId!: string;
}

class PlayerSearchInputDTO extends ITakaroQuery<PlayerSearchInputAllowedFilters> {
  @ValidateNested()
  @Type(() => PlayerSearchInputAllowedFilters)
  declare filters: PlayerSearchInputAllowedFilters;
}

@OpenAPI({
  security: [{ domainAuth: [] }],
})
@JsonController()
export class PlayerController {
  @UseBefore(AuthService.getAuthMiddleware([PERMISSIONS.READ_PLAYERS]))
  @ResponseSchema(PlayerOutputArrayDTOAPI)
  @Post('/player/search')
  async search(@Req() req: AuthenticatedRequest, @Res() res: Response, @Body() query: PlayerSearchInputDTO) {
    const service = new PlayerService(req.domainId);
    const result = await service.find({
      ...query,
      page: res.locals.page,
      limit: res.locals.limit,
    });
    return apiResponse(result.results, {
      meta: { total: result.total },
      req,
      res,
    });
  }

  @UseBefore(AuthService.getAuthMiddleware([PERMISSIONS.READ_PLAYERS]))
  @ResponseSchema(PlayerOutputDTOAPI)
  @Get('/player/:id')
  async getOne(@Req() req: AuthenticatedRequest, @Params() params: ParamId) {
    const service = new PlayerService(req.domainId);
    return apiResponse(await service.findOne(params.id));
  }

  @UseBefore(AuthService.getAuthMiddleware([PERMISSIONS.MANAGE_PLAYERS, PERMISSIONS.MANAGE_ROLES]))
  @Post('/player/:id/role/:roleId')
  @ResponseSchema(APIOutput)
  async assignRole(@Req() req: AuthenticatedRequest, @Params() params: ParamIdAndRoleId) {
    const service = new RoleService(req.domainId);
    return apiResponse(await service.assignRole(params.id, params.roleId));
  }

  @UseBefore(AuthService.getAuthMiddleware([PERMISSIONS.MANAGE_PLAYERS, PERMISSIONS.MANAGE_ROLES]))
  @Delete('/player/:id/role/:roleId')
  @ResponseSchema(APIOutput)
  async removeRole(@Req() req: AuthenticatedRequest, @Params() params: ParamIdAndRoleId) {
    const service = new RoleService(req.domainId);
    return apiResponse(await service.removeRole(params.id, params.roleId));
  }
}
