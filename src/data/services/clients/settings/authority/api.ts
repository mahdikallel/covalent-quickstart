export * from './AddAuthorityApi';
import { AddAuthorityApi }  from './AddAuthorityApi';

export * from './DeleteAuthorityApi';
import { DeleteAuthorityApi }  from './DeleteAuthorityApi';

export * from './GetAuthoritiesApi';
import { GetAuthoritiesApi }  from './GetAuthoritiesApi';
export * from './GetAuthorityByIdApi';
import { GetAuthorityByIdApi }  from './GetAuthorityByIdApi';



export * from './UpdateAuthorityApi';
import { UpdateAuthorityApi }  from './UpdateAuthorityApi';

export const APIS = [ AddAuthorityApi, DeleteAuthorityApi,  GetAuthoritiesApi, GetAuthorityByIdApi, UpdateAuthorityApi, ];
