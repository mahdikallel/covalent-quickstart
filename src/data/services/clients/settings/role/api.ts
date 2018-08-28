
export * from './UpdateRoleApi';
import { UpdateRoleApi }  from './UpdateRoleApi';


export * from './AddRoleApi';
import { AddRoleApi }  from './AddRoleApi';

export * from './DeleteRoleApi';
import { DeleteRoleApi }  from './DeleteRoleApi';


export * from './GetRoleByDesignationApi';
import { GetRoleByDesignationApi }  from './GetRoleByDesignationApi';

export * from './GetRoleByIdApi';
import { GetRoleByIdApi }  from './GetRoleByIdApi';

export * from './GetRolesApi';
import { GetRolesApi }  from './GetRolesApi';


export const APIS = [  AddRoleApi,  DeleteRoleApi, GetRoleByDesignationApi, GetRoleByIdApi, GetRolesApi,  UpdateRoleApi,  ];
